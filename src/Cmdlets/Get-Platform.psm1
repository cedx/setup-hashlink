using namespace System.Diagnostics.CodeAnalysis
using module ../Platform.psm1

# /// <summary>
# /// Gets the current platform.
# /// </summary>
# [Cmdlet(VerbsCommon.Get, "Platform"), OutputType(typeof(Platform))]
# public class GetPlatformCommand: Cmdlet {

# 	/// <summary>
# 	/// Performs execution of this command.
# 	/// </summary>
# 	protected override void ProcessRecord() => WriteObject(Platform.Current);
# }

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
