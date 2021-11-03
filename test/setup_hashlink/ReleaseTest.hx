package setup_hashlink;

/** Tests the features of the `Author` class. **/
class ReleaseTest {

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `exists` property. **/
	/*
	@:variant("1.0.0", true)
	@:variant("6.6.6", false)
	public function testExists(input: String, output: Bool)
		return assert(new Release({version: input}).exists == output);*/

	/** Tests the `isSource` property. **/
	/*
	@:variant("1.0.0", "1.0")
	@:variant("6.6.6", "6.6")
	public function testIsSource(input: String, output: Bool)
		return assert(new Release({version: input}).tag == output);*/

	/** Tests the `latest` property. **/
	public function testLatest()
		return assert(Release.latest.match(Some(_)), "Latest release should exist.");

	/** Tests the `tag` property. **/
	@:variant("1.0.0", "1.0")
	@:variant("6.6.6", "6.6")
	public function testTag(input: String, output: String)
		return assert(new Release({version: input}).tag == output);
}
