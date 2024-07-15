import {readFile, writeFile} from "node:fs/promises";
import {env} from "node:process";
import {deleteAsync} from "del";
import esbuild from "esbuild";
import {execa} from "execa";
import gulp from "gulp";
import pkg from "./package.json" with {type: "json"};

// Runs a command.
const $ = execa({preferLocal: true, stdio: "inherit"});

// Builds the project.
export async function build() {
	await $`tsc --build src/tsconfig.json`;
	return esbuild.build({
		banner: {js: "#!/usr/bin/env node"},
		bundle: true,
		entryPoints: ["src/cli.ts"],
		legalComments: "none",
		minify: true,
		outfile: "bin/setup_hashlink.cjs",
		platform: "node"
	});
}

// Deletes all generated files.
export function clean() {
	return deleteAsync(["lib", "var/**/*"]);
}

// Performs the static analysis of source code.
export async function lint() {
	await build();
	await $`tsc --build tsconfig.json`;
	return $`eslint --config=etc/eslint.js gulpfile.js src test`;
}

// Publishes the package.
export async function publish() {
	for (const action of [["tag"], ["push", "origin"]]) await $`git ${action} v${pkg.version}`;
}

// Runs the test suite.
export async function test() {
	env.NODE_ENV = "test";
	await build();
	return $`node --test --test-reporter=spec`;
}

// Updates the version number in the sources.
export async function version() {
	const file = "README.md";
	return writeFile(file, (await readFile(file, "utf8")).replace(/action\/v\d+(\.\d+){2}/, `action/v${pkg.version}`));
}

// The default task.
export default gulp.series(
	clean,
	build,
	version
);
