import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

/** @type {import("rollup").RollupOptions} */
export default {
	input: "lib/cli.js",
	output: {
		banner: "#!/usr/bin/env node",
		file: "bin/setup_hashlink.js"
	},
	plugins: [
		resolve(),
		commonjs({sourceMap: false}),
		terser({compress: true, format: {comments: false}, mangle: true})
	]
};
