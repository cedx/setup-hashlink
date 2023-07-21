import sys.io.File;

/** Builds the project. **/
function main() {
	final debug = Sys.args().contains("--debug");
	Sys.command('haxe ${debug ? "--debug" : ""} build.hxml');
}
