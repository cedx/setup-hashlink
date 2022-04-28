import assert from "node:assert/strict";
import {Platform, Release} from "../lib/index.js";

// A release that exists.
const existingRelease = new Release({version: "1.0.0", assets: [
	{platform: Platform.linux, file: "hl-1.0.zip"},
	{platform: Platform.macOS, file: "hl-1.0.zip"},
	{platform: Platform.windows, file: "hl-1.0.zip"}
]});

// A release that doesn't exist.
const nonExistentRelease = new Release({version: "666.6.6"});

/**
 * Tests the features of the {@link Release} class.
 */
describe("Release", () => {
	describe(".exists", () => {
		it("should return `false` if the release does not exist", () => assert.ok(!nonExistentRelease.exists));
		it("should return `true` if the release exists", () => assert.ok(existingRelease.exists));
	});

	describe(".isSource", () => {
		it("should return `false` if the release is provided as binary", () => assert.ok(!existingRelease.isSource));
		it("should return `true` if the release is provided as source code", () => assert.ok(nonExistentRelease.isSource));
	});

	describe(".latest", () => {
		it("should exist", () => assert.ok(Release.latest.exists));
	});

	describe(".tag", () => {
		it("should not include the patch component if it's zero", () => assert.equal(existingRelease.tag, "1.0"));
		it("should include the patch component if it's greater than zero", () => assert.equal(nonExistentRelease.tag, "666.6.6"));
	});

	describe(".url", () => {
		it("should point to a GitHub tag if the release is provided as source code", () => {
			assert.equal(nonExistentRelease.url.href, "https://github.com/HaxeFoundation/hashlink/archive/refs/tags/666.6.6.zip");
		});

		it("should point to a GitHub release if the release is provided as binary", () => {
			assert.equal(existingRelease.url.href, "https://github.com/HaxeFoundation/hashlink/releases/download/1.0/hl-1.0.zip");
		});
	});

	describe(".find()", () => {
		it("should return `undefined` if no release matches the version constraint", () => {
			assert.ok(!Release.find("666.6.6"));
		});

		it("should return the release corresponding to the version constraint if it exists", () => {
			assert.equal(Release.find("*"), Release.latest);
			assert.equal(Release.find("1.x"), Release.latest);
			assert.equal(Release.find("=1.0.0").version, "1.0.0");
			assert.equal(Release.find(">=1.0.0 <1.11.0").version, "1.10.0");
		});
	});

	describe(".get()", () => {
		it("should return `undefined` if no release matches to the version number", () => {
			assert.ok(!Release.get("666.6.6"));
		});

		it("should return the release corresponding to the version number if it exists", () => {
			assert.equal(Release.get("1.0.0").version, "1.0.0");
		});
	});

	describe(".getAsset()", () => {
		it("should return `undefined` if no asset matches the platform", () => {
			assert.ok(!nonExistentRelease.getAsset(Platform.windows));
		});

		it("should return the asset corresponding to the platform number if it exists", () => {
			assert.equal(existingRelease.getAsset(Platform.windows).file, "hl-1.0.zip");
		});
	});
});
