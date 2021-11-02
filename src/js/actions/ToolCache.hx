package js.actions;

import js.lib.Promise;

/** Functions necessary for downloading and caching tools. **/
@:jsRequire("@actions/tool-cache")
extern class ToolCache {

	/**
		Caches a downloaded `directory` and installs it into the tool cache directory.
		Returns the path of the location where the directory was cached.
	**/
	static function cacheDir(directory: String, tool: String, version: String, ?architecture: String): Promise<String>;

	/**
		Downloads a tool from the specified URL and streams it into a file.
		Returns the path of the downloaded file.
	**/
	static function downloadTool(url: String, ?destination: String): Promise<String>;

	/**
		Extracts the specified ZIP archive into the given directory.
		Returns the path of the location where the archive was extracted.
	**/
	static function extractZip(file: String, ?directory: String): Promise<String>;

	/**
		Finds the path to a tool version in the local installed tool cache.
		Returns an empty string if the tool was not found.
	**/
	static function find(toolName: String, versionSpec: String, ?architecture: String): String;
}
