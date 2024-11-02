import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

/** @type {import("rollup").RollupOptions} */
export default {
	input: "bin/setup_hashlink.js",
	output: {file: "bin/setup_hashlink.js", format: "cjs"},
	plugins: [
		resolve(),
		commonjs({sourceMap: false}),
		terser({compress: true, format: {comments: false}, mangle: true})
	]
};
