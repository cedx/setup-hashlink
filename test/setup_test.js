import assert from "node:assert/strict";
import {existsSync} from "node:fs";
import {join, resolve} from "node:path";
import {env, platform} from "node:process";
import {Platform, Release, Setup} from "../lib/index.js";

/**
 * Tests the features of the {@link Setup} class.
 */
describe("Setup", /** @this {Mocha.Suite} */ function() {
	this.timeout("180s");

	before(() => {
		if (!env.RUNNER_TEMP) env.RUNNER_TEMP = resolve("var/tmp");
		if (!env.RUNNER_TOOL_CACHE) env.RUNNER_TOOL_CACHE = resolve("var/cache");
	});

	describe(".download()", () => {
		it("should properly download and extract the HashLink VM", async () => {
			const setup = new Setup(Release.latest);
			const output = await setup.download();

			let extension = setup.release.isSource ? ".vcxproj" : platform == Platform.windows ? ".exe" : "";
			assert.ok(existsSync(join(output, `hl${extension}`)));

			extension = setup.release.isSource ? ".vcxproj" : platform == Platform.windows ? ".dll" : platform == Platform.macOS ? ".dylib" : ".so";
			assert.ok(existsSync(join(output, `libhl${extension}`)));
		});
	});

	describe(".install()", () => {
		it("should add the HashLink VM binaries to the PATH environment variable", async () => {
			assert.ok(env.PATH.includes(await new Setup(Release.latest).install()))
		});
	});
});
