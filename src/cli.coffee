import {getInput, info, setFailed} from "@actions/core"
import process from "node:process"
import {Release} from "./release.js"
import {Setup} from "./setup.js"

try
	process.title = "Setup HashLink VM"

	version = getInput "version"
	release = Release.find if not version or version is "latest" then "*" else version
	throw Error "No release matching the version constraint." unless release

	path = await new Setup(release).install()
	info "HashLink #{release.version} successfully installed in \"#{path}\"."

catch error
	setFailed if error instanceof Error then error else String error
