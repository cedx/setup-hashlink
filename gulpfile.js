import gulp from "gulp";
import {spawn} from "node:child_process";
import {readdir, readFile, rm, writeFile} from "node:fs/promises";
import {join} from "node:path";
import pkg from "./package.json" with {type: "json"};

/** Builds the project. */
export async function build() {
	await npx("tsc", "--build", "src/tsconfig.json");
}

/** Deletes all generated files. */
export async function clean() {
	await rm("lib", {force: true, recursive: true});
	for (const file of await readdir("var")) if (file != ".gitkeep") await rm(join("var", file), {recursive: true});
}

/** Packages the project. */
export async function dist() {
	await build();
	await npx("esbuild",
		"\"--banner:js=#!/usr/bin/env node\"",
		"--bundle",
		"--legal-comments=none",
		"--log-level=warning",
		"--minify",
		"--outfile=bin/setup_hashlink.cjs",
		"--platform=node",
		"lib/cli.js");
	await run("git", "update-index", "--chmod=+x", "bin/setup_hashlink.cjs");
}

/** Performs the static analysis of source code. */
export async function lint() {
	await npx("tsc", "--build", "tsconfig.json", "--noEmit");
	await npx("eslint", "--config=etc/eslint.js", "gulpfile.js", "src", "test");
}

/** Publishes the package. */
export async function publish() {
	await npx("gulp");
	for (const action of [["tag"], ["push", "origin"]]) await run("git", ...action, `v${pkg.version}`);
}

/** Runs the test suite. */
export async function test() {
	await npx("tsc", "--build", "src/tsconfig.json", "--sourceMap");
	await run("node", "--enable-source-maps", "--test");
}

/** Updates the version number in the sources. */
export async function version() {
	const file = "README.md";
	await writeFile(file, (await readFile(file, "utf8")).replace(/action\/v\d+(\.\d+){2}/, `action/v${pkg.version}`));
}

/** The default task. */
export default gulp.series(clean, version, dist);

/**
 * Executes a command from a local package.
 * @param {string} command The command to run.
 * @param {...string} args The command arguments.
 * @return {Promise<void>} Resolves when the command is terminated.
 */
function npx(command, ...args) {
	return run("npm", "exec", "--", command, ...args);
}

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {...string} args The command arguments.
 * @return {Promise<void>} Resolves when the command is terminated.
 */
function run(command, ...args) {
	return new Promise((resolve, reject) => {
		const process = spawn(command, args, {shell: true, stdio: "inherit"});
		process.on("close", code => code ? reject(Error([command, ...args].join(" "))) : resolve());
	});
}
