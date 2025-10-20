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
	param ()

	switch ($true) {
		{ $IsLinux } { [Platform]::Linux; break }
		{ $IsMacOS } { [Platform]::MacOS; break }
		default { [Platform]::Windows }
	}
}
