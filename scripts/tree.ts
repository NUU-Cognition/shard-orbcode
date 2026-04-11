import { readdir, readFile } from 'fs/promises';
import { join, basename } from 'path';

// --- Configuration ---

const FLINT_ROOT = process.env.FLINT_ROOT || process.cwd();
const ORBCODE_DIR = join(FLINT_ROOT, 'Mesh', 'OrbCode');

const CONTEXT_TAGS = new Set([
  '#orbc/context',
  '#orbc/architecture',
  '#orbc/environment',
  '#orbc/relationships',
]);

// --- Types ---

interface ArtifactMeta {
  name: string;
  filePath: string;
  tags: string[];
  status?: string;
  projectType?: string;
  codeRefs: string[];
  artifactRefs: string[];
}

interface Container {
  name: string;
  path: string;
  type: 'project' | 'workspace';
}

interface CliArgs {
  target?: string;
  depth: number;
  verbose: boolean;
  json: boolean;
}

// --- CLI Arg Parsing ---

function parseArgs(): CliArgs {
  const raw = process.argv.slice(2);
  const positional: string[] = [];
  let verbose = false;
  let json = false;

  for (const arg of raw) {
    if (arg === '--verbose' || arg === '-v') verbose = true;
    else if (arg === '--json') json = true;
    else positional.push(arg);
  }

  const target = positional[0];
  const depth = positional[1] !== undefined ? parseInt(positional[1], 10) || 1 : 1;

  return { target, depth, verbose, json };
}

// --- Frontmatter Parsing (regex-based, no external deps) ---

function parseFrontmatter(content: string): Record<string, any> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const lines = match[1].split('\n');
  const result: Record<string, any> = {};
  let currentKey: string | null = null;
  let currentArray: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // Array item: "  - value" or '  - "quoted value"'
    if (/^\s+-\s+/.test(line) && currentKey !== null) {
      let val = line.replace(/^\s+-\s+/, '');
      val = val.replace(/^["'](.*)["']$/, '$1');
      currentArray.push(val);
      continue;
    }

    // Flush previous array
    if (currentKey !== null && currentArray.length > 0) {
      result[currentKey] = currentArray;
      currentArray = [];
      currentKey = null;
    }

    // Key: value
    const kv = line.match(/^([\w][\w-]*):\s*(.*)/);
    if (kv) {
      const [, key, rawVal] = kv;
      const val = rawVal.trim();
      if (val === '' || val === '[]' || val === 'null') {
        currentKey = key;
        currentArray = [];
      } else {
        result[key] = val.replace(/^["'](.*)["']$/, '$1');
        currentKey = null;
      }
    }
  }

  // Flush trailing array
  if (currentKey !== null && currentArray.length > 0) {
    result[currentKey] = currentArray;
  }

  return result;
}

function extractWikilink(ref: string): string {
  const m = ref.match(/\[\[(.+?)\]\]/);
  return m ? m[1] : ref;
}

// --- Filesystem Scanning ---

async function scanMd(dir: string): Promise<string[]> {
  const out: string[] = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith('.')) continue;
      const p = join(dir, e.name);
      if (e.isDirectory()) out.push(...(await scanMd(p)));
      else if (e.name.endsWith('.md')) out.push(p);
    }
  } catch {
    // Directory doesn't exist or can't be read
  }
  return out;
}

async function loadArtifact(filePath: string): Promise<ArtifactMeta | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const fm = parseFrontmatter(content);
    return {
      name: basename(filePath, '.md'),
      filePath,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      status: fm.status,
      projectType: fm['project-type'],
      codeRefs: Array.isArray(fm['code-refs']) ? fm['code-refs'] : [],
      artifactRefs: Array.isArray(fm['artifact-refs'])
        ? fm['artifact-refs'].map(extractWikilink)
        : [],
    };
  } catch {
    return null;
  }
}

// --- Discovery ---

