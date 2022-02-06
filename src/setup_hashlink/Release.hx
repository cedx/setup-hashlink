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

	/** The base URL of the releases. **/
	static final baseUrl: Url = "https://github.com/HaxeFoundation/hashlink/";

	/** The list of all releases. **/
	static final data: List<Release> = (Json.parse(Resource.getString("releases.json")): Array<Release>);

	/** The associated assets. **/
	@:constant var assets: List<ReleaseAsset> = new List();

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
	@:constant var version: String;

	/** Gets the latest release. **/
	static inline function get_latest() return data.first().sure();

	/** Finds a release that matches the specified version `constraint`. **/
	public static inline function find(constraint: Constraint) return data.first(release -> constraint.matches(release.version));

	/** Gets the release corresponding to the specified `version`. **/
	public static inline function get(version: Version) return data.first(release -> release.version == version);

	/** Gets the asset corresponding to the specified `platform`. **/
	public inline function getAsset(platform: Platform) return assets.first(asset -> asset.platform == platform);
}

/** Represents an asset of a GitHub release. **/
@:jsonParse(json -> new setup_hashlink.Release.ReleaseAsset(json))
class ReleaseAsset implements Model {

	/** The target file. **/
	@:constant var file: String;

	/** The target platform. **/
	@:constant var platform: Platform;
}
