namespace Belin.SetupHashLink.Cmdlets;

/// <summary>
/// Creates a new release asset.
/// </summary>
[Cmdlet(VerbsCommon.New, "ReleaseAsset")]
[OutputType(typeof(Release.Asset))]
public class NewReleaseAssetCommand: Cmdlet {

	/// <summary>
	/// The target file.
	/// </summary>
	[Parameter(Mandatory = true, Position = 1)]
	public required string File { get; set; }

	/// <summary>
	/// The target platform.
	/// </summary>
	[Parameter(Mandatory = true, Position = 0)]
	public required Platform Platform { get; set; }

	/// <summary>
	/// Performs execution of this command.
	/// </summary>
	protected override void ProcessRecord() => WriteObject(new Release.Asset(Platform, File));
}
