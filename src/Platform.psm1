using namespace System.Diagnostics.CodeAnalysis

<#
.SYNOPSIS
	Identifies an operating system or platform.
#>
enum Platform {
	Linux
	MacOS
	Windows
}

<#
.SYNOPSIS
	Gets the current platform.
.OUTPUTS
	The current platform.
#>
function Get-Platform {
	[OutputType([Platform])]
	[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
	param ()

	return $discard = switch ($true) {
		{ $IsLinux } { [Platform]::Linux }
		{ $IsMacOS } { [Platform]::MacOS }
		default { [Platform]::Windows }
	}
}
