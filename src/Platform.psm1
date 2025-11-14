<#
.SYNOPSIS
	Identifies an operating system or platform.
#>
enum Platform {

	<#
	.SYNOPSIS
		Specifies a Linux platform.
	#>
	Linux

	<#
	.SYNOPSIS
		Specifies a macOS platform.
	#>
	MacOS

	<#
	.SYNOPSIS
		Specifies a Windows platform.
	#>
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
		($IsLinux) { [Platform]::Linux; break }
		($IsMacOS) { [Platform]::MacOS; break }
		default { [Platform]::Windows }
	}
}
