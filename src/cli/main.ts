import {getInput, info, setFailed} from "@actions/core";
import {Release} from "../release.js";
import {Setup} from "../setup.js";

/**
 * Application entry point.
 * @returns Resolves when Apache Ant has been installed.
 */
async function main(): Promise<void> {
	const version = getInput("version");
	const release = Release.find(!version || version == "latest" ? "*" : version);
	if (!release) throw Error("No release matching the version constraint.");

	const path = await new Setup(release).install();
	info(`HashLink ${release.version} successfully installed in "${path}".`);
}

// Start the application.
main().catch(error => setFailed(error instanceof Error ? error : String(error)));
