import {addPath, exportVariable} from "@actions/core"
import {cacheDir, downloadTool, extractZip, find} from "@actions/tool-cache"
import {exec} from "node:child_process"
import {readdir} from "node:fs/promises"
import {join} from "node:path"
import {chdir, cwd, env, platform} from "node:process"
import {promisify} from "node:util"

# Spawns a new process using the specified command.
run = promisify exec

# Manages the download and installation of the HashLink VM.
export class Setup

	# Creates a new setup.
	constructor: (release) ->

		# The release to download and install.
		@release = release

	# Downloads and extracts the ZIP archive of the HashLink VM.
	# Returns the path to the extracted directory.
	download: ->
		directory = await extractZip await downloadTool @release.url.href
		join directory, await @_findSubfolder directory

	# Installs the HashLink VM, after downloading it if required.
	# Returns the path to the installation directory.
	install: ->
		directory = if path = find("hashlink", @release.version) then path else await cacheDir (await @download()), "hashlink", @release.version
		await @_compile directory if @release.isSource and env.GITHUB_ACTIONS is "true"
		addPath if @release.isSource then join directory, "bin" else directory
		directory

	# Compiles the sources of the HashLink VM located in the specified directory.
	# Returns the path to the output directory.
	_compile: (directory) ->
		Promise.reject Error "Compilation is not supported on \"#{platform}\" platform." if platform not in ["darwin", "linux"]

		workingDirectory = cwd()
		chdir directory
		path = await if platform is "darwin" then @_compileMacOs() else @_compileLinux()
		chdir workingDirectory
		path

	# Compiles the HashLink sources on the macOS platform.
	_compileLinux: ->
		dependencies = [
			"libglu1-mesa-dev"
			"libmbedtls-dev"
			"libopenal-dev"
			"libpng-dev"
			"libsdl2-dev"
			"libsqlite3-dev"
			"libturbojpeg-dev"
			"libuv1-dev"
			"libvorbis-dev"
		]

		commands = [
			"sudo apt-get update"
			"sudo apt-get install --assume-yes --no-install-recommends #{dependencies.join " "}"
			"make"
			"sudo make install"
			"sudo ldconfig"
		]

		await run command, maxBuffer: 10 * 1024 * 1024 for command from commands
		libPath = (env.LD_LIBRARY_PATH ? "").trim()
		prefix = "/usr/local"
		exportVariable "LD_LIBRARY_PATH", if libPath then "#{prefix}/bin:#{libPath}" else "#{prefix}/bin"
		prefix

	# Compiles the HashLink sources on the macOS platform.
	_compileMacOs: ->
		prefix = "/usr/local"
		commands = [
			"brew bundle"
			"make"
			"sudo make codesign_osx"
			"sudo make install"
			"sudo install_name_tool -change libhl.dylib #{prefix}/lib/libhl.dylib #{prefix}/bin/hl"
		]

		await run command, maxBuffer: 10 * 1024 * 1024 for command from commands
		prefix

	# Determines the name of the single subfolder in the specified directory.
	_findSubfolder: (directory) ->
		folders = (await readdir directory, withFileTypes: yes).filter (entity) -> entity.isDirectory()
		switch folders.length
			when 0 then throw Error "No subfolder found in: #{directory}."
			when 1 then folders[0].name
			else throw Error "Multiple subfolders found in: #{directory}."
