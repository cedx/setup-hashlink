import {parseJson, replaceInFile, shebang} from "./tools.js";

/**
 * Packages the project.
 */
const {version} = await parseJson("../package.json");
replaceInFile("README.md", /action\/v\d+(\.\d+){2}/, `action/v${version}`);
shebang("bin/setup_hashlink.cjs");
