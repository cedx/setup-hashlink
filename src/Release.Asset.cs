namespace Belin.SetupHashLink;

/// <summary>
/// Represents a HashLink release.
/// </summary>
public partial class Release {

	/// <summary>
	/// Represents an asset of a HashLink release.
	/// </summary>
	/// <param name="Platform">The target platform.</param>
	/// <param name="File">The target file.</param>
	public sealed record Asset(Platform Platform, string File);
}
