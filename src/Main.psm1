using module ./Platform.psm1
using module ./Release.psm1
using module ./Setup.psm1

<#
.SYNOPSIS
	Finds a release that matches the specified version constraint.
.PARAMETER Constraint
	The version constraint.
.INPUTS
	A string that contains a version constraint.
.OUTPUTS
	The release corresponding to the specified constraint, or `$null` if not found.
#>
function Find-Release {
	[OutputType([Release])]
	param (
		[Parameter(Mandatory, Position = 0, ValueFromPipeline)]
		[ValidateNotNullOrWhiteSpace()]
		[string] $Constraint
	)

	process {
		[Release]::Find($Constraint)
	}
}

<#
.SYNOPSIS
	Gets the release corresponding to the specified version.
.PARAMETER Version
	The version number. Use `*` or `Latest` to get the latest release.
.INPUTS
	A string that contains a version number.
.OUTPUTS
	The release corresponding to the specified version, or `$null` if not found.
#>
function Get-Release {
	[OutputType([Release])]
	param (
		[Parameter(Mandatory, Position = 0, ValueFromPipeline)]
		[ValidateNotNullOrWhiteSpace()]
		[string] $Version
	)

	process {
		$Version -in @("*", "Latest") ? [Release]::Latest() : [Release]::Get($Version)
	}
}

<#
.SYNOPSIS
	Creates a new release.
.PARAMETER Version
	The version number.
.PARAMETER Assets
	The associated assets.
.INPUTS
	A string that contains a version number.
.OUTPUTS
	The newly created release.
#>
function New-Release {
	[OutputType([Release])]
	param (
		[Parameter(Mandatory, Position = 0, ValueFromPipeline)]
		[ValidateNotNullOrWhiteSpace()]
		[string] $Version,

		[Parameter(Position = 1)]
		[ValidateNotNull()]
		[ReleaseAsset[]] $Assets = @()
	)

	process {
		[Release]::new($Version, $Assets)
	}
}

<#
.SYNOPSIS
	Creates a new release asset.
.PARAMETER Platform
	The target platform.
.PARAMETER File
	The target file.
.OUTPUTS
	The newly created release asset.
#>
function New-ReleaseAsset {
	[OutputType([ReleaseAsset])]
	param (
		[Parameter(Mandatory, Position = 0)]
		[ValidateNotNull()]
		[Platform] $Platform,

		[Parameter(Mandatory, Position = 1)]
		[ValidateNotNullOrWhiteSpace()]
		[string] $File
	)

	[ReleaseAsset]::new($Platform, $File)
}

<#
.SYNOPSIS
	Gets a value indicating whether a release with the specified version exists.
.PARAMETER Version
	The version number.
.PARAMETER InputObject
	The release instance.
.INPUTS
	[string] A string that contains a version number.
.INPUTS
	[Release] An instance of the `Release` class.
.OUTPUTS
	`$true` if a release with the specified version exists, otherwise `$false`.
#>
function Test-Release {
	[CmdletBinding(DefaultParameterSetName = "Version")]
	[OutputType([bool])]
	param (
		[Parameter(Mandatory, ParameterSetName = "Version", Position = 0, ValueFromPipeline)]
		[ValidateNotNullOrWhiteSpace()]
		[string] $Version,

		[Parameter(Mandatory, ParameterSetName = "InputObject", Position = 0, ValueFromPipeline)]
		[ValidateNotNull()]
		[Release] $InputObject
	)

	process {
		$release = $InputObject ? $InputObject : [Release]::new($Version)
		$release.Exists()
	}
}
