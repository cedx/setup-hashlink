import {readdir} from "node:fs/promises";
import {join} from "node:path";
import {chdir, cwd, env, platform} from "node:process";
import {addPath, exportVariable} from "@actions/core";
import {cacheDir, downloadTool, extractZip, find} from "@actions/tool-cache";
import {execa} from "execa";

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
	 * @returns {Promise<string>} The path to the installation directory.
	 */
	async install() {
		let directory = find("hashlink", this.release.version);
		if (!directory) {
			const path = await this.download();
			directory = await cacheDir(path, "hashlink", this.release.version);
		}

		if (this.release.isSource && env.GITHUB_ACTIONS == "true") await this.#compile(directory);
		addPath(this.release.isSource ? join(directory, "bin") : directory);
		return directory;
	}

	/**
	 * Compiles the sources of the HashLink VM located in the specified directory.
	 * @param {string} directory The path to the directory containing the HashLink sources.
	 * @returns {Promise<string>} The path to the output directory.
	 */
	async #compile(directory) {
		if (!["darwin", "linux"].includes(platform)) throw Error(`Compilation is not supported on "${platform}" platform.`);

		const workingDirectory = cwd();
		chdir(directory);
		const path = await (platform == "darwin" ? this.#compileMacOS() : this.#compileLinux());
		chdir(workingDirectory);
		return path;
	}

	/**
	 * Compiles the HashLink sources on the Linux platform.
	 * @returns {Promise<string>} The path to the output directory.
	 */
	async #compileLinux() {
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

		for (const command of commands) await execa(command, {shell: true});
		const libPath = (env.LD_LIBRARY_PATH ?? "").trim();
		exportVariable("LD_LIBRARY_PATH", libPath ? `/usr/local/bin:${libPath}` : "/usr/local/bin");
		return "/usr/local";
	}

	/**
	 * Compiles the HashLink sources on the macOS platform.
	 * @returns {Promise<string>} The path to the output directory.
	 */
	async #compileMacOS() {
		const commands = ["brew bundle", "make", "sudo make install"];
		for (const command of commands) await execa(command, {shell: true});
		return "/usr/local";
	}

	/**
	 * Determines the name of the single subfolder in the specified directory.
	 * @param {string} directory The directory path.
	 * @returns {Promise<string>} The name of the single subfolder in the specified directory.
	 */
	async #findSubfolder(directory) {
		const folders = (await readdir(directory, {withFileTypes: true})).filter(entity => entity.isDirectory());
		switch (folders.length) {
			case 0: throw Error(`No subfolder found in: ${directory}.`);
			case 1: return folders[0].name;
			default: throw Error(`Multiple subfolders found in: ${directory}.`);
		}
	}
}
