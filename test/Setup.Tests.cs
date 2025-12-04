namespace Belin.SetupHashLink;

/// <summary>
/// Tests the features of the <see cref="Setup"/> class.
/// </summary>
/// <param name="testContext">The test context.</param>
[TestClass]
public sealed class SetupTests(TestContext testContext) {

	/// <summary>
	/// The current platform.
	/// </summary>
	private readonly Platform platform = PlatformExtensions.GetCurrent();

	[ClassInitialize]
	public static void ClassInitialize(TestContext testContext) {
		var baseDir = Path.Join(AppDomain.CurrentDomain.BaseDirectory, "../var");
		if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable("GITHUB_ENV"))) Environment.SetEnvironmentVariable("GITHUB_ENV", Path.Join(baseDir, "GitHub-Env.txt"));
		if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable("GITHUB_PATH"))) Environment.SetEnvironmentVariable("GITHUB_PATH", Path.Join(baseDir, "GitHub-Path.txt"));
	}

	[TestMethod]
	public async Task Download() {
		var setup = new Setup(Release.Latest);
		var path = await setup.Download(testContext.CancellationToken);

		var executable = $"hl{(setup.Release.IsSource ? ".vcxproj" : platform == Platform.Windows ? ".exe" : "")}";
		IsTrue(File.Exists(Path.Join(path, executable)));

		var dynamicLibrary = $"libhl{(setup.Release.IsSource ? ".vcxproj" : platform == Platform.MacOS ? ".dylib" : platform == Platform.Linux ? ".so" : ".dll")}";
		IsTrue(File.Exists(Path.Join(path, dynamicLibrary)));
	}

	[TestMethod]
	public async Task Install() {
		var setup = new Setup(Release.Latest);
		var path = await setup.Install(testContext.CancellationToken);
		Contains(path, Environment.GetEnvironmentVariable("PATH")!);
		if (platform == Platform.Linux && setup.Release.IsSource) Contains("/usr/local/bin", Environment.GetEnvironmentVariable("LD_LIBRARY_PATH")!);
	}
}
