import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import vue from "rollup-plugin-vue";
import autoprefixer from "autoprefixer";
import { terser } from "rollup-plugin-terser";
export default {
  input: "./lib/index.js",
  output: [
    {
      file: "./dist/my-lib-es.js",
      format: "es",
    },
  ],
  plugins: [
    babel({ exclude:"node_module/**", babelHelpers:"runtime" }),

    vue({
      style: {
        postcssPlugins: [autoprefixer()],
      },
      target: "browser",
    }),
  ],
  external: [
    //外部库， 使用'umd'文件时需要先引入这个外部库
    "vue",
  ],
};
