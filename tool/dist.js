import {readFileSync, writeFileSync} from "node:fs";
import {EOL} from "node:os";
import pkg from "../package.json" with {type: "json"};

// Packages the project.
const cli = "bin/setup_hashlink.cjs";
writeFileSync(cli, `#!/usr/bin/env node${EOL}${readFileSync(cli, {encoding: "utf8"})}`);

const readMe = "README.md";
writeFileSync(readMe, readFileSync(readMe, {encoding: "utf8"}).replace(/action\/v\d+(\.\d+){2}/, `action/v${pkg.version}`));
