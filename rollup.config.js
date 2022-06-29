// import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: 'src/app.js',
  output: {
    dir: 'output',
    format: 'esm'
  },
  plugins: [commonjs()]
  // plugins: [babel({ babelHelpers: 'bundled' })]
};

export default config;