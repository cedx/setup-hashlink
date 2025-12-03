namespace Belin.SetupHashLink.Cmdlets;

/// <summary>
/// Gets a value indicating whether a release with the specified version exists.
/// </summary>
[Cmdlet(VerbsDiagnostic.Test, "Release", DefaultParameterSetName = "Version")]
[OutputType(typeof(bool))]
public class TestReleaseCommand: PSCmdlet {

	/// <summary>
	/// The release to be tested.
	/// </summary>
	[Parameter(Mandatory = true, ParameterSetName = "InputObject", ValueFromPipeline = true)]
	public required Release InputObject { get; set; }

	/// <summary>
	/// The version number of the release to be tested.
	/// </summary>
	[Parameter(Mandatory = true, ParameterSetName = "Version", Position = 0, ValueFromPipeline = true)]
	public required Version Version { get; set; }

	/// <summary>
	/// Performs execution of this command.
	/// </summary>
	protected override void ProcessRecord() {
		var release = ParameterSetName == "InputObject" ? InputObject : new Release(Version);
		WriteObject(release.Exists);
	}
}
