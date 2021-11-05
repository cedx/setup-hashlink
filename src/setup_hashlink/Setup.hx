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
		var cache: String;
		return ToolCache.downloadTool(release.url).toPromise()
			.next(file -> ToolCache.extractZip(file))
			.next(path -> { cache = path; findSubfolder(path); })
			.next(name -> normalizeSeparator(Path.join([cache, name])));
	}

	/**
		Installs the HashLink VM, after downloading it if required.
		Returns the path to the install directory.
	**/
	public function install() {
		final cache = ToolCache.find("hashlink", release.version);
		final promise = cache.length > 0 ? Promise.resolve(cache) : download().next(path -> ToolCache.cacheDir(path, "hashlink", release.version));
		return promise.next(path -> #if !tink_unittest release.isSource ? compile(path) : #end Success(path)).next(path ->  {
			final resolvedPath = normalizeSeparator(path);
			Core.addPath(release.isSource ? Path.join([resolvedPath, "bin"]) : resolvedPath);
			resolvedPath;
		});
	}

	/**
		Compiles the sources of the HashLink VM located in the specified `directory`.
		Returns the path to the output directory.
	**/
	function compile(directory: String) {
		final platform: Platform = Sys.systemName();
		return [Platform.Linux, Platform.MacOS].contains(platform)
			? Success(platform == Linux ? compileOnLinux(directory) : compileOnMacOS(directory))
			: Failure(new Error(MethodNotAllowed, 'Compilation is not supported on $platform platform.'));
	}

	/**
		Compiles for the Linux platform the sources of the HashLink VM located in the specified `directory`.
		Returns the path to the output directory.
	**/
	function compileOnLinux(directory: String) {
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
			'sudo apt install ${dependencies.join(" ")}',
			"make",
			"sudo make install",
			"sudo ldconfig"
		];

		Sys.setCwd(directory);
		commands.iter(command -> Sys.command(command));
		return "/usr/local";
	}

	/**
		Compiles for the macOS platform the sources of the HashLink VM located in the specified `directory`.
		Returns the path to the output directory.
	**/
	function compileOnMacOS(directory: String) {
		final commands = [
			"sudo brew bundle",
			"make",
			"sudo make install"
		];

		Sys.setCwd(directory);
		commands.iter(command -> Sys.command(command));
		return "/usr/local";
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
