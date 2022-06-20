import assert from "node:assert/strict";
import {existsSync} from "node:fs";
import {join, resolve} from "node:path";
import {env, platform} from "node:process";
import test from "node:test";
import {Platform, Release, Setup} from "../lib/index.js";

// Initializes the environment.
if (!env.RUNNER_TEMP) env.RUNNER_TEMP = resolve("var/tmp");
if (!env.RUNNER_TOOL_CACHE) env.RUNNER_TOOL_CACHE = resolve("var/cache");

test("Setup.download()", async ctx => {
	await ctx.test("should properly download and extract the HashLink VM", async () => {
		const setup = new Setup(Release.latest);
		const output = await setup.download();

		let extension = setup.release.isSource ? ".vcxproj" : platform == Platform.windows ? ".exe" : "";
		assert.ok(existsSync(join(output, `hl${extension}`)));

		extension = setup.release.isSource ? ".vcxproj" : platform == Platform.windows ? ".dll" : platform == Platform.macOS ? ".dylib" : ".so";
		assert.ok(existsSync(join(output, `libhl${extension}`)));
	});
});

test("Setup.install()", async ctx => {
	await ctx.test("should add the HashLink VM binaries to the PATH environment variable", async () => {
		const path = await new Setup(Release.latest).install();
		assert.ok(env.PATH?.includes(path));
	});
});
