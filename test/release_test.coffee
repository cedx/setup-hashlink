import {equal, ok} from "node:assert/strict"
import {describe, it} from "node:test"
import {Release} from "@cedx/setup-hashlink"

# Tests the features of the `Release` class.
describe "Release", ->
	nonExistingRelease = new Release "666.6.6"
	existingRelease = new Release "1.14.0", [
		{platform: "darwin", file: "hashlink-1.14.0.zip"}
		{platform: "linux", file: "hashlink-1.14.0.zip"}
		{platform: "win32", file: "hashlink-1.14.0.zip"}
	]

	describe "exists", ->
		it "should return `false` if the release does not exist", -> ok not nonExistingRelease.exists
		it "should return `true` if the release exists", -> ok existingRelease.exists

	describe "isSource", ->
		it "should return `false` if the release is provided as binary", -> ok not existingRelease.isSource
		it "should return `true` if the release is provided as source code", -> ok nonExistingRelease.isSource

	describe "latest", ->
		it "should exist", -> ok Release.latest.exists

	describe "tag", ->
		it "should not include the patch component if it's zero", -> equal existingRelease.tag, "1.14"
		it "should include the patch component if it's greater than zero", -> equal nonExistingRelease.tag, "666.6.6"

	describe "url", ->
		it "should point to a GitHub tag if the release is provided as source code", ->
			equal nonExistingRelease.url.href, "https://github.com/HaxeFoundation/hashlink/archive/refs/tags/666.6.6.zip"
		it "should point to a GitHub release if the release is provided as binary", ->
			equal existingRelease.url.href, "https://github.com/HaxeFoundation/hashlink/releases/download/1.14/hashlink-1.14.0.zip"

	describe "find()", ->
		it "should return `null` if no release matches the version constraint", ->
			ok not Release.find "666.6.6"

		it "should return the release corresponding to the version constraint if it exists", ->
			equal Release.find("*"), Release.latest
			equal Release.find("1.x"), Release.latest
			equal Release.find("=1.0.0").version, "1.0.0"
			equal Release.find(">=1.0.0 <1.11.0").version, "1.10.0"

	describe "get()", ->
		it "should return `null` if no release matches to the version number", -> ok not Release.get "666.6.6"
		it "should return the release corresponding to the version number if it exists", -> equal Release.get("1.14.0").version, "1.14.0"

	describe "getAsset()", ->
		it "should return `null` if no asset matches the platform", -> ok not nonExistingRelease.getAsset "win32"
		it "should return the asset corresponding to the given platform if it exists", -> equal existingRelease.getAsset("win32").file, "hashlink-1.14.0.zip"
