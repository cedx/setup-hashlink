import sys.FileSystem;
using Lambda;

/** Runs the script. **/
function main() {
	["js", "js.map"].map(ext -> 'bin/setup_hashlink.$ext').filter(FileSystem.exists).iter(FileSystem.deleteFile);
	Tools.cleanDirectory("var");
}
