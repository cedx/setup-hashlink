import haxe.Json;
import sys.io.File;

/** Runs the script. **/
function main() {
	Sys.command("lix Dist");
	final version = Json.parse(File.getContent("haxelib.json")).version;
	for (action in ["tag", "push origin"]) Sys.command('git $action v$version');
}
