/** Packages the project. **/
function main() {
	final file = "bin/setup_hashlink.js";
	for (script in ["Clean", "Build", "Version"]) Sys.command('lix $script');
	Sys.command("npx rollup --config=etc/rollup.js");
	Sys.command('git update-index --chmod=+x $file');
}
