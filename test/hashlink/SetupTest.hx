package hashlink;

import sys.FileSystem;
using Lambda;
using StringTools;
using haxe.io.Path;

/** Tests the features of the `Setup` class. **/
@:asserts final class SetupTest {

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `download()` method. **/
	@:timeout(180_000)
	public function download() {
		final os: OperatingSystem = Sys.systemName();
		final setup = new Setup(Release.latest);
		final isSource = setup.release.isSource;

		final executable = "hl" + if (isSource) ".vcxproj" else os == Windows ? ".exe" : "";
		final dynamicLibrary = "libhl" + if (isSource) ".vcxproj" else switch os {
			case MacOs: ".dylib";
			case Windows: ".dll";
			case _: ".so";
		}

		setup.download().next(path -> {
			asserts.assert(FileSystem.exists(Path.join([path, executable])));
			asserts.assert(FileSystem.exists(Path.join([path, dynamicLibrary])));
		}).handle(asserts.handle);

		return asserts;
	}

	/** Tests the `install()` method. **/
	@:timeout(180_000)
	public function install() {
		new Setup(Release.latest).install()
			.next(path -> asserts.assert(Sys.getEnv("PATH").contains(path)))
			.handle(asserts.handle);

		return asserts;
	}

	/** Method invoked once before running the first test. **/
	@:setup public function setup(): Promise<Noise> {
		if (Sys.getEnv("RUNNER_TEMP") == null) Sys.putEnv("RUNNER_TEMP", FileSystem.absolutePath("var/tmp"));
		if (Sys.getEnv("RUNNER_TOOL_CACHE") == null) Sys.putEnv("RUNNER_TOOL_CACHE", FileSystem.absolutePath("var/cache"));
		return Noise;
	}
}
