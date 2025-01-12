import gulp from "gulp"
import {spawn} from "node:child_process"
import {readdir, readFile, rm, writeFile} from "node:fs/promises"
import {join} from "node:path"

# Builds the project.
export build = ->
	await npx "coffee", "--compile", "--no-header", "--output", "lib", "src"

# Deletes all generated files.
export clean = ->
	await rm "lib", force: yes, recursive: yes
	await rm join("var", file), recursive: yes for file from await readdir "var" when file isnt ".gitkeep"

# Packages the project.
export dist = ->
	await build()
	await npx "esbuild",
		"\"--banner:js=#!/usr/bin/env node\"",
		"--bundle",
		"--legal-comments=none",
		"--log-level=warning",
		"--minify",
		"--outfile=bin/setup_hashlink.cjs",
		" --platform=node",
		"lib/cli.js"
	await run "git", "update-index", "--chmod=+x", "bin/setup_hashlink.cjs"

# Performs the static analysis of source code.
export lint = ->
	await npx "coffeelint", "--file=etc/coffeelint.json", "gulpfile.coffee", "src", "test"

# Publishes the package.
export publish = ->
	{default: {version}} = await import("./package.json", with: type: "json")
	await npx "gulp"
	await run "npm", "publish", "--registry=#{registry}" for registry from ["https://registry.npmjs.org", "https://npm.pkg.github.com"]
	await run "git", action..., "v#{version}" for action from [["tag"], ["push", "origin"]]

# Runs the test suite.
export test = ->
	await npx "coffee", "--compile", "--map", "--no-header", "--output", "lib", "src", "test"
	await run "node", "--enable-source-maps", "--test"

# Updates the version number in the sources.
export version = ->
	file = "README.md"
	{default: {version}} = await import("./package.json", with: type: "json")
	await writeFile file, (await readFile file, "utf8").replace /action\/v\d+(\.\d+){2}/, "action/v#{version}"

# Watches for file changes.
export watch = ->
	npx "coffee", "--compile", "--no-header", "--output", "lib", "--watch", "src", "test"

# The default task.
export default gulp.series clean, dist, version

# Executes a command from a local package.
npx = (command, args...) -> run "npm", "exec", "--", command, args...

# Spawns a new process using the specified command.
run = (command, args...) -> new Promise (resolve, reject) ->
	process = spawn command, args, shell: on, stdio: "inherit"
	process.on "close", (code) -> if code then reject(Error [command, args...].join(" ")) else resolve()
