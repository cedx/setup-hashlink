import {getInput, info, setFailed} from "@actions/core";
import process from "node:process";
import {Release} from "./Release.js";
import {Setup} from "./Setup.js";

/**
 * Application entry point.
 * @returns Resolves when HashLink has been installed.
 * @throws `Error` when no release matches the version constraint.
 */
async function main(): Promise<void> {
	process.title = "Setup HashLink VM";

	const version = getInput("version");
	const release = Release.find(!version || version == "latest" ? "*" : version);
	if (!release) throw Error("No release matching the version constraint.");

	const path = await new Setup(release).install();
	info(`HashLink ${release.version} successfully installed in "${path}".`);
}

// Start the application.
main().catch((error: unknown) => setFailed(error instanceof Error ? error : String(error)));
