import {Release} from "./release.js";

/**
 * Manages the download and installation of the HashLink VM.
 */
export class Setup {

	/**
	 * The release to download and install.
	 */
	release: Release;

	/**
	 * Creates a new setup.
	 * @param release The release to download and install.
	 */
	constructor(release: Release);

	/**
	 * Downloads and extracts the ZIP archive of the HashLink VM.
	 * @returns The path to the extracted directory.
	 */
	download(): Promise<string>;

	/**
	 * Installs the HashLink VM, after downloading it if required.
	 * @returns The path to the installation directory.
	 */
	install(): Promise<string>;
}
