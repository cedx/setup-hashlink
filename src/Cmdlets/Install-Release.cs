namespace Belin.SetupHashLink.Cmdlets;

/// <summary>
/// Installs the HashLink VM, after downloading it.
/// </summary>
[Cmdlet(VerbsLifecycle.Install, "Release", DefaultParameterSetName = nameof(Constraint)), OutputType(typeof(string))]
public class InstallReleaseCommand: PSCmdlet {

	/// <summary>
	/// The version constraint of the release to be installed.
	/// </summary>
	[Parameter(Mandatory = true, ParameterSetName = nameof(Constraint), Position = 0, ValueFromPipeline = true)]
	public required string Constraint { get; set; }

	/// <summary>
	/// The release to be installed.
	/// </summary>
	[Parameter(Mandatory = true, ParameterSetName = nameof(InputObject), ValueFromPipeline = true)]
	public required Release InputObject { get; set; }

	/// <summary>
	/// Performs execution of this command.
	/// </summary>
	protected override void ProcessRecord() {
		var release = ParameterSetName == nameof(InputObject) ? InputObject : Release.Find(Constraint);
		if (release?.Exists ?? false) WriteObject(new Setup(release).Install());
		else {
			var exception = new InvalidOperationException("No release matches the specified version constraint.");
			WriteError(new ErrorRecord(exception, "InstallRelease:InvalidOperation", ErrorCategory.ObjectNotFound, null));
		}
	}
}
