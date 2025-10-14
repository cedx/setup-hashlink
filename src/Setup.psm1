<#
.SYNOPSIS
	Spawns a new process using the specified command.
#>
$run = promisify(exec)

<#
.SYNOPSIS
	Manages the download and installation of the HashLink VM.
#>
class Setup {

	<#
	.SYNOPSIS
		The release to download and install.
	#>
	release: Release

	<#
	.SYNOPSIS
		Creates a new setup.
	.PARAMETER $release
		The release to download and install.
	#>
	constructor(release: Release) {
		this.release = release
	}

	<#
	.SYNOPSIS
		Downloads and extracts the ZIP archive of the HashLink VM.
	.OUTPUTS
		The path to the extracted directory.
	#>
	async download(): Promise<string> {
		$directory = await extractZip(await downloadTool(this.release.url.href))
		return join(directory, await this.#findSubfolder(directory))
	}

	<#
	.SYNOPSIS
		Installs the HashLink VM, after downloading it if required.
	.OUTPUTS
		The path to the installation directory.
	#>
	async install(): Promise<string> {
		let directory = find("hashlink", this.release.version)
		if (-not directory) directory = await cacheDir(await this.download(), "hashlink", this.release.version)

		if (this.release.isSource && env.CI == "true") await this.#compile(directory)
		addPath(this.release.isSource ? join(directory, "bin") : directory)
		return directory
	}

	<#
	.SYNOPSIS
		Compiles the sources of the HashLink VM located in the specified directory.
	.PARAMETER $directory
		The path to the directory containing the HashLink sources.
	.OUTPUTS
		The path to the output directory.
	#>
	async #compile(directory: string): Promise<string> {
		if (-not ["darwin", "linux"].includes(platform)) throw new Error(`Compilation is not supported on "${platform}" platform.`)

		$workingDirectory = cwd()
		chdir(directory)
		$path = await (platform == "darwin" ? this.#compileMacOS() : this.#compileLinux())
		chdir(workingDirectory)
		return path
	}

	<#
	.SYNOPSIS
		Compiles the HashLink sources on the Linux platform.
	.OUTPUTS
		The path to the output directory.
	#>
	async #compileLinux(): Promise<string> {
		$dependencies = [
			"libglu1-mesa-dev",
			"libmbedtls-dev",
			"libopenal-dev",
			"libpng-dev",
			"libsdl2-dev",
			"libsqlite3-dev",
			"libturbojpeg-dev",
			"libuv1-dev",
			"libvorbis-dev"
		]

		$commands = [
			"sudo apt-get update",
			`sudo apt-get install --assume-yes --no-install-recommends ${dependencies.join(" ")}`,
			"make",
			"sudo make install",
			"sudo ldconfig"
		]

		for ($command of commands) await run(command, {maxBuffer: 10 * 1024 * 1024})
		$libPath = (env.LD_LIBRARY_PATH ?? "").trim()
		$prefix = "/usr/local"
		exportVariable("LD_LIBRARY_PATH", libPath ? `${prefix}/bin:${libPath}` : `${prefix}/bin`)
		return prefix
	}

	<#
	.SYNOPSIS
		Compiles the HashLink sources on the macOS platform.
	.OUTPUTS
		The path to the output directory.
	#>
	async #compileMacOS(): Promise<string> {
		$prefix = "/usr/local"
		$commands = [
			"brew bundle",
			"make",
			"sudo make codesign_osx",
			"sudo make install",
			`sudo install_name_tool -change libhl.dylib ${prefix}/lib/libhl.dylib ${prefix}/bin/hl`
		]

		for ($command of commands) await run(command, {maxBuffer: 10 * 1024 * 1024})
		return prefix
	}

	<#
	.SYNOPSIS
		Determines the name of the single subfolder in the specified directory.
	.PARAMETER $directory
		The directory path.
	.OUTPUTS
		The name of the single subfolder in the specified directory.
	#>
	async #findSubfolder(directory: string): Promise<string> {
		$folders = (await readdir(directory, {withFileTypes: true})).filter(entity => entity.isDirectory())
		switch (folders.length) {
			case 0: throw new Error(`No subfolder found in: ${directory}.`)
			case 1: return folders[0].name
			default: throw new Error(`Multiple subfolders found in: ${directory}.`)
		}
	}
}
