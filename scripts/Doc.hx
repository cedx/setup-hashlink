import haxe.Json;
import sys.FileSystem;
import sys.io.File;

/** Runs the script. **/
function main() {
	if (FileSystem.exists("docs")) Tools.removeDirectory("docs");

	Sys.command("haxe --define doc-gen --no-output --xml var/api.xml build.hxml");
	Sys.command("lix", [
		"run", "dox",
		"--define", "description", "Set up your GitHub Actions workflow with a specific version of the HashLink VM.",
		"--define", "source-path", "https://github.com/cedx/setup-hashlink/blob/main/src",
		"--define", "themeColor", "0x534d95",
		"--define", "version", Json.parse(File.getContent("haxelib.json")).version,
		"--define", "website", "https://github.com/cedx/setup-hashlink",
		"--input-path", "var",
		"--output-path", "docs",
		"--title", "Setup HashLink VM",
		"--toplevel-package", "setup_hashlink"
	]);

	File.copy("www/favicon.ico", "docs/favicon.ico");
}
