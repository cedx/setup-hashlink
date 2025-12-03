namespace Belin.SetupHashLink.Cmdlets;

/// <summary>
/// Installs Apache Ant, after downloading it.
/// </summary>
[Cmdlet(VerbsLifecycle.Install, "Release", DefaultParameterSetName = "Constraint")]
[OutputType(typeof(string))]
public class InstallReleaseCommand: PSCmdlet {

	/// <summary>
	/// The version constraint of the release to be installed.
	/// </summary>
	[Parameter(Mandatory = true, ParameterSetName = "Constraint", Position = 0, ValueFromPipeline = true)]
	public required string Constraint { get; set; }

	/// <summary>
	/// The release to be installed.
	/// </summary>
	[Parameter(Mandatory = true, ParameterSetName = "InputObject", ValueFromPipeline = true)]
	public required Release InputObject { get; set; }

	/// <summary>
	/// Value indicating whether to fetch the Ant optional tasks.
	/// </summary>
	[Parameter]
	public SwitchParameter OptionalTasks { get; set; }

	/// <summary>
	/// Performs execution of this command.
	/// </summary>
	protected override void ProcessRecord() {
		var release = ParameterSetName == "InputObject" ? InputObject : Release.Find(Constraint);
		if (release?.Exists ?? false) WriteObject(new Setup(release).Install().GetAwaiter().GetResult());
		else {
			var exception = new InvalidOperationException("No release matches the specified version constraint.");
			WriteError(new ErrorRecord(exception, "ReleaseNotFound", ErrorCategory.ObjectNotFound, null));
		}
	}
}
