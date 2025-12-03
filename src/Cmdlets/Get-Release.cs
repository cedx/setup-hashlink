namespace Belin.SetupHashLink.Cmdlets;

/// <summary>
/// Gets the release corresponding to the specified version.
/// </summary>
[Cmdlet(VerbsCommon.Get, "Release")]
[OutputType(typeof(Release))]
public class GetReleaseCommand: Cmdlet {

	/// <summary>
	/// The version number. Use `*` or `Latest` to get the latest release.
	/// </summary>
	[Parameter(Mandatory = true, Position = 0, ValueFromPipeline = true)]
	public required string Version { get; set; }

	/// <summary>
	/// Performs execution of this command.
	/// </summary>
	protected override void ProcessRecord() =>
		WriteObject(Release.LatestReleasePattern().IsMatch(Version) ? Release.Latest : Release.Get(Version));
}