async function discoverContainers(): Promise<Container[]> {
  const out: Container[] = [];
  try {
    const entries = await readdir(ORBCODE_DIR, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const type = e.name.startsWith('(OrbCode Project)')
        ? 'project' as const
        : e.name.startsWith('(OrbCode Workspace)')
          ? 'workspace' as const
          : null;
      if (type) out.push({ name: e.name, path: join(ORBCODE_DIR, e.name), type });
    }
  } catch {
    return [];
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

async function loadProject(container: Container): Promise<Map<string, ArtifactMeta>> {
  const files = await scanMd(container.path);
  const map = new Map<string, ArtifactMeta>();
  for (const f of files) {
    const meta = await loadArtifact(f);
    if (meta) map.set(meta.name, meta);
  }
  return map;
}

function findContainer(containers: Container[], target: string): Container | undefined {
  // 1. Exact match
  let c = containers.find(x => x.name === target);
  if (c) return c;

  // 2. Match on name suffix (e.g. "Flint" → "(OrbCode Project) Flint")
  c = containers.find(x => {
    const suffix = x.name.replace(/^\(OrbCode (?:Project|Workspace)\)\s*/, '');
    return suffix === target;
  });
  if (c) return c;

  // 3. Partial substring match
  return containers.find(x => x.name.toLowerCase().includes(target.toLowerCase()));
}

// --- List Mode (no target) ---

async function listAll(json: boolean) {
  const containers = await discoverContainers();
  if (containers.length === 0) {
    console.log('No OrbCode projects or workspaces found in Mesh/OrbCode/.');
    return;
  }

  const items: { name: string; type: string; projectType?: string; count: number }[] = [];
  for (const c of containers) {
    const count = (await scanMd(c.path)).length;
    let projectType: string | undefined;
    try {
      const content = await readFile(join(c.path, `${c.name}.md`), 'utf-8');
      projectType = parseFrontmatter(content)['project-type'];
    } catch { /* index file might not exist */ }
    items.push({ name: c.name, type: c.type, projectType, count });
  }

  if (json) {
    console.log(JSON.stringify(items.map(i => ({
      name: i.name,
      type: i.type,
      ...(i.projectType ? { projectType: i.projectType } : {}),
      artifactCount: i.count,
    })), null, 2));
  } else {
    for (const i of items) {
      const label = i.projectType ? ` [${i.projectType}]` : '';
      console.log(`${i.name}${label} (${i.count} artifacts)`);
    }
  }
}

// --- Tree Mode ---

async function showTree(target: string, depth: number, verbose: boolean, json: boolean) {
  const containers = await discoverContainers();

  // Check if target is a dotted artifact name (subtree mode)
  const dotIndex = target.indexOf(' . ');
  if (dotIndex !== -1) {
    const projectPart = target.substring(0, dotIndex).trim();
    const container = findContainer(containers, projectPart);
    if (!container) {
      console.error(`Error: Project "${projectPart}" not found.`);
      process.exit(1);
    }

    const artifacts = await loadProject(container);
    const targetMeta = artifacts.get(target);
    if (!targetMeta) {
      console.error(`Error: Artifact "${target}" not found in ${container.name}.`);
      process.exit(1);
    }

    if (json) {
      const visited = new Set<string>();
      visited.add(target);
      const node = buildJsonNode(target, artifacts, depth, visited);
      console.log(JSON.stringify(node, null, 2));
    } else {
      const lines: string[] = [];
      const visited = new Set<string>();
      renderSubtreeRoot(targetMeta, artifacts, depth, verbose, visited, lines);
      console.log(lines.join('\n'));
    }
    return;
  }

  // Project/workspace mode
  const container = findContainer(containers, target);
  if (!container) {
    console.error(`Error: No project or workspace matching "${target}".`);
    process.exit(1);
  }

  const artifacts = await loadProject(container);
  const projectMeta = artifacts.get(container.name);
  const projectType = projectMeta?.projectType || '';
  const totalCount = artifacts.size;

  // Categorize artifacts
  const systems: ArtifactMeta[] = [];
  const contextArtifacts: ArtifactMeta[] = [];

  for (const [, meta] of artifacts) {
    if (meta.tags.some(t => t === '#orbc/system')) {
      systems.push(meta);
    } else if (meta.tags.some(t => CONTEXT_TAGS.has(t))) {
      contextArtifacts.push(meta);
    }
  }

  systems.sort((a, b) => a.name.localeCompare(b.name));
  contextArtifacts.sort((a, b) => a.name.localeCompare(b.name));

  if (json) {
    const visited = new Set<string>();
    const sysNodes = systems.map(s => {
      visited.add(s.name);
      return buildJsonNode(s.name, artifacts, depth - 1, visited);
    });
    const result: any = {
      name: container.name,
      type: container.type,
      ...(projectType ? { projectType } : {}),
      artifactCount: totalCount,
    };
    if (sysNodes.length > 0) result.systems = sysNodes;
    if (contextArtifacts.length > 0) {
      result.context = contextArtifacts.map(c => ({
        name: c.name,
        type: c.tags.find(t => t.startsWith('#orbc/'))?.replace('#orbc/', '') || 'unknown',
      }));
    }
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  // Text rendering
  const lines: string[] = [];
  const typeLabel = projectType ? ` [${projectType}]` : '';
  lines.push(`${container.name}${typeLabel} (${totalCount} artifacts)`);

  const visited = new Set<string>();

  for (let i = 0; i < systems.length; i++) {
    const sys = systems[i];
    const isLast = i === systems.length - 1 && contextArtifacts.length === 0;
    visited.add(sys.name);

    const statusSuffix = verbose && sys.status ? ` (${sys.status})` : '';
    lines.push(`${isLast ? '└── ' : '├── '}${sys.name}${statusSuffix}`);

    if (verbose && sys.codeRefs.length > 0) {
      const refPrefix = isLast ? '    ' : '│   ';
      lines.push(`${refPrefix}refs: ${sys.codeRefs.join(', ')}`);
    }

    if (depth > 1) {
      const childPrefix = isLast ? '    ' : '│   ';
      renderChildren(sys, artifacts, depth - 1, visited, verbose, childPrefix, lines);
    }
  }

  if (contextArtifacts.length > 0) {
    lines.push('Context:');
    for (const ctx of contextArtifacts) {
      lines.push(`  ${ctx.name}`);
    }
  }

  console.log(lines.join('\n'));
}

// --- Recursive Child Rendering ---

function renderChildren(
  parent: ArtifactMeta,
  artifacts: Map<string, ArtifactMeta>,
  remaining: number,
  visited: Set<string>,
  verbose: boolean,
  prefix: string,
  lines: string[],
) {
  if (remaining <= 0) return;

  const refs = parent.artifactRefs;
  for (let i = 0; i < refs.length; i++) {
    const refName = refs[i];
    const isLast = i === refs.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const childPrefix = prefix + (isLast ? '    ' : '│   ');

    const meta = artifacts.get(refName);
    const statusSuffix = verbose && meta?.status ? ` (${meta.status})` : '';
    const notFoundSuffix = !meta ? ' [not found]' : '';

    lines.push(`${prefix}${connector}${refName}${statusSuffix}${notFoundSuffix}`);

    if (verbose && meta?.codeRefs && meta.codeRefs.length > 0) {
      lines.push(`${childPrefix}refs: ${meta.codeRefs.join(', ')}`);
    }

    if (meta && remaining > 1 && meta.artifactRefs.length > 0 && !visited.has(refName)) {
      visited.add(refName);
      renderChildren(meta, artifacts, remaining - 1, visited, verbose, childPrefix, lines);
    }
  }
}

// --- Subtree Rendering ---

function renderSubtreeRoot(
  root: ArtifactMeta,
  artifacts: Map<string, ArtifactMeta>,
  depth: number,
  verbose: boolean,
  visited: Set<string>,
  lines: string[],
) {
  const statusSuffix = verbose && root.status ? ` (${root.status})` : '';
  lines.push(`${root.name}${statusSuffix}`);

  if (verbose && root.codeRefs.length > 0) {
    lines.push(`refs: ${root.codeRefs.join(', ')}`);
  }

  visited.add(root.name);
  renderChildren(root, artifacts, depth, visited, verbose, '', lines);
}

// --- JSON Rendering ---

function buildJsonNode(
  name: string,
  artifacts: Map<string, ArtifactMeta>,
  remaining: number,
  visited: Set<string>,
): any {
  const meta = artifacts.get(name);
  const typeTag = meta?.tags.find(t => t.startsWith('#orbc/'));
  const type = typeTag ? typeTag.replace('#orbc/', '') : 'unknown';

  const node: any = { name, type };
  if (meta?.status) node.status = meta.status;
  if (meta?.codeRefs && meta.codeRefs.length > 0) node.codeRefs = meta.codeRefs;

  if (remaining > 0 && meta?.artifactRefs && meta.artifactRefs.length > 0) {
    const children: any[] = [];
    for (const ref of meta.artifactRefs) {
      if (visited.has(ref)) continue;
      visited.add(ref);
      children.push(buildJsonNode(ref, artifacts, remaining - 1, visited));
    }
    if (children.length > 0) node.children = children;
  }

  return node;
}

// --- Entry Point ---

async function main() {
  const { target, depth, verbose, json } = parseArgs();

  if (!target) {
    await listAll(json);
  } else {
    await showTree(target, depth, verbose, json);
  }
}

main().catch(err => {
  console.error(`Error: ${err.message || err}`);
  process.exit(1);
});
