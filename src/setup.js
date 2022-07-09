import {execSync} from "node:child_process";
import {readdir} from "node:fs/promises";
import {join} from "node:path";
import {chdir, cwd, env, platform} from "node:process";
import {addPath, exportVariable} from "@actions/core";
import {cacheDir, downloadTool, extractZip, find} from "@actions/tool-cache";
import {Platform} from "./platform.js";

/**
 * Manages the download and installation of the HashLink VM.
 */
export class Setup {

	/**
	 * The release to download and install.
	 * @type {import("./release.js").Release}
	 * @readonly
	 */
	release;

	/**
	 * Creates a new setup.
	 * @param {import("./release.js").Release} release The release to download and install.
	 */
	constructor(release) {
		this.release = release;
	}

	/**
	 * Downloads and extracts the ZIP archive of the HashLink VM.
	 * @returns {Promise<string>} The path to the extracted directory.
	 */
	async download() {
		const path = await extractZip(await downloadTool(this.release.url.href));
		return join(path, await this.#findSubfolder(path));
	}

	/**
	 * Installs the HashLink VM, after downloading it if required.
	 * @returns {Promise<string>} The path to the install directory.
	 */
	async install() {
		let toolDir = find("hasklink", this.release.version);
		if (!toolDir) {
			const path = await this.download();
			toolDir = await cacheDir(path, "hashlink", this.release.version);
		}

		if (this.release.isSource && env.GITHUB_ACTIONS == "true") this.#compile(toolDir);
		addPath(this.release.isSource ? join(toolDir, "bin") : toolDir);
		return toolDir;
	}

	/**
	 * Compiles the sources of the HashLink VM located in the specified directory.
	 * @param {string} directory The path to the directory containing the HashLink sources.
	 * @returns {string} The path to the output directory.
	 * @throws {Error} The target platform is not supported.
	 */
	#compile(directory) {
		if (![Platform.linux, Platform.macOS].includes(platform))
			throw new Error(`Compilation is not supported on "${platform}" platform.`);

		const workingDirectory = cwd();
		chdir(directory);
		const path = platform == Platform.linux ? this.#compileLinux() : this.#compileMacOS();
		chdir(workingDirectory);
		return path;
	}

	/**
	 * Compiles the HashLink sources on the Linux platform.
	 * @returns {string} The path to the output directory.
	 */
	#compileLinux() {
		const dependencies = [
			"libmbedtls-dev",
			"libopenal-dev",
			"libpng-dev",
			"libsdl2-dev",
			"libturbojpeg0-dev",
			"libuv1-dev",
			"libvorbis-dev"
		];

		const commands = [
			"sudo apt-get update",
			`sudo apt-get install --assume-yes --no-install-recommends ${dependencies.join(" ")}`,
			"make",
			"sudo make install",
			"sudo ldconfig"
		];

		commands.forEach(execSync);
		exportVariable("LD_LIBRARY_PATH", "/usr/local/bin");
		return "/usr/local";
	}

	/**
	 * Compiles the HashLink sources on the macOS platform.
	 * @returns {string} The path to the output directory.
	 */
	#compileMacOS() {
		const commands = ["brew bundle", "make", "sudo make install"];
		commands.forEach(execSync);
		return "/usr/local";
	}

	/**
	 * Determines the name of the single subfolder in the specified directory.
	 * @param {string} directory The directory path.
	 * @returns {Promise<string>} The name of the single subfolder in the specified directory.
	 */
	async #findSubfolder(directory) {
		const folders = (await readdir(directory, {withFileTypes: true})).filter(entity => entity.isDirectory());
		if (folders.length == 1) return folders[0].name;
		throw new Error(`Unable to determine the single subfolder in: ${directory}`);
	}
}
