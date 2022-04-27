import {readFileSync} from "node:fs";
import {Platform} from "./platform";

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
	static #data = JSON.parse(readFileSync(new URL("../res/releases.json", import.meta.url), "utf8")).map(item => new Release(item));

	/**
	 * The associated assets.
	 * @readonly
	 * @type {ReleaseAsset[]}
	 */
	assets = [];

	/**
	 * The version number.
	 * @readonly
	 * @type {string}
	 */
	version;

	/**
	 * Creates a new release.
	 * @param {ReleaseOptions} options An object providing values to initialize this instance.
	 */
	constructor({assets, version}) {
		this.assets = assets;
		this.version = version;
	}

	/**
	 * Gets the asset corresponding to the specified platform.
	 * @param {Platform} platform The target platform.
	 * @returns {ReleaseAsset|undefined} The asset corresponding to the specified platform.
	 */
	getAsset(platform) {
		return this.assets.find(asset => asset.platform == platform);
	}
}

/**
 * Represents an asset of a GitHub release.
 * @typedef {object} ReleaseAsset
 * @property {string} file The target file.
 * @property {Platform} platform The target platform.
 */

/**
 * Defines the options of a `Release` instance.
 * @typedef {object} ReleaseOptions
 * @property {ReleaseAsset[]} assets The associated assets.
 * @property {string} version The version number.
 */
