import {doesNotReject, ok} from "node:assert/strict"
import {access} from "node:fs/promises"
import {join, resolve} from "node:path"
import {env, platform} from "node:process"
import {describe, it} from "node:test"
import {Release, Setup} from "@cedx/setup-hashlink"

# Tests the features of the `Setup` class.
describe "Setup", ->
	env.RUNNER_TEMP ?= resolve "var/tmp"
	env.RUNNER_TOOL_CACHE ?= resolve "var/cache"

	describe "download()", ->
		it "should properly download and extract the HashLink VM", ->
			release = Release.latest
			executable = "hl#{if release.isSource then ".vcxproj" else if platform is "win32" then ".exe" else ""}"
			dynamicLib = "libhl#{if release.isSource then ".vcxproj" else if platform is "darwin" then ".dylib" else if platform is "win32" then ".dll" else ".so"}"

			path = await new Setup(release).download()
			doesNotReject Promise.all [executable, dynamicLib].map (file) -> access join path, file

	describe "install()", ->
		it "should add the HashLink VM binaries to the PATH environment variable", ->
			path = await new Setup(Release.latest).install()
			ok env.PATH.includes path
