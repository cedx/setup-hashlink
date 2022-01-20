import Tools;
import haxe.Json;
import sys.io.File.*;

/** Runs the script. **/
function main() {
	final version = Json.parse(getContent("haxelib.json")).version;
	replaceInFile("package.json", ~/"version": "\d+(\.\d+){2}"/, '"version": "$version"');
	replaceInFile("README.md", ~/action\/v\d+(\.\d+){2}/, 'action/v$version');
}
