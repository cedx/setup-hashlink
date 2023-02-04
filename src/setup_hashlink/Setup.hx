package setup_hashlink;

import js.actions.Core;
import js.actions.ToolCache;
import sys.FileSystem;
using Lambda;
using StringTools;
using haxe.io.Path;

/** Manages the download and installation of the HashLink VM. **/
class Setup {

	/** The release to download and install. **/
	public final release: Release;

	/** Creates a new setup. **/
	public function new(release: Release) this.release = release;

	/**
		Downloads and extracts the ZIP archive of the HashLink VM.
		Returns the path to the extracted directory.
	**/
	public function download() {
		var directory: String;
		return ToolCache.downloadTool(release.url).toPromise()
			.next(file -> ToolCache.extractZip(file))
			.next(path -> findSubfolder(directory = path))
			.next(name -> normalizeSeparator(Path.join([directory, name])));
	}

	/**
		Installs the HashLink VM, after downloading it if required.
		Returns the path to the install directory.
	**/
	public function install() {
		final directory = ToolCache.find("hashlink", release.version);
		final promise = directory.length > 0
			? Promise.resolve(directory)
			: download().next(path -> ToolCache.cacheDir(path, "hashlink", release.version));

		final needsToBeCompiled = release.isSource && Sys.getEnv("GITHUB_ACTIONS") == "true";
		return promise.next(path -> needsToBeCompiled ? compile(path) : Promise.resolve(path)).next(path -> {
			Core.addPath(normalizeSeparator(release.isSource ? Path.join([path, "bin"]) : path));
			normalizeSeparator(path);
		});
	}

	/**
		Compiles the sources of the HashLink VM located in the specified `directory`.
		Returns the path to the output directory.
	**/
	function compile(directory: String) {
		final platform: Platform = Sys.systemName();
		if (![Platform.Linux, Platform.MacOs].contains(platform))
			return Promise.reject(new Error(MethodNotAllowed, 'Compilation is not supported on $platform platform.'));

		final workingDirectory = Sys.getCwd();
		Sys.setCwd(directory);
		final promise = platform == Linux ? compileLinux() : compileMacOs();
		return promise.next(path -> { Sys.setCwd(workingDirectory); path; });
	}

	/** Compiles the HashLink sources on the macOS platform. **/
	function compileLinux() {
		final dependencies = [
			"libmbedtls-dev",
			"libopenal-dev",
			"libpng-dev",
			"libsdl2-dev",
			"libturbojpeg0-dev",
			"libuv1-dev",
			"libvorbis-dev"
		];

		final commands = [
			"sudo apt-get update",
			'sudo apt-get install --assume-yes --no-install-recommends ${dependencies.join(" ")}',
			"make",
			"sudo make install",
			"sudo ldconfig"
		];

		commands.iter(command -> Sys.command(command));
		Core.exportVariable("LD_LIBRARY_PATH", "/usr/local/bin");
		return Promise.resolve("/usr/local");
	}

	/** Compiles the HashLink sources on the macOS platform. **/
	function compileMacOs() {
		final commands = ["brew bundle", "make", "sudo make install"];
		commands.iter(command -> Sys.command(command));
		return Promise.resolve("/usr/local");
	}

	/** Determines the name of the single subfolder in the specified `directory`. **/
	function findSubfolder(directory: String) {
		final folders = FileSystem.readDirectory(directory).filter(name -> FileSystem.isDirectory(Path.join([directory, name])));
		return switch folders.length {
			case 0: return Failure(new Error(NotFound, 'No subfolder found in: $directory.'));
			case 1: return Success(folders[0]);
			default: return Failure(new Error(Conflict, 'Multiple subfolders found in: $directory.'));
		}
	}

	/** Normalizes the segment separators of the given `path` using the platform-specific separator. **/
	function normalizeSeparator(path: String)
		return Sys.systemName() == Platform.Windows ? path.replace("/", "\\") : path;
}
