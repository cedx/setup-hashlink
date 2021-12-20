import Sys.*;
import sys.io.File.*;

/** Runs the script. **/
function main() {
	Sys.putEnv("NODE_OPTIONS", "--openssl-legacy-provider");
	for (script in ["Clean", "Version"]) command('lix $script');
	command("haxe build.hxml");

	final file = "bin/setup_hashlink.js";
	command('npx ncc build $file --minify --out=var');
	saveContent(file, '#!/usr/bin/env node\n${getContent("var/index.js")}');
	command('git update-index --chmod=+x $file');
	if (systemName() != "Windows") command('chmod +x $file');
}
