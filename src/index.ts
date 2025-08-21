import fs from 'fs';
import path from 'path';

interface PagesTreeOptions {
  pagesDir?: string;
  outputFile?: string;
}

type DirNode = {
  segment: string;            // "" if root/group
  layout?: string;
  index?: string;
  notFound?: string;
  routes: Array<{ path: string; file: string }>;
  children: DirNode[];
};

export default function reactRouterGen(userOptions: PagesTreeOptions = {}) {
  const options = {
    pagesDir: 'src/pages',
    outputFile: 'src/routes-tree-gen.tsx',
    ...userOptions
  };

  const absPages = path.resolve(options.pagesDir);
  const absOutput = path.resolve(options.outputFile);

  const write = () => {
    if (!fs.existsSync(absPages)) {
      return;
    }
    const tree = scanDir(absPages, absPages, '');

    if (isTreeEmpty(tree)) {
      return;
    }

    const code = generateRoutesTree(tree, absOutput, absPages);
    fs.mkdirSync(path.dirname(absOutput), { recursive: true });
    fs.writeFileSync(absOutput, code, 'utf-8');
  };

  return {
    name: 'vite-plugin-pages-tree',
    buildStart() {
      write();
    },
    handleHotUpdate(ctx: any) {
      // 🚫 Prevent infinite loop: skip if the generated file changes
      if (ctx.file === absOutput) {
        return;
      }

      if (ctx.file.startsWith(absPages)) {
        write();
        ctx.server.ws.send({ type: 'full-reload' });
      }
    },
  };
}

function toSegment(name: string) {
  if (/^\[.+\]$/.test(name)) return `:${name.slice(1, -1)}`;
  if (/^\(.*\)$/.test(name)) return ''; // group folder
  return name;
}

function stripExt(filePath: string) {
  return filePath.replace(/\.(t|j)sx?$/, '');
}

function scanDir(dir: string, root: string, segment: string): DirNode {
  const node: DirNode = { segment, routes: [], children: [] };

  if (!fs.existsSync(dir)) {
    return node; // handle missing pages directory gracefully
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      const child = scanDir(full, root, toSegment(e.name));
      if (!isTreeEmpty(child)) {
        node.children.push(child);
      }
    } else if (e.isFile() && /\.(t|j)sx?$/.test(e.name)) {
      const base = e.name.replace(/\.(t|j)sx?$/, '');
      const rel = path.relative(root, full).replace(/\\/g, '/');

      if (base === '_layout') {
        node.layout = rel;
      } else if (base === 'index') {
        node.index = rel;
      } else if (base === 'not-found') {
        node.notFound = rel;
      } else {
        const p = /^\[.+\]$/.test(base) ? `:${base.slice(1, -1)}` : base;
        node.routes.push({ path: p, file: rel });
      }
    }
  }
  return node;
}

function isTreeEmpty(node: DirNode): boolean {
  return (
    !node.layout &&
    !node.index &&
    !node.notFound &&
    node.routes.length === 0 &&
    node.children.length === 0
  );
}

function generateRoutesTree(root: DirNode, outputFile: string, pagesRoot: string): string {
  const imports: string[] = [];
  let i = 0;
  let needsOutlet = false;

  const imp = (rel: string) => {
    const v = `Comp${i++}`;
    const absImportPath = path.resolve(pagesRoot, rel);
    const relImportPath = stripExt(
      path.relative(path.dirname(outputFile), absImportPath).replace(/\\/g, '/')
    );
    const finalImportPath = relImportPath.startsWith('.') ? relImportPath : `./${relImportPath}`;
    imports.push(`import ${v} from '${finalImportPath}';`);
    return v;
  };

  const renderInner = (n: DirNode): string => {
    const parts: string[] = [];

    if (n.index) {
      const C = imp(n.index);
      parts.push(`<Route index element={<${C} />} />`);
    }

    for (const r of n.routes) {
      const C = imp(r.file);
      parts.push(`<Route path="${r.path}" element={<${C} />} />`);
    }

    for (const child of n.children) {
      const childInner = renderInner(child);

      if (child.segment === '') {
        // group folder
        if (child.layout) {
          const L = imp(child.layout);
          parts.push(
            `<Route element={<${L} />}>
${indent(childInner, 4)}
</Route>`
          );
        } else if (childInner.trim()) {
          needsOutlet = true;
          parts.push(
            `<Route element={<Outlet />}>
${indent(childInner, 4)}
</Route>`
          );
        }

        if (child.notFound) {
          const NF = imp(child.notFound);
          parts.push(`<Route path="*" element={<${NF} />} />`);
        }
        continue;
      }

      // normal folder
      if (child.layout) {
        const L = imp(child.layout);
        parts.push(
          `<Route path="${child.segment}" element={<${L} />}>
${indent(childInner, 4)}
</Route>`
        );
      } else {
        needsOutlet = true;
        parts.push(
          `<Route path="${child.segment}" element={<Outlet />}>
${indent(childInner, 4)}
</Route>`
        );
      }
    }

    if (n.notFound) {
      const NF = imp(n.notFound);
      parts.push(`<Route path="*" element={<${NF} />} />`);
    }

    return parts.filter(Boolean).join('\n');
  };

  const inner = renderInner(root);

  const top =
    root.layout
      ? (() => {
          const L = imp(root.layout);
          return `<Route path="/" element={<${L} />}>
${indent(inner, 4)}
</Route>`;
        })()
      : inner;

  const rrImports = `import { Routes, Route${needsOutlet ? ', Outlet' : ''} } from 'react-router';`;

  return `/* AUTO-GENERATED FILE — DO NOT EDIT */
${rrImports}
${imports.join('\n')}

export default function RoutesTreeFileGen() {
  return (
    <Routes>
${indent(top, 6)}
    </Routes>
  );
}
`;
}

function indent(s: string, spaces = 2) {
  const pad = ' '.repeat(spaces);
  return s.split('\n').map(l => (l ? pad + l : l)).join('\n');
}
