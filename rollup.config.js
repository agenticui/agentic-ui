import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ preferBuiltins: false }),
    commonjs(),
    postcss({
      extract: true,
      minimize: true,
      use: ['sass'],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      outDir: 'dist',
      rootDir: 'src',
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'lucide-react',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  ],
}