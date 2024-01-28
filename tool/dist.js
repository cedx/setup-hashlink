import {readFileSync, writeFileSync} from "node:fs";
import pkg from "../package.json" with {type: "json"};

// Packages the project.
const file = "README.md";
writeFileSync(file, readFileSync(file, {encoding: "utf8"}).replace(/action\/v\d+(\.\d+){2}/, `action/v${pkg.version}`));
