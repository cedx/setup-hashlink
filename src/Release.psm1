using namespace System.Diagnostics.CodeAnalysis

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
	[ValidateNotNull()] [ReleaseAsset[]] $Assets

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
	#>
	Release([string] $version) {
		$this.Assets = @()
		$this.Version = $version
	}

	<#
	.SYNOPSIS
		Creates a new release.
	.PARAMETER $version
		The version number.
	.PARAMETER $assets
		The associated assets.
	#>
	Release([string] $version, [ReleaseAsset[]] $assets) {
		$this.Assets = $assets
		$this.Version = $version
	}

	<#
	.SYNOPSIS
		Initializes the class.
	#>
	static Release() {
		[Release]::Data = (Import-PowerShellDataFile "$PSScriptRoot/Data.psd1").Releases.ForEach{
			[Release]::new($_.Version, $_.Assets.ForEach{ [ReleaseAsset]::new($_.File, $_.Platform) })
		}
	}

	<#
	.SYNOPSIS
		Gets a value indicating whether this release exists.
	.OUTPUTS
		`$true` if this release exists, otherwise `$false`.
	#>
	[bool] Exists() {
		return $null -ne [Release]::Get($this.Version)
	}

	<#
	.SYNOPSIS
		Gets the asset corresponding to the specified platform.
	.PARAMETER $platform
		The target platform.
	.OUTPUTS
		The asset corresponding to the specified platform, or `$null` if not found.
	#>
	[ReleaseAsset] GetAsset([string] $platform) {
		return $this.Assets.Where({ $_.Platform -eq $platform }, "First")[0]
	}

	<#
	.SYNOPSIS
		Gets a value indicating whether this release is provided as source code.
	.OUTPUTS
		`$true` if this release is provided as source code, otherwise `$false`.
	#>
	[bool] IsSource() {
		return $null -eq $this.GetAsset([Release]::Platform())
	}

	<#
	.SYNOPSIS
		Gets the associated Git tag.
	.OUTPUTS
		The associated Git tag.
	#>
	[string] Tag() {
		$major, $minor, $patch = $this.Version.Major, $this.Version.Minor, $this.Version.Patch
		return $patch -gt 0 ? "$major.$minor.$patch" : "$major.$minor"
	}

	<#
	.SYNOPSIS
		Gets the download URL.
	.OUTPUTS
		The download URL.
	#>
	[uri] Url() {
		$asset = $this.GetAsset([Release]::Platform())
		$baseUrl = [uri] "https://github.com/HaxeFoundation/hashlink/"
		return [uri]::new($baseUrl, $asset ? "releases/download/$($this.Tag())/$($asset.File)" : "archive/refs/tags/$($this.Tag()).zip")
	}

	<#
	.SYNOPSIS
		Finds a release that matches the specified version constraint.
	.PARAMETER $constraint
		The version constraint.
	.OUTPUTS
		The release corresponding to the specified constraint, or `$null` if not found.
	#>
	static [Release] Find([string] $constraint) {
		$operator, $semver = switch -Regex ($constraint) {
			"^(\*|latest)$" { "=", [Release]::Latest().Version }
			"^([^\d]+)\d" { $Matches[1], [semver] ($constraint -replace "^([^\d]+)", "") }
			"^\d" { ">=", [semver] $constraint }
			default { throw [FormatException] "The version constraint is invalid." }
		}

		$predicate = switch ($operator) {
			">=" {{ $_.Version -ge $semver }}
			">" {{ $_.Version -gt $semver }}
			"<=" {{ $_.Version -le $semver }}
			"<" {{ $_.Version -lt $semver }}
			"=" {{ $_.Version -eq $semver }}
			default { throw [FormatException] "The version constraint is invalid." }
		}

		return [Release]::Data.Where($predicate)[0]
	}

	<#
	.SYNOPSIS
		Gets the release corresponding to the specified version.
	.PARAMETER $version
		The version number of a release.
	.OUTPUTS
		The release corresponding to the specified version, or `$null` if not found.
	#>
	static [Release] Get([string] $version) {
		return [Release]::Data.Where({ $_.Version -eq $version }, "First")[0]
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

	<#
	.SYNOPSIS
		Gets the current platform.
	.OUTPUTS
		The current platform.
	#>
	[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
	hidden static [string] Platform() {
		return $discard = switch ($true) {
			{ $IsMacOS } { "MacOS" }
			{ $IsLinux } { "Linux" }
			default { "Windows" }
		}
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
