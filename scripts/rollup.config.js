import fs from 'fs-extra'
import path from 'path'
import replace from '@rollup/plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import babel from 'rollup-plugin-babel'
import minif from 'rollup-plugin-babel-minify'
import glob from 'glob'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import clean from 'postcss-clean'

const ROOT = path.join(__dirname, '..')

function getAllPackageNames () {
  const files = glob.sync(path.join(ROOT, 'packages/*/package.json'))
  return files.map(f => {
    return require(f).name
  })
}

function rollupDel (pkg) {
  return {
    name: 'delete',
    buildStart: () => {
      fs.removeSync(pkg)
      console.log(`${pkg} has been delete`)
    }
  }
}

function formatTime () {
  const time = new Date
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  return y + '-' + m + '-' + d
}

/** 打包目录 */
const pkgDir = process.cwd()
/** package.json */
const pkg = require(path.join(pkgDir, 'package.json'))

const banner =
    `/*!
 * ${pkg.name} v${pkg.version}
 * Copyright (c) sunny ${formatTime()}
 */
`

export default {
  input: path.join(pkgDir, 'index.ts'),
  output: [
    {
      exports: 'named',
      name: pkg.name,
      amd: {
        id: pkg.name
      },
      banner,
      format: 'cjs',
      file: path.join(pkgDir, 'dist/index.cjs.js'),
      sourcemap: false
    },
    {
      exports: 'named',
      name: pkg.name,
      amd: {
        id: pkg.name
      },
      banner,
      format: 'es',
      file: path.join(pkgDir, 'dist/index.es.js'),
      sourcemap: false
    }
  ],
  plugins: [
    rollupDel(path.join(pkgDir, 'dist')), /** 删除dist文件 */
    replace({
      __VERSION__: pkg.version,
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    commonjs({
      include: ['node_modules/**', '**/node_modules/**'],
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          baseUrl: ROOT,
          declaration: true,
          outDir: './dist',
          module: 'esnext',
        },
        exclude: ['node_modules/**'],
        include: [path.join(pkgDir, './*.tsx'), path.join(pkgDir, './*.ts')],
      },
      typescript: require('typescript')
    }),
    nodeResolve({
      preferBuiltins: true
    }),
    postcss({
      extract: true,
      plugins: [autoprefixer, clean],
      writeDefinitions: true
    }),
    json(),
    sizeSnapshot(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', 'tsx'],
      runtimeHelpers: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: [
                'ie >= 11',
                'Chrome >= 21',
                'Firefox >= 1',
                'Edge >= 13',
                'last 3 versions'
              ]
            }
          }
        ]
      ],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    minif({
      comments: false,
      banner,
      sourceMap: false
    })
  ],
  external: [
    'react',
    'react-dom'
  ].concat(getAllPackageNames())
}
