using namespace System.Diagnostics.CodeAnalysis
using module ./Platform.psm1

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
	.PARAMETER Version
		The version number.
	#>
	Release([string] $Version) {
		$this.Assets = @()
		$this.Version = $Version
	}

	<#
	.SYNOPSIS
		Creates a new release.
	.PARAMETER Version
		The version number.
	.PARAMETER Assets
		The associated assets.
	#>
	Release([string] $Version, [ReleaseAsset[]] $Assets) {
		$this.Assets = $Assets
		$this.Version = $Version
	}

	<#
	.SYNOPSIS
		Initializes the class.
	#>
	static Release() {
		[Release]::Data = (Import-PowerShellDataFile "$PSScriptRoot/Data.psd1").Releases.ForEach{
			[Release]::new($_.Version, $_.Assets.ForEach{ [ReleaseAsset]::new($_.Platform, $_.File) })
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
	.PARAMETER Platform
		The target platform.
	.OUTPUTS
		The asset corresponding to the specified platform, or `$null` if not found.
	#>
	[ReleaseAsset] GetAsset([Platform] $Platform) {
		return $this.Assets.Where({ $_.Platform -eq $Platform }, "First")[0]
	}

	<#
	.SYNOPSIS
		Gets a value indicating whether this release is provided as source code.
	.OUTPUTS
		`$true` if this release is provided as source code, otherwise `$false`.
	#>
	[bool] IsSource() {
		return -not $this.GetAsset((Get-Platform))
	}

	<#
	.SYNOPSIS
		Gets the associated Git tag.
	.OUTPUTS
		The associated Git tag.
	#>
	[string] GetTag() {
		$major, $minor, $patch = $this.Version.Major, $this.Version.Minor, $this.Version.Patch
		return $patch -gt 0 ? "$major.$minor.$patch" : "$major.$minor"
	}

	<#
	.SYNOPSIS
		Gets the download URL.
	.OUTPUTS
		The download URL.
	#>
	[uri] GetUrl() {
		$asset = $this.GetAsset((Get-Platform))
		$baseUrl = [uri] "https://github.com/HaxeFoundation/hashlink/"
		return [uri]::new($baseUrl, $asset ? "releases/download/$($this.GetTag())/$($asset.File)" : "archive/refs/tags/$($this.GetTag()).zip")
	}

	<#
	.SYNOPSIS
		Finds a release that matches the specified version constraint.
	.PARAMETER Constraint
		The version constraint.
	.OUTPUTS
		The release corresponding to the specified constraint, or `$null` if not found.
	#>
	static [Release] Find([string] $Constraint) {
		$operator, $semver = switch -Regex ($Constraint) {
			"^(\*|latest)$" { "=", [Release]::Latest().Version; break }
			"^([^\d]+)\d" { $Matches[1], [semver] ($Constraint -replace "^[^\d]+", ""); break }
			"^\d" { ">=", [semver] $Constraint; break }
			default { throw [FormatException] "The version constraint is invalid." }
		}

		$predicate = switch ($operator) {
			">=" { { $_.Version -ge $semver }; break }
			">" { { $_.Version -gt $semver }; break }
			"<=" { { $_.Version -le $semver }; break }
			"<" { { $_.Version -lt $semver }; break }
			"=" { { $_.Version -eq $semver }; break }
			default { throw [FormatException] "The version constraint is invalid." }
		}

		return [Release]::Data.Where($predicate)[0]
	}

	<#
	.SYNOPSIS
		Gets the release corresponding to the specified version.
	.PARAMETER Version
		The version number of a release.
	.OUTPUTS
		The release corresponding to the specified version, or `$null` if not found.
	#>
	static [Release] Get([string] $Version) {
		return [Release]::Data.Where({ $_.Version -eq $Version }, "First")[0]
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
	[ValidateNotNullOrWhiteSpace()] [string] $File

	<#
	.SYNOPSIS
		The target platform.
	#>
	[ValidateNotNull()] [Platform] $Platform

	<#
	.SYNOPSIS
		Creates a new release asset.
	.PARAMETER Platform
		The target platform.
	.PARAMETER File
		The target file.
	#>
	ReleaseAsset([Platform] $Platform, [string] $File) {
		$this.File = $File
		$this.Platform = $Platform
	}
}
