package setup_hashlink;

using AssertionTools;

/** Tests the features of the `Author` class. **/
@:asserts class ReleaseTest {

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `exists` property. **/
	@:variant("1.0.0", true)
	@:variant("666.6.6", false)
	public function testExists(input: String, output: Bool)
		return assert(new Release({version: input}).exists == output);

	/** Tests the `isSource` property. **/
	/*
	@:variant("1.0.0", "1.0")
	@:variant("666.6.6", "666.6")
	public function testIsSource(input: String, output: Bool)
		return assert(new Release({version: input}).tag == output);*/

	/** Tests the `latest` property. **/
	public function testLatest() {
		asserts.doesNotThrow(() -> Release.latest);
		return asserts.done();
	}

	/** Tests the `tag` property. **/
	@:variant("1.0.0", "1.0")
	@:variant("666.6.6", "666.6.6")
	public function testTag(input: String, output: String)
		return assert(new Release({version: input}).tag == output);

	/** Tests the `get()` method. **/
	@:variant("1.0.0", "1.0.0")
	@:variant("666.6.6", null)
	public function testGet(input: String, output: Null<String>) return switch Release.get(input) {
		case None: assert(output == null);
		case Some(release): assert(output == release.version);
	}
}
