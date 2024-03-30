import {cp} from "node:fs/promises";
import {env} from "node:process";
import {deleteAsync} from "del";
import esbuild from "esbuild";
import {$} from "execa";
import gulp from "gulp";
import replace from "gulp-replace";
import pkg from "./package.json" with {type: "json"};
import buildOptions from "./etc/esbuild.js";

// Builds the project.
export async function build() {
	await $`tsc --project src`;
	return esbuild.build(buildOptions());
}

// Deletes all generated files.
export function clean() {
	return deleteAsync(["bin/*.map", "lib", "var/**/*"]);
}

// Packages the application.
export async function dist() {
	env.NODE_ENV = "production";
	await build();
	return $`git update-index --chmod=+x bin/setup_hashlink.cjs`;
}

// Builds the documentation.
export async function doc() {
	await build();
	await $`typedoc --options etc/typedoc.js`;
	for (const file of ["CHANGELOG.md", "LICENSE.md"]) await cp(file, `docs/${file.toLowerCase()}`);
	return cp("docs/favicon.ico", "docs/api/favicon.ico");
}

// Performs the static analysis of source code.
export async function lint() {
	await build();
	await $`tsc --project .`;
	return $`eslint --config=etc/eslint.config.js gulpfile.js etc src test`;
}

// Publishes the package.
export async function publish() {
	for (const action of [["tag"], ["push", "origin"]]) await $`git ${action} v${pkg.version}`;
}

// Runs the test suite.
export async function test() {
	await build();
	return $`node --test --test-reporter=spec`;
}

// Updates the version number in the sources.
export function version() {
	return gulp.src("README.md")
		.pipe(replace(/action\/v\d+(\.\d+){2}/, `action/v${pkg.version}`))
		.pipe(gulp.dest("."));
}

// Watches for file changes.
export async function watch() {
	const context = await esbuild.context(buildOptions());
	gulp.watch("src/**/*.ts", {ignoreInitial: false}, function buildCli() {
		return context.rebuild();
	});
}

// The default task.
export default gulp.series(
	clean,
	dist,
	version
);
