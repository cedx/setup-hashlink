import {execSync} from "node:child_process";
import {readdirSync} from "node:fs";
import {exportVariable} from "@actions/core";
import {join} from "node:path";

/**
 * Manages the download and installation of the HashLink VM.
 */
class Setup {

	/**
	 * The release to download and install.
	 * @readonly
	 * @type {import("./release.js").Release}
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
	download() {

	}

	/**
	 * Compiles the HashLink sources on the Linux platform.
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
	 */
	#compileMacOs() {
		const commands = ["brew bundle", "make", "sudo make install"];
		commands.forEach(execSync);
		return "/usr/local";
	}

	/**
	 * Determines the name of the single subfolder in the specified directory.
	 * @param {string} directory The directory path.
	 * @returns {string|undefined} The name of the single subfolder in the specified directory.
	 */
	#findSubfolder(directory) {
		const folders = readdirSync(directory, {withFileTypes: true}).filter(entity => entity.isDirectory());
		return folders.length == 1 ? folders[0].name : undefined;
	}
}
