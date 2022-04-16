import sys.FileSystem;

/** Runs the script. **/
function main() {
	for (script in ["Clean", "Version"]) Sys.command('lix $script');
	Sys.command("haxe --dce full build.hxml");

	final file = "bin/setup_hashlink.js";
	Sys.command('npx ncc build $file --minify --out=var --target=es2020');
	FileSystem.rename("var/index.js", file);
	Sys.command('git update-index --chmod=+x $file');
	if (Sys.systemName() != "Windows") Sys.command('chmod +x $file');
}
