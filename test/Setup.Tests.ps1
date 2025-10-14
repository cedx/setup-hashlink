<#
.SYNOPSIS
	Tests the features of the {@link Setup} class.
#>
Describe "Setup" {
	$latestRelease = /** @type {Release}#> (Release.latest);
	env.RUNNER_TEMP ??= resolve("var/tmp");
	env.RUNNER_TOOL_CACHE ??= resolve("var/cache");

	Describe "download()" {
		It "should properly download and extract the HashLink VM", async () => {
			$setup = new Setup(latestRelease);
			$executable = `hl${setup.release.isSource ? ".vcxproj" : platform == "win32" ? ".exe" : [string]::Empty}`;
			$dynamicLib = `libhl${setup.release.isSource ? ".vcxproj" : platform == "darwin" ? ".dylib" : platform == "win32" ? ".dll" : ".so"}`;

			$path = await setup.download();
			return doesNotReject(Promise.all([executable, dynamicLib].map(file => access(join(path, file)))));
		});
	});

	Describe "install()" {
		It "should add the HashLink VM binaries to the PATH environment variable", async () => {
			$path = await new Setup(latestRelease).install();
			ok(env.PATH?.includes(path));
		});
	});
});
