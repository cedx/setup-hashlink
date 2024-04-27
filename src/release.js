import process from "node:process";
import semver, {SemVer} from "semver";
import releases from "../res/releases.json" with {type: "json"};

/**
 * Represents a GitHub release.
 */
export class Release {

	/**
	 * The base URL of the releases.
	 * @type {URL}
	 * @readonly
	 */
	static #baseUrl = new URL("https://github.com/HaxeFoundation/hashlink/");

	/**
	 * The list of all releases.
	 * @type {Release[]}
	 * @readonly
	 */
	static #data = releases.map(release => new this(release.version, release.assets));

	/**
	 * The associated assets.
	 * @type {ReleaseAsset[]}
	 * @readonly
	 */
	assets;

	/**
	 * The version number.
	 * @type {string}
	 * @readonly
	 */
	version;

	/**
	 * Creates a new release.
	 * @param {string} version The version number.
	 * @param {ReleaseAsset[]} assets The associated assets.
	 */
	constructor(version, assets = []) {
		this.assets = assets;
		this.version = version;
	}

	/**
	 * The latest release.
	 * @type {Release}
	 */
	static get latest() {
		return this.#data[0];
	}

	/**
	 * Value indicating whether this release exists.
	 * @type {boolean}
	 */
	get exists() {
		return Release.#data.some(release => release.version == this.version);
	}

	/**
	 * Value indicating whether this release is provided as source code.
	 * @type {boolean}
	 */
	get isSource() {
		return !this.getAsset(process.platform);
	}

	/**
	 * The associated Git tag.
	 * @type {string}
	 */
	get tag() {
		const {major, minor, patch} = new SemVer(this.version);
		return patch > 0 ? `${major}.${minor}.${patch}` : `${major}.${minor}`;
	}

	/**
	 * The download URL.
	 * @type {URL}
	 */
	get url() {
		const asset = this.getAsset(process.platform);
		return new URL(asset ? `releases/download/${this.tag}/${asset.file}` : `archive/refs/tags/${this.tag}.zip`, Release.#baseUrl);
	}

	/**
	 * Finds a release that matches the specified version constraint.
	 * @param {string} constraint The version constraint.
	 * @returns {Release|null} The release corresponding to the specified constraint.
	 */
	static find(constraint) {
		return this.#data.find(release => semver.satisfies(release.version, constraint)) ?? null;
	}

	/**
	 * Gets the release corresponding to the specified version.
	 * @param {string} version The version number of a release.
	 * @returns {Release|null} The release corresponding to the specified version.
	 */
	static get(version) {
		return this.#data.find(release => release.version == version) ?? null;
	}

	/**
	 * Gets the asset corresponding to the specified platform.
	 * @param {NodeJS.Platform} platform The target platform.
	 * @returns {ReleaseAsset|null} The asset corresponding to the specified platform.
	 */
	getAsset(platform) {
		return this.assets.find(asset => asset.platform == platform) ?? null;
	}
}

/**
 * Represents an asset of a GitHub release.
 * @typedef {object} ReleaseAsset
 * @property {string} file The target file.
 * @property {string} platform The target platform.
 */
