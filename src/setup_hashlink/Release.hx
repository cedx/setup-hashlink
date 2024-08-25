package setup_hashlink;

import coconut.data.List;
import coconut.data.Model;
import haxe.Resource;
import tink.Json;
import tink.Url;
import tink.semver.Constraint;
import tink.semver.Version;

/** Represents a GitHub release. **/
@:jsonParse(json -> new setup_hashlink.Release(json))
class Release implements Model {

	/** The latest release. **/
	public static var latest(get, never): Release;
		static function get_latest() return data.first().sure();

	/** The base URL of the releases. **/
	static final baseUrl: Url = "https://github.com/HaxeFoundation/hashlink/";

	/** The list of all releases. **/
	static final data: List<Release> = (Json.parse(Resource.getString("releases.json")): Array<Release>);

	/** The associated assets. **/
	@:constant var assets: List<ReleaseAsset> = @byDefault new List();

	/** Value indicating whether this release exists. **/
	@:computed var exists: Bool = data.exists(release -> release.version == version);

	/** Value indicating whether this release is provided as source code. **/
	@:computed var isSource: Bool = getAsset(Sys.systemName()) == None;

	/** The associated Git tag. **/
	@:computed var tag: String = {
		final semver: Version = version;
		final tag = '${semver.major}.${semver.minor}';
		semver.patch > 0 ? '$tag.${semver.patch}' : tag;
	}

	/** The download URL. **/
	@:computed var url: Url = baseUrl.resolve(switch getAsset(Sys.systemName()) {
		case None: 'archive/refs/tags/$tag.zip';
		case Some(asset): 'releases/download/$tag/${asset.file}';
	});

	/** The version number. **/
	@:constant var version: String = @byDefault "0.0.0";

	/** Finds a release that matches the specified version constraint. **/
	public static function find(constraint: Constraint): Option<Release>
		return data.first(release -> constraint.matches(release.version));

	/** Gets the release corresponding to the specified version. **/
	public static function get(version: Version): Option<Release>
		return data.first(release -> release.version == version);

	/** Gets the asset corresponding to the specified operating system. **/
	public function getAsset(os: OperatingSystem): Option<ReleaseAsset>
		return assets.first(asset -> asset.os == os);
}

/** Represents an asset of a GitHub release. **/
@:jsonParse(json -> new setup_hashlink.Release.ReleaseAsset(json))
class ReleaseAsset implements Model {

	/** The target file. **/
	@:constant var file: String;

	/** The target operating system. **/
	@:constant var os: OperatingSystem;
}
