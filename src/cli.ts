import {getInput, info, setFailed} from "@actions/core";
import {Release, Setup} from "./index.js";

/**
 * Application entry point.
 * @returns Resolves when HashLink has been installed.
 */
async function main(): Promise<void> {
	const version = getInput("version");
	const release = Release.find(!version || version == "latest" ? "*" : version);
	if (!release) throw Error("No release matching the version constraint.");

	const path = await new Setup(release).install();
	info(`HashLink ${release.version} successfully installed in "${path}".`);
}

// Start the application.
main().catch((error: unknown) => setFailed(error instanceof Error ? error.message : String(error)));
