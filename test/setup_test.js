import {doesNotReject, ok} from "node:assert/strict";
import {access} from "node:fs/promises";
import {join, resolve} from "node:path";
import {env, platform} from "node:process";
import {describe, it} from "node:test";
import {Release, Setup} from "@cedx/setup-hashlink";

/**
 * Tests the features of the {@link Setup} class.
 */
describe("Setup", () => {
	env.RUNNER_TEMP ||= resolve("var/tmp");
	env.RUNNER_TOOL_CACHE ||= resolve("var/cache");

	describe("download()", () => {
		it("should properly download and extract the HashLink VM", async () => {
			const setup = new Setup(Release.latest);
			const executable = `hl${setup.release.isSource ? ".vcxproj" : platform == "win32" ? ".exe" : ""}`;
			const dynamicLib = `libhl${setup.release.isSource ? ".vcxproj" : platform == "darwin" ? ".dylib" : platform == "win32" ? ".dll" : ".so"}`;

			const path = await setup.download();
			return doesNotReject(Promise.all([executable, dynamicLib].map(file => access(join(path, file)))));
		});
	});

	describe("install()", () => {
		it("should add the HashLink VM binaries to the PATH environment variable", async () => {
			const path = await new Setup(Release.latest).install();
			ok(env.PATH?.includes(path));
		});
	});
});
