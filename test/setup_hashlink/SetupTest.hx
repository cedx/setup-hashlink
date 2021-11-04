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
		new Setup(Release.latest).download().next(path -> {
			trace(path);
			final isWindows = Sys.systemName() == Platform.Windows;
			asserts.assert(FileSystem.exists(Path.join([path, isWindows ? "hl.exe" : "bin/hl"])));
			asserts.assert(FileSystem.exists(Path.join([path, isWindows ? "libhl.dll" : "lib/libhl.so"])));
		}).handle(asserts.handle);

		return asserts;
	}

	/** Tests the `install()` method. **/
	@:timeout(180000)
	public function testInstall() {
		new Setup(Release.latest).install()
			.next(path -> asserts.assert(Sys.getEnv("PATH").contains(path)))
			.handle(asserts.handle);

		return asserts;
	}
}
