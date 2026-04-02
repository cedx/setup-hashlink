using namespace System.Diagnostics.CodeAnalysis
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
	[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
	param ()

	return $discard = switch ($true) {
		{ $IsLinux } { [Platform]::Linux; break }
		{ $IsMacOS } { [Platform]::MacOS; break }
		default { [Platform]::Windows }
	}
}
