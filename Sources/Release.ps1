using namespace System.Diagnostics.CodeAnalysis
using module ./Platform.psm1
using module ./Release.psm1
using module ./Setup.psm1

<#
.SYNOPSIS
	Finds a release that matches the specified version constraint.
.INPUTS
	The version constraint.
.OUTPUTS
	The release corresponding to the specified constraint, or `$null` if not found.
#>
function Find-Release {
	[CmdletBinding()]
	[OutputType([Release])]
	param (
		# The version constraint.
		[Parameter(Mandatory, Position = 1, ValueFromPipeline)]
		[string] $Constraint
	)

	process {
		[Release]::Find($Constraint)
	}
}

<#
.SYNOPSIS
	Gets the release corresponding to the specified version.
.INPUTS
	A string that contains a version number.
.OUTPUTS
	The release corresponding to the specified version, or `$null` if not found.
#>
function Get-Release {
	[CmdletBinding()]
	[OutputType([Release])]
	param (
		# The version number. Use `*` or `Latest` to get the latest release.
		[Parameter(Mandatory, Position = 1, ValueFromPipeline)]
		[string] $Version
	)

	process {
		$Version -in "*", "Latest" ? [Release]::Latest() : [Release]::Get($Version)
	}
}

<#
.SYNOPSIS
	Installs the HashLink VM, after downloading it.
.INPUTS
	[string] The version constraint of the release to be installed.
.INPUTS
	[Release] The release to be installed.
.OUTPUTS
	The path to the installation directory.
#>
function Install-Release {
	[CmdletBinding(DefaultParameterSetName = "Constraint")]
	[OutputType([string])]
	param (
		# The version constraint of the release to be installed.
		[Parameter(Mandatory, ParameterSetName = "Constraint", Position = 1, ValueFromPipeline)]
		[string] $Constraint,

		# The instance of the release to be installed.
		[Parameter(Mandatory, ParameterSetName = "InputObject", ValueFromPipeline)]
		[Release] $InputObject
	)

	process {
		$release = $InputObject ? $InputObject : [Release]::Find($Constraint)
		if (${release}?.Exists()) { [Setup]::new($release).Install() }
		else { Write-Error "No release matches the specified version constraint." -Category ObjectNotFound }
	}
}

<#
.SYNOPSIS
	Creates a new release.
.INPUTS
	The version number.
.OUTPUTS
	The newly created release.
#>
function New-Release {
	[CmdletBinding()]
	[OutputType([Release])]
	[SuppressMessage("PSUseShouldProcessForStateChangingFunctions", "")]
	param (
		# The version number.
		[Parameter(Mandatory, Position = 1, ValueFromPipeline)]
		[semver] $Version,

		# The associated assets.
		[Parameter(Position = 2)]
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
.OUTPUTS
	The newly created release asset.
#>
function New-ReleaseAsset {
	[CmdletBinding()]
	[OutputType([ReleaseAsset])]
	[SuppressMessage("PSUseShouldProcessForStateChangingFunctions", "")]
	param (
		# The target platform.
		[Parameter(Mandatory, Position = 1)]
		[Platform] $Platform,

		# The target file.
		[Parameter(Mandatory, Position = 2)]
		[string] $File
	)

	[ReleaseAsset]::new($Platform, $File)
}

<#
.SYNOPSIS
	Gets a value indicating whether a release with the specified version exists.
.INPUTS
	[string] The version number of the release to be tested.
.INPUTS
	[Release] The release to be tested.
.OUTPUTS
	`$true` if a release with the specified version exists, otherwise `$false`.
#>
function Test-Release {
	[CmdletBinding(DefaultParameterSetName = "Version")]
	[OutputType([bool])]
	param (
		# The version number of the release to be tested.
		[Parameter(Mandatory, ParameterSetName = "Version", Position = 1, ValueFromPipeline)]
		[semver] $Version,

		# The release to be tested.
		[Parameter(Mandatory, ParameterSetName = "InputObject", ValueFromPipeline)]
		[Release] $InputObject
	)

	process {
		$release = $InputObject ? $InputObject : [Release]::new($Version)
		$release.Exists()
	}
}
