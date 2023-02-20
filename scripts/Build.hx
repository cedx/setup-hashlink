import sys.io.File;

/** Builds the project. **/
function main() {
	Sys.command("haxe build.hxml");

	final file = "bin/setup_hashlink.js";
	Sys.command('npx ncc build $file --minify --out=var --target=es2022');
	File.copy("var/index.js", file);

	Sys.command('git update-index --chmod=+x $file');
	if (Sys.systemName() != "Windows") Sys.command('chmod +x $file');
}
