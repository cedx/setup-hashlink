import {addPath, exportVariable} from "@actions/core";
import {cacheDir, downloadTool, extractZip, find} from "@actions/tool-cache";
import {exec} from "node:child_process";
import {readdir} from "node:fs/promises";
import {join} from "node:path";
import {chdir, cwd, env, platform} from "node:process";
import {promisify} from "node:util";
import type {Release} from "./release.js";

/**
 * Spawns a new process using the specified command.
 */
const run = promisify(exec);

/**
 * Manages the download and installation of the HashLink VM.
 */
export class Setup {

	/**
	 * The release to download and install.
	 */
	readonly release: Release;

	/**
	 * Creates a new setup.
	 * @param release The release to download and install.
	 */
	constructor(release: Release) {
		this.release = release;
	}

	/**
	 * Downloads and extracts the ZIP archive of the HashLink VM.
	 * @returns The path to the extracted directory.
	 */
	async download(): Promise<string> {
		const directory = await extractZip(await downloadTool(this.release.url.href));
		return join(directory, await this.#findSubfolder(directory));
	}

	/**
	 * Installs the HashLink VM, after downloading it if required.
	 * @returns The path to the installation directory.
	 */
	async install(): Promise<string> {
		let directory = find("hashlink", this.release.version);
		if (!directory) directory = await cacheDir(await this.download(), "hashlink", this.release.version);

		if (this.release.isSource && env.CI == "true") await this.#compile(directory);
		addPath(this.release.isSource ? join(directory, "bin") : directory);
		return directory;
	}

	/**
	 * Compiles the sources of the HashLink VM located in the specified directory.
	 * @param directory The path to the directory containing the HashLink sources.
	 * @returns The path to the output directory.
	 */
	async #compile(directory: string): Promise<string> {
		if (!["darwin", "linux"].includes(platform)) throw Error(`Compilation is not supported on "${platform}" platform.`);

		const workingDirectory = cwd();
		chdir(directory);
		const path = await (platform == "darwin" ? this.#compileMacOS() : this.#compileLinux());
		chdir(workingDirectory);
		return path;
	}

	/**
	 * Compiles the HashLink sources on the Linux platform.
	 * @returns The path to the output directory.
	 */
	async #compileLinux(): Promise<string> {
		const dependencies = [
			"libglu1-mesa-dev",
			"libmbedtls-dev",
			"libopenal-dev",
			"libpng-dev",
			"libsdl2-dev",
			"libsqlite3-dev",
			"libturbojpeg-dev",
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

		for (const command of commands) await run(command, {maxBuffer: 10 * 1024 * 1024});
		const libPath = (env.LD_LIBRARY_PATH ?? "").trim();
		const prefix = "/usr/local";
		exportVariable("LD_LIBRARY_PATH", libPath ? `${prefix}/bin:${libPath}` : `${prefix}/bin`);
		return prefix;
	}

	/**
	 * Compiles the HashLink sources on the macOS platform.
	 * @returns The path to the output directory.
	 */
	async #compileMacOS(): Promise<string> {
		const prefix = "/usr/local";
		const commands = [
			"brew bundle",
			"make",
			"sudo make codesign_osx",
			"sudo make install",
			`sudo install_name_tool -change libhl.dylib ${prefix}/lib/libhl.dylib ${prefix}/bin/hl`
		];

		for (const command of commands) await run(command, {maxBuffer: 10 * 1024 * 1024});
		return prefix;
	}

	/**
	 * Determines the name of the single subfolder in the specified directory.
	 * @param directory The directory path.
	 * @returns The name of the single subfolder in the specified directory.
	 * @throws `Error` when the subfolder could not be determined.
	 */
	async #findSubfolder(directory: string): Promise<string> {
		const folders = (await readdir(directory, {withFileTypes: true})).filter(entity => entity.isDirectory());
		switch (folders.length) {
			case 0: throw Error(`No subfolder found in: ${directory}.`);
			case 1: return folders[0].name;
			default: throw Error(`Multiple subfolders found in: ${directory}.`);
		}
	}
}
