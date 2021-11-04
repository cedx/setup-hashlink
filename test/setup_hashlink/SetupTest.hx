package setup_hashlink;

import sys.FileSystem;

using StringTools;
using haxe.io.Path;

/** Tests the features of the `Setup` class. **/
@:asserts class SetupTest {

	/** Creates a new test. **/
	public function new() {}

	/** Method invoked once before running the first test. **/
	@:setup public function setup() {
		if (Sys.getEnv("RUNNER_TEMP") == null) Sys.putEnv("RUNNER_TEMP", FileSystem.absolutePath("var/test/temp"));
		if (Sys.getEnv("RUNNER_TOOL_CACHE") == null) Sys.putEnv("RUNNER_TOOL_CACHE", FileSystem.absolutePath("var/test/cache"));
		return Noise;
	}

	/** Tests the `download()` method. **/
	@:timeout(180000)
	public function testDownload() {
		final setup = new Setup(Release.latest);
		setup.download().next(path -> {
			final platform = Sys.systemName();
			final dynamicLibrary = "libhl" + switch platform {
				case Platform.MacOS: ".dylib";
				case Platform.Windows: ".dll";
				default: ".so";
			}

			final isSource = setup.release.isSource;
			final isWindows = platform == Platform.Windows;
			asserts.assert(FileSystem.exists(Path.join([path, if (isSource) "hl.vcxproj" else isWindows ? "hl.exe" : "bin/hl"])));
			asserts.assert(FileSystem.exists(Path.join([path, if (isSource) "libhl.vcxproj" else isWindows ? dynamicLibrary : 'lib/$dynamicLibrary'])));
		}).handle(asserts.handle);

		return asserts;
	}

	/** Tests the `install()` method. **/
	@:timeout(180000)
	public function testInstall() {
		new Setup(Release.latest).install()
			.next(path -> { trace(path); asserts.assert(Sys.getEnv("PATH").contains(path)); })
			.handle(asserts.handle);

		return asserts;
	}
}
