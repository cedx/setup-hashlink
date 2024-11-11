import process from "node:process"
import semver, {SemVer} from "semver"
import data from "./data.js"

# Represents a GitHub release.
export class Release

	# The base URL of the releases.
	@baseUrl = new URL "https://github.com/HaxeFoundation/hashlink/"

	# The list of all releases.
	@data = data.map (release) -> new Release release.version, release.assets

	# Creates a new release.
	constructor: (version, assets = []) ->

		# The associated assets.
		@assets = assets

		# The version number.
		@version = version

	# The latest release.
	Object.defineProperty @, "latest",
		get: -> @data.at(0) or null

	# Value indicating whether this release exists.
	Object.defineProperty @prototype, "exists",
		get: -> Release.data.some (release) => release.version is @version

	# Value indicating whether this release is provided as source code.
	Object.defineProperty @prototype, "isSource",
		get: -> not @getAsset process.platform

	# The associated Git tag.
	Object.defineProperty @prototype, "tag",
		get: ->
			{major, minor, patch} = new SemVer @version
			if patch > 0 then "#{major}.#{minor}.#{patch}" else "#{major}.#{minor}"

	# The download URL.
	Object.defineProperty @prototype, "url",
		get: ->
			asset = @getAsset process.platform
			path = if asset then "releases/download/#{@tag}/#{asset.file}" else "archive/refs/tags/#{@tag}.zip"
			new URL path, Release.baseUrl

	# Finds a release that matches the specified version constraint.
	@find: (constraint) -> (@data.find (release) -> semver.satisfies release.version, constraint) or null

	# Gets the release corresponding to the specified version.
	@get: (version) -> (@data.find (release) -> release.version is version) or null

	# Gets the asset corresponding to the specified platform.
	getAsset: (platform) -> (@assets.find (asset) -> asset.platform is platform) or null
