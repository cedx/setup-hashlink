import assert from "node:assert/strict";
import test from "node:test";
import {Platform, Release} from "../src/index.js";

// A release that exists.
const existingRelease = new Release({version: "1.0.0", assets: [
	{platform: Platform.linux, file: "hl-1.0.zip"},
	{platform: Platform.macOS, file: "hl-1.0.zip"},
	{platform: Platform.windows, file: "hl-1.0.zip"}
]});

// A release that doesn't exist.
const nonExistentRelease = new Release({version: "666.6.6"});

test("Release.exists", async ctx => {
	await ctx.test("should return `false` if the release does not exist", () => assert.ok(!nonExistentRelease.exists));
	await ctx.test("should return `true` if the release exists", () => assert.ok(existingRelease.exists));
});

test("Release.isSource", async ctx => {
	await ctx.test("should return `false` if the release is provided as binary", () => assert.ok(!existingRelease.isSource));
	await ctx.test("should return `true` if the release is provided as source code", () => assert.ok(nonExistentRelease.isSource));
});

test("Release.latest", async ctx => {
	await ctx.test("should exist", () => assert.ok(Release.latest.exists));
});

test("Release.tag", async ctx => {
	await ctx.test("should not include the patch component if it's zero", () => assert.equal(existingRelease.tag, "1.0"));
	await ctx.test("should include the patch component if it's greater than zero", () => assert.equal(nonExistentRelease.tag, "666.6.6"));
});

test("Release.url", async ctx => {
	await ctx.test("should point to a GitHub tag if the release is provided as source code", () => {
		assert.equal(nonExistentRelease.url.href, "https://github.com/HaxeFoundation/hashlink/archive/refs/tags/666.6.6.zip");
	});

	await ctx.test("should point to a GitHub release if the release is provided as binary", () => {
		assert.equal(existingRelease.url.href, "https://github.com/HaxeFoundation/hashlink/releases/download/1.0/hl-1.0.zip");
	});
});

test("Release.find()", async ctx => {
	await ctx.test("should return `undefined` if no release matches the version constraint", () => {
		assert.ok(!Release.find("666.6.6"));
	});

	await ctx.test("should return the release corresponding to the version constraint if it exists", () => {
		assert.equal(Release.find("*"), Release.latest);
		assert.equal(Release.find("1.x"), Release.latest);
		assert.equal(Release.find("=1.0.0")?.version, "1.0.0");
		assert.equal(Release.find(">=1.0.0 <1.11.0")?.version, "1.10.0");
	});
});

test("Release.get()", async ctx => {
	await ctx.test("should return `undefined` if no release matches to the version number", () => {
		assert.ok(!Release.get("666.6.6"));
	});

	await ctx.test("should return the release corresponding to the version number if it exists", () => {
		assert.equal(Release.get("1.0.0")?.version, "1.0.0");
	});
});

test("Release.getAsset()", async ctx => {
	await ctx.test("should return `undefined` if no asset matches the platform", () => {
		assert.ok(!nonExistentRelease.getAsset(Platform.windows));
	});

	await ctx.test("should return the asset corresponding to the platform number if it exists", () => {
		assert.equal(existingRelease.getAsset(Platform.windows)?.file, "hl-1.0.zip");
	});
});
