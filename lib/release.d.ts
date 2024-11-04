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

/**
 * Represents a GitHub release.
 */
export class Release {

	/**
	 * The latest release.
	 */
	static readonly latest: Release|null;

	/**
	 * The associated assets.
	 */
	assets: Array<ReleaseAsset>;

	/**
	 * Value indicating whether this release exists.
	 */
	readonly exists: boolean;

	/**
	 * Value indicating whether this release is provided as source code.
	 */
	readonly isSource: boolean;

	/**
	 * The associated Git tag.
	 */
	readonly tag: string;

	/**
	 * The download URL.
	 */
	readonly url: URL;

	/**
	 * The version number.
	 */
	version: string;

	/**
	 * Creates a new release.
	 * @param version The version number.
	 */
	constructor(version: string);

	/**
	 * Finds a release that matches the specified version constraint.
	 * @param constraint The version constraint.
	 * @returns The release corresponding to the specified constraint, or `null` if not found.
	 */
	static find(constraint: string): Release|null;

	/**
	 * Gets the release corresponding to the specified version.
	 * @param version The version number of a release.
	 * @returns The release corresponding to the specified version, or `null` if not found.
	 */
	static get(version: string): Release|null;

	/**
	 * Gets the asset corresponding to the specified platform.
	 * @param platform The target platform.
	 * @returns The asset corresponding to the specified platform, or `null` if not found.
	 */
	getAsset(platform: NodeJS.Platform): ReleaseAsset|null;
}
