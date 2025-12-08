namespace Belin.SetupHashLink.Cmdlets;

/// <summary>
/// Gets the current platform.
/// </summary>
[Cmdlet(VerbsCommon.Get, "Platform"), OutputType(typeof(Platform))]
public class GetPlatformCommand: Cmdlet {

	/// <summary>
	/// Performs execution of this command.
	/// </summary>
	protected override void ProcessRecord() => WriteObject(PlatformExtensions.Current);
}
