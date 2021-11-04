package setup_hashlink;

import js.actions.Core;
import js.actions.ToolCache;

using Lambda;
using haxe.io.Path;
using setup_hashlink.PathTools;

/** Manages the download and installation of the HashLink VM. **/
class Setup {

	/** The release to download and install. **/
	final release: Release;

	/** Creates a new setup. **/
	public function new(release: Release) this.release = release;

	/**
		Compiles the sources of the HashLink VM located in the specified `directory`.
	  Returns the path to the output directory.
	**/
	public function compile(directory: String): Promise<String> {
		final platform = Sys.systemName();
		if (platform != Platform.Linux) return new Error(MethodNotAllowed, 'Compilation is not supported on $platform platform.');

		final dependencies = [
			"libmbedtls-dev",
			"libopenal-dev",
			"libpng-dev",
			"libsdl2-dev",
			"libturbojpeg0-dev",
			"libuv1-dev",
			"libvorbis-dev"
		];

		final commands = dependencies.map(pkg -> 'sudo apt install $pkg').concat([
			"make",
			"make all",
			"sudo make install",
			"sudo ldconfig"
		]);

		commands.iter(command -> Sys.command(command));
		return Success("/usr/local");
	}

	/**
		Downloads and extracts the ZIP archive of the HashLink VM.
	  Returns the path to the extracted directory.
	**/
	public function download() return ToolCache.downloadTool(release.url).toPromise()
		.next(file -> ToolCache.extractZip(file))
		.next(path -> Path.join([path, release.url.path.withoutDirectory().withoutExtension()]).normalizeSeparator());

	/**
		Installs the HashLink VM, after downloading it if required.
	  Returns the path to the install directory.
	**/
	public function install(): Promise<String> {
		final cache = ToolCache.find("hashlink", release.version);
		final promise = cache.length > 0 ? Promise.resolve(cache) : download().next(path -> ToolCache.cacheDir(path, "hashlink", release.version));
		return promise.next(path -> release.isSource ? compile(path) : path).next(path ->  {
			final normalizedPath = path.normalizeSeparator();
			Core.addPath(normalizedPath);
			normalizedPath;
		});
	}
}
