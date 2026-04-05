using module ../Platform.psm1

<#
.SYNOPSIS
	Gets the current platform.
.OUTPUTS
	The current platform.
#>
function Get-Platform {
	[CmdletBinding()]
	[OutputType([Platform])]
	param ()

	switch ($true) {
		{ $IsLinux } { return [Platform]::Linux }
		{ $IsMacOS } { return [Platform]::MacOS }
		default { return [Platform]::Windows }
	}
}
