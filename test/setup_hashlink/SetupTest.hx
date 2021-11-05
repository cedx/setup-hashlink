package setup_hashlink;

import sys.FileSystem;

using Lambda;
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
	@:timeout(300000)
	public function testDownload() {
		final platform: Platform = Sys.systemName();
		final setup = new Setup(Release.latest);
		final isSource = setup.release.isSource;

		final executable = "hl" + if (isSource) ".vcxproj" else platform == Windows ? ".exe" : "";
		final dynamicLib = "libhl" + if (isSource) ".vcxproj" else switch platform {
			case MacOS: ".dylib";
			case Windows: ".dll";
			default: ".so";
		}

		setup.download()
			.next(path -> [executable, dynamicLib].map(file -> Path.join([path, file])).iter(file -> asserts.assert(FileSystem.exists(file))))
			.handle(asserts.handle);

		return asserts;
	}

	/** Tests the `install()` method. **/
	@:timeout(600000)
	public function testInstall() {
		new Setup(Release.latest).install()
			.next(path -> asserts.assert(Sys.getEnv("PATH").contains(path)))
			.handle(asserts.handle);

		return asserts;
	}
}
