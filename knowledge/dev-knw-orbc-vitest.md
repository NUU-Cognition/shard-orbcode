---
id: 8f3a2b1c-4d5e-6f7a-8b9c-0d1e2f3a4b5c
tags:
  - "#orbc/knowledge"
  - "#orbc/verification"
  - "#orbc/knowledge/typescript"
status: current
---

# Vitest Setup

How to set up Vitest for TypeScript/JavaScript projects.

## Prerequisites

- Node.js >= 18
- Package manager (npm, pnpm, or yarn)
- TypeScript configured (`tsconfig.json` exists)

## Installation

```bash
npm install -D vitest @vitest/coverage-v8
```

For projects using React/Vue/etc:
```bash
npm install -D @vitejs/plugin-react  # React
npm install -D @vitejs/plugin-vue    # Vue
```

## Configuration

Create `vitest.config.ts` in project root:

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'dist', '**/*.test.ts'],
    },
  },
})
```

For browser/DOM testing, change environment:
```typescript
environment: 'jsdom',  // or 'happy-dom'
```

## Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

## Directory Structure

```
project/
├── src/
│   ├── feature.ts
│   └── feature.test.ts      # Co-located unit tests
├── tests/
│   ├── fixtures/            # Test data
│   │   └── sample-data.ts
│   ├── integration/         # Integration tests
│   │   └── api.test.ts
│   └── setup.ts             # Global setup
├── vitest.config.ts
└── package.json
```

## Writing Tests

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { myFunction } from './feature'

describe('myFunction', () => {
  beforeEach(() => {
    // Reset state before each test
  })

  it('handles valid input', () => {
    const result = myFunction('input')
    expect(result).toBe('expected')
  })

  it('throws on invalid input', () => {
    expect(() => myFunction(null)).toThrow('Invalid input')
  })

  it('handles async operations', async () => {
    const result = await myFunction('async')
    expect(result).resolves.toBe('done')
  })
})
```

## Mocking

```typescript
import { vi } from 'vitest'

// Mock a module
vi.mock('./dependency', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mocked' })
}))

// Mock a function
const mockFn = vi.fn()
mockFn.mockReturnValue('mocked')

// Spy on object method
const spy = vi.spyOn(object, 'method')

// Reset all mocks
vi.resetAllMocks()
```

## Running Tests

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests once |
| `npm run test:watch` | Watch mode |
| `npm run test:coverage` | With coverage report |
| `vitest run src/feature.test.ts` | Run specific file |
| `vitest run -t "handles valid"` | Run tests matching name |

## Verification

After setup, run:
```bash
npm test
```

Expected output:
```
✓ src/feature.test.ts (3 tests) 2ms
  ✓ myFunction > handles valid input
  ✓ myFunction > throws on invalid input
  ✓ myFunction > handles async operations

Test Files  1 passed (1)
     Tests  3 passed (3)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Cannot find module` | Check `tsconfig.json` paths, add to `vitest.config.ts` resolve.alias |
| ESM/CJS conflicts | Add `"type": "module"` to package.json |
| Tests timeout | Increase with `testTimeout: 10000` in config |
| Global types missing | Add `/// <reference types="vitest/globals" />` to test file |
