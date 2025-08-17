
# vite-plugin-react-router-file-gen
React Router (Declarative Mode) file based routing. It support **Preact** too!!

## Prerequisite
- Vite v6 and above
- React Router v7

## Installation
```bash
npm install --save-dev vite-plugin-react-router-file-gen
```

## Usage
In `vite.config.ts` 
```ts
import reactRouterFileGen from 'vite-plugin-react-router-file-gen'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRouterFileGen({
      pagesDir: 'src/pages',
      outputFile: 'src/routes-tree-gen.tsx',
    })
  ],
})
```

Create some route files in `src/pages` folder. example
```
pages/index.tsx
pages/not-found.tsx
```

Start localhost
```bash
npm run dev
```

The `src/routes-tree-gen.tsx` file will be generated. 
```ts
/* AUTO-GENERATED FILE — DO NOT EDIT */
import { Routes, Route, Outlet } from 'react-router';
import Comp0 from './pages/index';
import Comp1 from './pages/not-found';

export default function RoutesTreeFileGen() {
  return (
    <Routes>
      <Route index element={<Comp0 />} />
      <Route path="*" element={<Comp1 />} />
    </Routes>
  );
}
```

Last, integrate in your `main.tsx`
```ts
import Routes from './routes-tree-gen'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>,
)
```
