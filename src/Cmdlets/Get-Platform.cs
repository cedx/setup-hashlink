namespace Belin.SetupHashLink.Cmdlets;

using PSPlatform = System.Management.Automation.Platform;

/// <summary>
/// Gets the current platform.
/// </summary>
[Cmdlet(VerbsCommon.Get, "Platform")]
[OutputType(typeof(Platform))]
public class GetPlatformCommand: Cmdlet {

	/// <summary>
	/// Performs execution of this command.
	/// </summary>
	protected override void ProcessRecord() => WriteObject(true switch {
		true when PSPlatform.IsLinux => Platform.Linux,
		true when PSPlatform.IsMacOS => Platform.MacOS,
		_ => Platform.Windows
	});
}
