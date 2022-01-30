import haxe.io.Path.*;
import sys.FileSystem.*;
import sys.io.File.*;
using Lambda;
using haxe.zip.Tools;

/** Recursively deletes all files in the specified `directory`. **/
function cleanDirectory(directory: String) for (entry in readDirectory(directory).filter(entry -> entry != ".gitkeep")) {
	final path = join([directory, entry]);
	if (isDirectory(path)) removeDirectory(path);
	else deleteFile(path);
}

/** Recursively deletes the specified `directory`. **/
function removeDirectory(directory: String) {
	cleanDirectory(directory);
	deleteDirectory(directory);
}

/** Replaces in the specified `file` the substring which the `pattern` matches with the given `replacement`. **/
function replaceInFile(file: String, pattern: EReg, replacement: String)
	saveContent(file, pattern.replace(getContent(file), replacement));
