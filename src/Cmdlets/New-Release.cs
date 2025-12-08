namespace Belin.SetupHashLink.Cmdlets;

/// <summary>
/// Creates a new release.
/// </summary>
[Cmdlet(VerbsCommon.New, "Release"), OutputType(typeof(Release))]
public class NewReleaseCommand: Cmdlet {

	/// <summary>
	/// The associated assets.
	/// </summary>
	[Parameter(Position = 1)]
	public Release.Asset[] Assets { get; set; } = [];

	/// <summary>
	/// The version number.
	/// </summary>
	[Parameter(Mandatory = true, Position = 0, ValueFromPipeline = true)]
	public required Version Version { get; set; }

	/// <summary>
	/// Performs execution of this command.
	/// </summary>
	protected override void ProcessRecord() => WriteObject(new Release(Version, Assets));
}
