<#
.SYNOPSIS
	Represents a HashLink release.
#>
class Release {

	<#
	.SYNOPSIS
		The list of all releases.
	#>
	hidden static [Release[]] $Data

	<#
	.SYNOPSIS
		The associated assets.
	#>
	[ValidateNotNull()] [ReleaseAsset[]] $Assets = @()

	<#
	.SYNOPSIS
		The version number.
	#>
	[ValidateNotNull()] [semver] $Version

	<#
	.SYNOPSIS
		Creates a new release.
	.PARAMETER $version
		The version number.
	.PARAMETER $assets
		The associated assets.
	#>
	constructor(version: string, assets: IReleaseAsset[] = []) {
		this.assets = assets
		this.version = version
	}

	<#
	.SYNOPSIS
		Value indicating whether this release exists.
	#>
	get exists(): boolean {
		return Release.#data.some(release => release.version == this.version)
	}

	<#
	.SYNOPSIS
		Value indicating whether this release is provided as source code.
	#>
	get isSource(): boolean {
		return !this.getAsset(process.platform)
	}

	<#
	.SYNOPSIS
		The associated Git tag.
	#>
	get tag(): string {
		${major, minor, patch} = new SemVer(this.version)
		return patch -gt 0 ? `${major}.${minor}.${patch}` : `${major}.${minor}`
	}

	<#
	.SYNOPSIS
		The download URL.
	#>
	get url(): URL {
		$asset = this.getAsset(process.platform)
		$baseUrl = new URL("https://github.com/HaxeFoundation/hashlink/")
		return new URL(asset ? `releases/download/${this.tag}/${asset.file}` : `archive/refs/tags/${this.tag}.zip`, Release.#baseUrl)
	}

	<#
	.SYNOPSIS
		Finds a release that matches the specified version constraint.
	.PARAMETER $constraint
		The version constraint.
	.OUTPUTS
		The release corresponding to the specified constraint, or `$null` if not found.
	#>
	static find(constraint: string): Release|null {
		return this.#data.find(release => semver.satisfies(release.version, constraint)) ?? $null
	}

	<#
	.SYNOPSIS
		Gets the release corresponding to the specified version.
	.PARAMETER $version
		The version number of a release.
	.OUTPUTS
		The release corresponding to the specified version, or `$null` if not found.
	#>
	static get(version: string): Release|null {
		return this.#data.find(release => release.version == version) ?? $null
	}

	<#
	.SYNOPSIS
		Gets the asset corresponding to the specified platform.
	.PARAMETER $platform
		The target platform.
	.OUTPUTS
		The asset corresponding to the specified platform, or `$null` if not found.
	#>
	getAsset(platform: NodeJS.Platform): IReleaseAsset|null {
		return this.assets.find(asset => asset.platform == platform) ?? $null
	}

	<#
	.SYNOPSIS
		Gets the latest release.
	.OUTPUTS
		The latest release, or `$null` if not found.
	#>
	static [Release] Latest() {
		return [Release]::Data[0]
	}
}

<#
.SYNOPSIS
	Represents an asset of a HashLink release.
#>
class ReleaseAsset {

	<#
	.SYNOPSIS
		The target file.
	#>
	[ValidateNotNullOrEmpty()] [string] $File

	<#
	.SYNOPSIS
		The target platform.
	#>
	[ValidateNotNullOrEmpty()] [string] $Platform

	<#
	.SYNOPSIS
		Creates a new release asset.
	.PARAMETER $file
		The target file.
	.PARAMETER $platform
		The target platform.
	#>
	ReleaseAsset([string] $file, [string] $platform) {
		$this.File = $file
		$this.Platform = $platform
	}
}
