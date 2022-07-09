import {getInput, info, setFailed} from "@actions/core";
import {Release, Setup} from "./index.js";

// Start the application.
try {
	const version = getInput("version");
	const release = Release.find(version && version != "latest" ? version : "*");
	if (!release) throw new Error("No release matching the version constraint.");

	const path = await new Setup(release).install();
	info(`HashLink ${release.version} successfully installed in "${path}".`);
}
catch (error) {
	setFailed(error instanceof Error ? error : String(error));
}
