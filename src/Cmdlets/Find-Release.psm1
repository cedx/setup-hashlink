namespace Belin.SetupHashLink.Cmdlets;

/// <summary>
/// Finds a release that matches the specified version constraint.
/// </summary>
[Cmdlet(VerbsCommon.Find, "Release"), OutputType(typeof(Release))]
public class FindReleaseCommand: Cmdlet {

	/// <summary>
	/// The version constraint.
	/// </summary>
	[Parameter(Mandatory = true, Position = 0, ValueFromPipeline = true)]
	public required string Constraint { get; set; }

	/// <summary>
	/// Performs execution of this command.
	/// </summary>
	protected override void ProcessRecord() => WriteObject(Release.Find(Constraint));
}
