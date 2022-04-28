import {spawn} from "node:child_process";
import {readFileSync} from "node:fs";
import {cp, readFile, writeFile} from "node:fs/promises";
import {EOL} from "node:os";
import del from "del";
import gulp from "gulp";
import replace from "gulp-replace";

// The package configuration.
const pkg = JSON.parse(readFileSync("package.json", "utf8"));

/** The default task. */
export default gulp.series(
	clean,
	build,
	version
);

/** Builds the project. */
export async function build() {
	await exec("npx", ["ncc", "build", "lib/main.js", "--minify", "--out=var", "--target=es2022"]);
	await writeFile("bin/setup_hashlink.mjs", `#!/usr/bin/env node${EOL}${await readFile("var/index.js", "utf8")}`);
	return exec("npx", ["tsc", "--project", "lib/jsconfig.json"]);
}

/** Deletes all generated files and reset any saved state. */
export function clean() {
	return del(["share", "var/**/*"]);
}

/** Builds the documentation. */
export async function doc() {
	await exec("npx", ["typedoc", "--options", "etc/typedoc.json"]);
	return cp("www/favicon.ico", "docs/favicon.ico");
}

/** Performs the static analysis of source code. */
export async function lint() {
	const sources = JSON.parse(await readFile("jsconfig.json", "utf8")).include;
	await exec("npx", ["eslint", "--config=etc/eslint.json", ...sources]);
	return exec("npx", ["tsc", "--project", "jsconfig.json"]);
}

/** Publishes the package in the registry. */
export async function publish() {
	for (const command of [["tag"], ["push", "origin"]]) await exec("git", [...command, `v${pkg.version}`]);
}

/** Runs the test suite. */
export function test() {
	return exec("npx", ["c8", "--all", "--include=lib/**/*.js", "--report-dir=var", "--reporter=lcovonly", "node_modules/.bin/mocha", "--recursive"]);
}

/** Updates the version number in the sources. */
export function version() {
	return gulp.src("README.md").pipe(replace(/action\/v\d+(\.\d+){2}/, `action/v${pkg.version}`)).pipe(gulp.dest("."));
}

/** Watches for file changes. */
export function watch() {
	return exec("npx", ["tsc", "--project", "jsconfig.json", "--watch"]);
}

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @return {Promise<void>} Resolves when the command is finally terminated.
 */
function exec(command, args = []) {
	return new Promise((resolve, reject) => spawn(command, args, {shell: true, stdio: "inherit"})
		.on("close", code => code ? reject(new Error(args.length ? `${command} ${args.join(" ")}` : command)) : resolve()));
}
