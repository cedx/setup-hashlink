import process from "node:process";
import semver from "semver";
import resources from "./resources.js";

/**
 * Represents a GitHub release.
 */
export class Release {

	/**
	 * The base URL of the releases.
	 * @type {URL}
	 */
	static #baseUrl = new URL("https://github.com/HaxeFoundation/hashlink/");

	/**
	 * The list of all releases.
	 * @type {Release[]}
	 */
	static #data = resources.map(item => new Release(item));

	/**
	 * The associated assets.
	 * @type {ReleaseAsset[]}
	 */
	assets;

	/**
	 * The version number.
	 * @type {string}
	 */
	version;

	/**
	 * Creates a new release.
	 * @param {ReleaseOptions} [options] An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		this.assets = options.assets ?? [];
		this.version = options.version ?? "0.0.0";
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
		const [major, minor, patch] = this.version.split(".");
		return Number.parseInt(patch) > 0 ? `${major}.${minor}.${patch}` : `${major}.${minor}`;
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
	 * @returns {Release|null} The release corresponding to the specified version constraint.
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
	 * @param {import("./platform.js").Platform} platform The target platform.
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
 * @property {import("./platform.js").Platform} platform The target platform.
 */

/**
 * Defines the options of a {@link Release} instance.
 * @typedef {object} ReleaseOptions
 * @property {ReleaseAsset[]} [assets] The associated assets.
 * @property {string} [version] The version number.
 */
