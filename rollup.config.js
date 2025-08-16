import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    typescript(),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' }
      ]
    })
  ],
  external: ['fs', 'path', 'vite']
};