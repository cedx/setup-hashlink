<#
.SYNOPSIS
	Tests the features of the {@link Release} class.
#>
Describe "Release" {
	$nonExistingRelease = new Release("666.6.6");
	$existingRelease = new Release("1.15.0", [
		{platform: "darwin", file: "hashlink-1.15.0.zip"},
		{platform: "linux", file: "hashlink-1.15.0.zip"},
		{platform: "win32", file: "hashlink-1.15.0.zip"}
	]);

	Describe "exists" {
		It "should return `false` if the release does not exist", () => ok(!nonExistingRelease.exists));
		It "should return `true` if the release exists", () => ok(existingRelease.exists));
	});

	Describe "isSource" {
		It "should return `false` if the release is provided as binary", () => ok(!existingRelease.isSource));
		It "should return `true` if the release is provided as source code", () => ok(nonExistingRelease.isSource));
	});

	Describe "latest" {
		It "should exist", () => ok(Release.latest?.exists));
	});

	Describe "tag" {
		It "should not include the patch component if it's zero", () => equal(existingRelease.tag, "1.15"));
		It "should include the patch component if it's greater than zero", () => equal(nonExistingRelease.tag, "666.6.6"));
	});

	Describe "url" {
		It "should point to a GitHub tag if the release is provided as source code", () =>
			equal(nonExistingRelease.url.href, "https://github.com/HaxeFoundation/hashlink/archive/refs/tags/666.6.6.zip"));

		It "should point to a GitHub release if the release is provided as binary", () =>
			equal(existingRelease.url.href, "https://github.com/HaxeFoundation/hashlink/releases/download/1.15/hashlink-1.15.0.zip"));
	});

	Describe "find()" {
		It "should return `$null` if no release matches the version constraint", () =>
			ok(!Release.find("666.6.6")));

		It "should return the release corresponding to the version constraint if it exists" {
			equal(Release.find("*"), Release.latest);
			equal(Release.find("1.x"), Release.latest);
			equal(Release.find("=1.0.0")?.version, "1.0.0");
			equal(Release.find(">=1.0.0 <1.11.0")?.version, "1.10.0");
		});
	});

	Describe "get()" {
		It "should return `$null` if no release matches to the version number", () => ok(!Release.get("666.6.6")));
		It "should return the release corresponding to the version number if it exists", () => equal(Release.get("1.15.0")?.version, "1.15.0"));
	});

	Describe "getAsset()" {
		It "should return `$null` if no asset matches the platform", () =>
			ok(!nonExistingRelease.getAsset("win32")));

		It "should return the asset corresponding to the platform number if it exists", () =>
			equal(existingRelease.getAsset("win32")?.file, "hashlink-1.15.0.zip"));
	});
});
