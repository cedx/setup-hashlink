import process from "node:process";
import semver, {SemVer} from "semver";
import data from "./data.json" with {type: "json"};

/**
 * Represents a GitHub release.
 */
export class Release {

	/**
	 * The latest release.
	 */
	static get latest(): Release|null {
		return this.#data.at(0) ?? null;
	}

	/**
	 * The base URL of the releases.
	 */
	static readonly #baseUrl: URL = new URL("https://github.com/HaxeFoundation/hashlink/");

	/**
	 * The list of all releases.
	 */
	static readonly #data: Release[] = data.map(release => new this(release.version, release.assets as ReleaseAsset[]));

	/**
	 * The associated assets.
	 */
	assets: ReleaseAsset[];

	/**
	 * The version number.
	 */
	version: string;

	/**
	 * Creates a new release.
	 * @param version The version number.
	 * @param assets The associated assets.
	 */
	constructor(version: string, assets: ReleaseAsset[] = []) {
		this.assets = assets;
		this.version = version;
	}

	/**
	 * Value indicating whether this release exists.
	 */
	get exists(): boolean {
		return Release.#data.some(release => release.version == this.version);
	}

	/**
	 * Value indicating whether this release is provided as source code.
	 */
	get isSource(): boolean {
		return !this.getAsset(process.platform);
	}

	/**
	 * The associated Git tag.
	 */
	get tag(): string {
		const {major, minor, patch} = new SemVer(this.version);
		return patch > 0 ? `${major}.${minor}.${patch}` : `${major}.${minor}`;
	}

	/**
	 * The download URL.
	 */
	get url(): URL {
		const asset = this.getAsset(process.platform);
		return new URL(asset ? `releases/download/${this.tag}/${asset.file}` : `archive/refs/tags/${this.tag}.zip`, Release.#baseUrl);
	}

	/**
	 * Finds a release that matches the specified version constraint.
	 * @param constraint The version constraint.
	 * @returns The release corresponding to the specified constraint, or `null` if not found.
	 */
	static find(constraint: string): Release|null {
		return this.#data.find(release => semver.satisfies(release.version, constraint)) ?? null;
	}

	/**
	 * Gets the release corresponding to the specified version.
	 * @param version The version number of a release.
	 * @returns The release corresponding to the specified version, or `null` if not found.
	 */
	static get(version: string): Release|null {
		return this.#data.find(release => release.version == version) ?? null;
	}

	/**
	 * Gets the asset corresponding to the specified platform.
	 * @param platform The target platform.
	 * @returns The asset corresponding to the specified platform, or `null` if not found.
	 */
	getAsset(platform: NodeJS.Platform): ReleaseAsset|null {
		return this.assets.find(asset => asset.platform == platform) ?? null;
	}
}

/**
 * Represents an asset of a GitHub release.
 */
export type ReleaseAsset = {

	/**
	 * The target file.
	 */
	file: string;

	/**
	 * The target platform.
	 */
	platform: NodeJS.Platform;
}
