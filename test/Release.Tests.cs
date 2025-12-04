namespace Belin.SetupHashLink;

/// <summary>
/// Tests the features of the <see cref="Release"/> class.
/// </summary>
/// <param name="testContext">The test context.</param>
[TestClass]
public sealed class ReleaseTests {

	/// <summary>
	/// A release that exists.
	/// </summary>
	private readonly Release existingRelease = new("1.15.0", [
		new Release.Asset(Platform.Linux, "hashlink-1.15.0.zip"),
		new Release.Asset(Platform.MacOS, "hashlink-1.15.0.zip"),
		new Release.Asset(Platform.Windows, "hashlink-1.15.0.zip")
	]);

	/// <summary>
	/// A release that does not exist.
	/// </summary>
	private readonly Release nonExistingRelease = new("666.6.6");

	[TestMethod]
	public void Exists() {
		IsTrue(existingRelease.Exists);
		IsFalse(nonExistingRelease.Exists);
	}

	[TestMethod]
	public void IsSource() {
		IsFalse(existingRelease.IsSource);
		IsTrue(nonExistingRelease.IsSource);
	}

	[TestMethod]
	public void Tag() {
		AreEqual("1.15", existingRelease.Tag);
		AreEqual("666.6.6", nonExistingRelease.Tag);
	}

	[TestMethod]
	public void Url() {
		AreEqual(new Uri("https://github.com/HaxeFoundation/hashlink/releases/download/1.15/hashlink-1.15.0.zip"), existingRelease.Url);
		AreEqual(new Uri("https://github.com/HaxeFoundation/hashlink/archive/refs/tags/666.6.6.zip"), nonExistingRelease.Url);
	}

	[TestMethod]
	public void Find() {
		IsNull(Release.Find(nonExistingRelease.Version.ToString()));
		IsNull(Release.Find("2"));
		IsNull(Release.Find(">1.15"));

		AreEqual(Release.Latest, Release.Find("latest"));
		AreEqual(Release.Latest, Release.Find("*"));
		AreEqual(Release.Latest, Release.Find("1"));

		AreEqual(new Release("1.8.0"), Release.Find("=1.8"));
		AreEqual(new Release("1.9.0"), Release.Find("<1.10"));
		AreEqual(new Release("1.10.0"), Release.Find("<=1.10"));

		Throws<FormatException>(() => Release.Find("abc"));
		Throws<FormatException>(() => Release.Find("?1.10"));
	}

	[TestMethod]
	public void Get() {
		IsNull(Release.Get(nonExistingRelease.Version));
		AreEqual(Version.Parse("1.8.0"), Release.Get("1.8.0")?.Version);
	}

	[TestMethod]
	public void GetAsset() {
		AreEqual("hashlink-1.15.0.zip", existingRelease.GetAsset(Platform.Windows)?.File);
		IsNull(nonExistingRelease.GetAsset(Platform.Windows));
	}
}
