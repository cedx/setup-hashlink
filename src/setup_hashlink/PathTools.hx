package setup_hashlink;

using StringTools;

/** Provides helper methods for handling file paths. **/
@:noDoc class PathTools {

	/** Normalizes the segment separators of the given `path` using the platform-specific separator. **/
	public static function normalizeSeparator(path: String)
		return Sys.systemName() == Platform.Windows ? path.replace("/", "\\") : path;
}
