import Sys.*;
import Tools.removeDirectory;
import haxe.Json;
import sys.FileSystem.*;
import sys.io.File.*;

/** Runs the script. **/
function main() {
	if (exists("docs")) removeDirectory("docs");

	command("haxe --define doc-gen --no-output --xml var/api.xml build.hxml");
	command("lix", [
		"run", "dox",
		"--define", "description", "Set up your GitHub Actions workflow with a specific version of the HashLink VM.",
		"--define", "source-path", "https://bitbucket.org/cedx/setup-hashlink/src/main/src",
		"--define", "themeColor", "0xffc105",
		"--define", "version", Json.parse(getContent("haxelib.json")).version,
		"--define", "website", "https://bitbucket.org/cedx/setup-hashlink",
		"--input-path", "var",
		"--output-path", "docs",
		"--title", "Setup HashLink VM",
		"--toplevel-package", "setup_hashlink"
	]);

	copy("www/favicon.ico", "docs/favicon.ico");
}
