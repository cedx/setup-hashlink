using namespace System.Diagnostics.CodeAnalysis
using module ./Platform.psm1
using module ./Release.psm1
using module ./Setup.psm1

<#
.SYNOPSIS
	Installs the HashLink VM, after downloading it.
.PARAMETER Version
	The version number of the release to be installed.
.PARAMETER InputObject
	The instance of the release to be installed.
.INPUTS
	[string] A string that contains a version number.
.INPUTS
	[Release] An instance of the `Release` class to be installed.
.OUTPUTS
	The path to the installation directory.
#>
function Install-Release {
	[CmdletBinding(DefaultParameterSetName = "Version")]
	[OutputType([string])]
	param (
		[Parameter(Mandatory, ParameterSetName = "Version", Position = 0, ValueFromPipeline)]
		[string] $Version,

		[Parameter(Mandatory, ParameterSetName = "InputObject", ValueFromPipeline)]
		[Release] $InputObject
	)

	process {
		$release = $PSCmdlet.ParameterSetName -eq "InputObject" ? $InputObject : [Release]::new($Version)
		[Setup]::new($release).Install()
	}
}
