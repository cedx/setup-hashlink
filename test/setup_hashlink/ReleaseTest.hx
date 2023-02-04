package setup_hashlink;

import setup_hashlink.Release.ReleaseAsset as Asset;
using AssertionTools;

/** Tests the features of the `Release` class. **/
@:asserts class ReleaseTest {

	/** A release that exists. **/
	public static final existingRelease = new Release({version: "1.13.0", assets: [
		new Asset({platform: Linux, file: "hashlink-1.13.0.zip"}),
		new Asset({platform: MacOs, file: "hashlink-1.13.0.zip"}),
		new Asset({platform: Windows, file: "hashlink-1.13.0.zip"})
	]});

	/** A release that doesn't exist. **/
	public static final nonExistentRelease = new Release({version: "666.6.6"});

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `exists` property. **/
	@:variant(setup_hashlink.ReleaseTest.existingRelease, true)
	@:variant(setup_hashlink.ReleaseTest.nonExistentRelease, false)
	public function testExists(input: Release, output: Bool)
		return assert(input.exists == output);

	/** Tests the `isSource` property. **/
	@:variant(setup_hashlink.ReleaseTest.existingRelease, false)
	@:variant(setup_hashlink.ReleaseTest.nonExistentRelease, true)
	public function testIsSource(input: Release, output: Bool)
		return assert(input.isSource == output);

	/** Tests the `latest` property. **/
	public function testLatest() {
		asserts.doesNotThrow(() -> Release.latest);
		return asserts.done();
	}

	/** Tests the `tag` property. **/
	@:variant(setup_hashlink.ReleaseTest.existingRelease, "1.13")
	@:variant(setup_hashlink.ReleaseTest.nonExistentRelease, "666.6.6")
	public function testTag(input: Release, output: String)
		return assert(input.tag == output);

	/** Tests the `url` property. **/
	@:variant(setup_hashlink.ReleaseTest.existingRelease, "https://github.com/HaxeFoundation/hashlink/releases/download/1.13/hashlink-1.13.0.zip")
	@:variant(setup_hashlink.ReleaseTest.nonExistentRelease, "https://github.com/HaxeFoundation/hashlink/archive/refs/tags/666.6.6.zip")
	public function testUrl(input: Release, output: String)
		return assert(input.url == output);

	/** Tests the `find()` method. **/
	@:variant("*", Some(setup_hashlink.Release.latest.version))
	@:variant("1.x", Some(setup_hashlink.Release.latest.version))
	@:variant("=1.0.0", Some("1.0.0"))
	@:variant(">=1.0.0 <1.14.0", Some("1.13.0"))
	@:variant("666.6.6", None)
	public function testFind(input: String, output: Option<String>) return switch Release.find(input) {
		case None: assert(output == None);
		case Some(release): assert(output.equals(release.version));
	}

	/** Tests the `get()` method. **/
	@:variant("1.13.0", Some("1.13.0"))
	@:variant("666.6.6", None)
	public function testGet(input: String, output: Option<String>) return switch Release.get(input) {
		case None: assert(output == None);
		case Some(release): assert(output.equals(release.version));
	}

	/** Tests the `getAsset()` method. **/
	@:variant(setup_hashlink.ReleaseTest.existingRelease, Some("hashlink-1.13.0.zip"))
	@:variant(setup_hashlink.ReleaseTest.nonExistentRelease, None)
	public function testGetAsset(input: Release, output: Option<String>) return switch input.getAsset(Windows) {
		case None: assert(output == None);
		case Some(asset): assert(output.equals(asset.file));
	}
}