import Sys.*;
import sys.FileSystem.*;
import sys.io.File.*;

/** Runs the script. **/
function main() {
	for (script in ["Clean", "Version"]) command('lix $script');
	command("haxe build.hxml");

	final file = "bin/setup_hashlink.js";
	if (exists('$file.map')) deleteFile('$file.map');
	command('npx ncc build $file --minify --out=bin');
	saveContent(file, '#!/usr/bin/env node\n${getContent(file)}');
	if (systemName() != "Windows") command('chmod +x $file');
}
