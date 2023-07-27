import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import sass from "rollup-plugin-sass";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";

// postCSS plugins

import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      plugins: [simplevars(), nested()],
      modules: true,
    }),
    sass({ insert: true }),
    url(),
    svgr(),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs({
      include: ["node_modules/**"],
      exclude: ["node_modules/process-es6/**"],
      namedExports: {
        "node_modules/react/index.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement",
          "createContext",
          "useState",
          "useCallback",
          "useMemo",
          "useContext",
          "useRef",
          "useEffect",
          "useLayoutEffect",
        ],
        "react-tooltip": ["Tooltip", "deafault"],
        "node_modules/react-dom/index.js": ["render"],
      },
    }),
  ],
};
