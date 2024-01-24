import {execSync} from "node:child_process";
import {parseJson, replaceInFile} from "./tools.js";

/**
 * Publishes the package.
 */
const {version} = await parseJson("../package.json");
replaceInFile("README.md", /action\/v\d+(\.\d+){2}/, `action/v${version}`);
["tag", "push origin"].forEach(action => execSync(`git ${action} v${version}`));
