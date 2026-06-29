/**
 * OrbCode contract validator.
 *
 *   flint shard orbc validate "(OrbCode Project) Mesh Core"
 *   flint shard orbc validate "(OrbCode Project) Mesh Core" --json
 *
 * Turns "the plate silently degrades" into "the shard tells you what broke".
 * Regex-based frontmatter parsing, no external deps.
 */
import { readdir, readFile, stat } from 'fs/promises';
import { join, basename } from 'path';

const FLINT_ROOT = process.env.FLINT_ROOT || process.cwd();
const ORBCODE_DIR = join(FLINT_ROOT, 'Mesh', 'OrbCode');
const CB_DIR = join(FLINT_ROOT, 'Mesh', 'Metadata', 'References', 'Codebases');

// --- Contract tables ---

const TYPE_BY_TAG: Record<string, string> = {
  '#orbc/system': 'System',
  '#orbc/module': 'Module',
  '#orbc/feature': 'Feature',
  '#orbc/data': 'Data',
};

const STATUS_BY_TYPE: Record<string, Set<string>> = {
  System: new Set(['draft', 'active', 'stale', 'deprecated']),
  Module: new Set(['draft', 'active', 'stale', 'deprecated']),
  Data: new Set(['draft', 'active', 'stale', 'deprecated']),
  Feature: new Set(['draft', 'untested', 'stale', 'verified']),
};

const PARENT_WHITELIST: Record<string, Set<string>> = {
  System: new Set(['System']),
  Module: new Set(['System']),
  Feature: new Set(['Module', 'System', 'Feature']),
  Data: new Set(['System', 'Module', 'Feature', 'Data']),
};

const REF_WHITELIST: Record<string, Set<string>> = {
  System: new Set(['System', 'Module', 'Feature', 'Data']),
  Module: new Set(['Module', 'Feature', 'Data']),
  Feature: new Set(['Feature', 'Data']),
  Data: new Set(['Data']),
};

