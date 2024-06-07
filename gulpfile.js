import {cp} from "node:fs/promises";
import {deleteAsync} from "del";
import esbuild from "esbuild";
import {$} from "execa";
import gulp from "gulp";
import replace from "gulp-replace";
import pkg from "./package.json" with {type: "json"};

// Builds the project.
export async function build() {
	await $`tsc --project src`;
	return esbuild.build({
		banner: {js: "#!/usr/bin/env node"},
		bundle: true,
		entryPoints: ["src/cli.js"],
		legalComments: "none",
		minify: true,
		outfile: "bin/setup_hashlink.cjs",
		platform: "node"
	});
}

// Deletes all generated files.
export function clean() {
	return deleteAsync(["lib", "var/**/*", "www"]);
}

// Builds the documentation.
export async function doc() {
	for (const file of ["CHANGELOG.md", "LICENSE.md"]) await cp(file, `docs/${file.toLowerCase()}`);
	return $`typedoc --options etc/typedoc.js`;
}

// Performs the static analysis of source code.
export async function lint() {
	await $`tsc --project tsconfig.json`;
	return $`eslint --config=etc/eslint.config.js gulpfile.js src test`;
}

// Publishes the package.
export async function publish() {
	for (const action of [["tag"], ["push", "origin"]]) await $`git ${action} v${pkg.version}`;
}

// Starts the development server.
export async function serve() {
	await doc();
	return $({stdio: "inherit"})`mkdocs serve --config-file=etc/mkdocs.yaml`;
}

// Runs the test suite.
export function test() {
	return $`node --test --test-reporter=spec`;
}

// Updates the version number in the sources.
export function version() {
	return gulp.src("README.md")
		.pipe(replace(/action\/v\d+(\.\d+){2}/, `action/v${pkg.version}`))
		.pipe(gulp.dest("."));
}

// The default task.
export default gulp.series(
	clean,
	build,
	version
);
