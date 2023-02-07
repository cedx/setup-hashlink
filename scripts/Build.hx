import sys.io.File;

/** Runs the script. **/
function main() {
	Sys.command("haxe", ["--dce", "full", "build.hxml"]);

	final file = "bin/setup_hashlink.js";
	Sys.command("npx", ["ncc", "build", file, "--minify", "--out=var", "--target=es2022"]);
	File.saveContent(file, '#!/usr/bin/env node\n${File.getContent("var/index.js")}');

	Sys.command("git", ["update-index", "--chmod=+x", file]);
	if (Sys.systemName() != "Windows") Sys.command("chmod", ["+x", file]);
}