const CORE_TYPES = new Set(['System', 'Module', 'Feature', 'Data']);
const DEFERRED_TYPES = new Set(['UI', 'Dependency', 'Consumer', 'Environment', 'Test Suite', 'Test', 'E2E']);
const VALID_CURATION = new Set(['proposed', 'accepted']);
const CODEREF_RE = /^[^\s#:]+(#[^\s#:]+)?(:L\d+(-L\d+)?)?$/;

// --- Frontmatter parsing (matches dev-tree.ts) ---

function parseFrontmatter(content: string): { fm: Record<string, any>; ok: boolean } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { fm: {}, ok: false };
  const lines = match[1].split('\n');
  const result: Record<string, any> = {};
  let currentKey: string | null = null;
  let currentArray: string[] = [];
  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (/^\s+-\s+/.test(line) && currentKey !== null) {
      let val = line.replace(/^\s+-\s+/, '').replace(/^["'](.*)["']$/, '$1');
      currentArray.push(val);
      continue;
    }
    if (currentKey !== null && currentArray.length > 0) {
      result[currentKey] = currentArray;
      currentArray = [];
      currentKey = null;
    }
    const kv = line.match(/^([\w][\w-]*):\s*(.*)/);
    if (kv) {
      const [, key, rawVal] = kv;
      const val = rawVal.trim();
      if (val === '' || val === '[]' || val === 'null') {
        currentKey = key;
        currentArray = [];
      } else if (/^\[.*\]$/.test(val)) {
        // inline flow array: ["a", "b"]
        result[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["'](.*)["']$/, '$1')).filter(s => s !== '');
        currentKey = null;
      } else {
        result[key] = val.replace(/^["'](.*)["']$/, '$1');
        currentKey = null;
      }
    }
  }
  if (currentKey !== null && currentArray.length > 0) result[currentKey] = currentArray;
  return { fm: result, ok: true };
}

const stripLink = (s: string): string => {
  const m = s.match(/\[\[(.+?)\]\]/);
  const inner = m ? m[1] : s;
  return inner.split('|')[0].trim(); // drop alias
};

// type token from a full artifact name: "(OrbCode Project) X . (Type) Name"
const typeFromName = (name: string): string | null => {
  const m = name.match(/\.\s+\(([^)]+)\)/);
  return m ? m[1] : null;
};

const isFullyQualified = (link: string): boolean =>
  /^\(OrbCode Project\) .+ \. \(/.test(stripLink(link));

// --- FS ---

async function scanMd(dir: string): Promise<string[]> {
  const out: string[] = [];
  try {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue;
      const p = join(dir, e.name);
      if (e.isDirectory()) out.push(...(await scanMd(p)));
      else if (e.name.endsWith('.md')) out.push(p);
    }
  } catch { /* missing dir */ }
  return out;
}

async function exists(p: string): Promise<boolean> {
  try { await stat(p); return true; } catch { return false; }
}

// Best-effort codebase path resolution (per-machine, may be unavailable).
async function resolveCodebase(markerStem: string): Promise<string | null> {
  try {
    const marker = await readFile(join(CB_DIR, `${markerStem}.md`), 'utf-8');
    const { fm } = parseFrontmatter(marker);
    const name = (fm.name as string) || markerStem.replace(/^rf-cb-/, '');
    const refs = JSON.parse(await readFile(join(FLINT_ROOT, '.flint', 'references.json'), 'utf-8'));
    const pools = [refs, refs?.codebases, refs?.references].filter(Boolean);
    for (const pool of pools) {
      const hit = pool?.[name];
      if (typeof hit === 'string') return hit;
      if (hit && typeof hit.path === 'string') return hit.path;
    }
  } catch { /* not fulfilled on this machine */ }
  return null;
}

// --- Main ---

async function main() {
  const args = process.argv.slice(2).filter(a => a !== 'validate');
  const json = args.includes('--json');
  const target = args.find(a => !a.startsWith('--'));
  const errors: string[] = [];
  const warnings: string[] = [];
  const E = (f: string, m: string) => errors.push(`${f}: ${m}`);
  const W = (f: string, m: string) => warnings.push(`${f}: ${m}`);

  if (!target) {
    console.error('Usage: flint shard orbc validate "(OrbCode Project) <Name>"');
    process.exit(2);
  }

  // Locate project folder
  let projectDir: string | null = null;
  try {
    for (const e of await readdir(ORBCODE_DIR, { withFileTypes: true })) {
      if (e.isDirectory() && (e.name === target || e.name.includes(target.replace(/^\(OrbCode Project\)\s*/, '')))) {
        projectDir = join(ORBCODE_DIR, e.name);
        break;
      }
    }
  } catch { /* no OrbCode dir */ }
  if (!projectDir) {
    console.error(`Error: no OrbCode project matching "${target}" under Mesh/OrbCode/.`);
    process.exit(2);
  }

  const files = await scanMd(projectDir);
  const names = new Set(files.map(f => basename(f, '.md')));

  // Project index: codebase marker
  let codebaseRoot: string | null = null;
  const indexFile = files.find(f => !basename(f).includes(' . ') && basename(f).startsWith('(OrbCode Project)'));
  if (!indexFile) {
    W(basename(projectDir), 'no project index file found');
  } else {
    const { fm, ok } = parseFrontmatter(await readFile(indexFile, 'utf-8'));
    const fn = basename(indexFile);
    if (!ok) E(fn, 'frontmatter does not parse');
    const cb = typeof fm.codebase === 'string' ? fm.codebase : '';
    const stem = stripLink(cb);
    if (!/^\[\[rf-cb-/.test(cb)) E(fn, `codebase must be a [[rf-cb-*]] marker, got "${cb || '(empty)'}"`);
    else if (!(await exists(join(CB_DIR, `${stem}.md`)))) E(fn, `codebase marker ${stem}.md not found in References/Codebases/`);
    else codebaseRoot = await resolveCodebase(stem);
    if (fm['project-type'] && !['application', 'cognitive'].includes(fm['project-type']))
      E(fn, `project-type must be application|cognitive, got "${fm['project-type']}"`);
  }
  if (!codebaseRoot) W(basename(projectDir), 'codebase not resolvable on this machine — code-ref path existence skipped');

  // Map artifacts
  const mapFiles = files.filter(f => f.includes(`${projectDir}/Map/`) || basename(f).match(/\. \((System|Module|Feature|Data)\)/));
  for (const f of mapFiles) {
    const fn = basename(f);
    const name = basename(f, '.md');
    const { fm, ok } = parseFrontmatter(await readFile(f, 'utf-8'));
    if (!ok) { E(fn, 'frontmatter does not parse'); continue; }

    // dot notation
    if (!/^\(OrbCode Project\) .+ \. \(/.test(name)) E(fn, 'filename is not dot-notation namespaced');

    const fileType = typeFromName(name);
    if (fileType && DEFERRED_TYPES.has(fileType)) { E(fn, `deferred type (${fileType}) — not part of the core spine`); continue; }
    if (!fileType || !CORE_TYPES.has(fileType)) { E(fn, `unknown map type in filename: ${fileType}`); continue; }

    // required fields
    for (const req of ['id', 'tags', 'status', 'template']) if (fm[req] === undefined) E(fn, `missing required field: ${req}`);
    if (!('parent' in fm)) E(fn, 'missing required field: parent (use "" for a root)');

    // tag ↔ filename type
    const tags: string[] = Array.isArray(fm.tags) ? fm.tags : (fm.tags ? [fm.tags] : []);
    const tagType = tags.map(t => TYPE_BY_TAG[t]).find(Boolean);
    if (!tagType) E(fn, `no recognised #orbc/<type> tag`);
    else if (tagType !== fileType) E(fn, `tag type (${tagType}) != filename type (${fileType})`);

    // status
    if (fm.status && !STATUS_BY_TYPE[fileType].has(fm.status))
      E(fn, `status "${fm.status}" invalid for ${fileType} (allowed: ${[...STATUS_BY_TYPE[fileType]].join(', ')})`);

    // curation
    if (fm.curation === undefined) W(fn, 'no curation field (expected proposed|accepted)');
    else if (!VALID_CURATION.has(fm.curation)) E(fn, `curation "${fm.curation}" invalid (proposed|accepted)`);

    // parent: singular, FQ, resolves, whitelisted
    if (Array.isArray(fm.parent)) E(fn, 'parent must be a single wikilink, not a list');
    else if (typeof fm.parent === 'string' && fm.parent.trim() !== '') {
      if (!isFullyQualified(fm.parent)) E(fn, `parent is not a fully-qualified wikilink: ${fm.parent}`);
      const pt = stripLink(fm.parent);
      if (!names.has(pt)) E(fn, `parent does not resolve: ${pt}`);
      const ptType = typeFromName(pt);
      if (ptType && !PARENT_WHITELIST[fileType].has(ptType))
        E(fn, `parent type ${ptType} not allowed for ${fileType} (allowed: ${[...PARENT_WHITELIST[fileType]].join(', ')})`);
    }

    // artifact-refs: FQ, resolve, type-valid
    const refs: string[] = Array.isArray(fm['artifact-refs']) ? fm['artifact-refs'] : (fm['artifact-refs'] ? [fm['artifact-refs']] : []);
    for (const r of refs) {
      if (!isFullyQualified(r)) { E(fn, `artifact-ref not fully qualified: ${r}`); continue; }
      const rt = stripLink(r);
      if (!names.has(rt)) E(fn, `artifact-ref does not resolve: ${rt}`);
      const rType = typeFromName(rt);
      if (rType && !REF_WHITELIST[fileType].has(rType))
        E(fn, `artifact-ref to ${rType} not allowed from ${fileType}`);
    }

    // code-refs: grammar + path existence
    const crefs: string[] = Array.isArray(fm['code-refs']) ? fm['code-refs'] : (fm['code-refs'] ? [fm['code-refs']] : []);
    for (const c of crefs) {
      if (!CODEREF_RE.test(c)) { E(fn, `code-ref fails grammar: ${c}`); continue; }
      if (codebaseRoot) {
        const path = c.split('#')[0].split(':L')[0];
        if (!(await exists(join(codebaseRoot, path)))) E(fn, `code-ref path not found in codebase: ${path}`);
      }
    }
  }

  // Report
  if (json) {
    console.log(JSON.stringify({ project: target, errors, warnings, ok: errors.length === 0 }, null, 2));
  } else {
    console.log(`OrbCode validate — ${target}`);
    console.log(`  ${mapFiles.length} map artifacts checked`);
    for (const w of warnings) console.log(`  ⚠ ${w}`);
    for (const e of errors) console.log(`  ✗ ${e}`);
    console.log(errors.length === 0 ? `  ✓ contract OK${warnings.length ? ` (${warnings.length} warning(s))` : ''}` : `  ✗ ${errors.length} error(s)`);
  }
  process.exit(errors.length === 0 ? 0 : 1);
}

main().catch(err => { console.error(err); process.exit(2); });
