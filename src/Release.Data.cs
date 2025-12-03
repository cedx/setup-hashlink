namespace Belin.SetupHashLink;

/// <summary>
/// Represents a HashLink release.
/// </summary>
public partial class Release {

	/// <summary>
	/// The list of all releases.
	/// </summary>
	private static readonly Release[] data = [
		new Release("1.15.0", [new Asset(Platform.Windows, "hashlink-1.15.0-win.zip")]),
		new Release("1.14.0", [new Asset(Platform.Windows, "hashlink-1.14.0-win.zip")]),
		new Release("1.13.0", [new Asset(Platform.Windows, "hashlink-1.13.0-win.zip")]),
		new Release("1.12.0", [new Asset(Platform.Windows, "hl-1.12.0-win.zip")]),
		new Release("1.11.0", [new Asset(Platform.Windows, "hl-1.11.0-win.zip")]),
		new Release("1.10.0", [new Asset(Platform.Windows, "hl-1.10.0-win.zip")]),
		new Release("1.9.0", [new Asset(Platform.Windows, "hl-1.9.0-win.zip")]),
		new Release("1.8.0", [new Asset(Platform.Windows, "hl-1.8.0-win.zip")]),
		new Release("1.7.0", [new Asset(Platform.Windows, "hl-1.7.0-win.zip")]),
		new Release("1.6.0", [new Asset(Platform.Windows, "hl-1.6.0-win.zip"), new Asset(Platform.Linux, "hl-1.6.0-linux.tgz")]),
		new Release("1.5.0", [new Asset(Platform.Windows, "hl-1.5.0-win.zip"), new Asset(Platform.Linux, "hl-1.5.0-linux.tgz")]),
		new Release("1.4.0", [new Asset(Platform.Windows, "hl-1.4-win.zip")]),
		new Release("1.3.0", [new Asset(Platform.Windows, "hl-1.3-win32.zip"), new Asset(Platform.MacOS, "hl-1.3-osx32.zip")]),
		new Release("1.2.0", [new Asset(Platform.Windows, "hl-1.2-win32.zip"), new Asset(Platform.MacOS, "hl-1.2-osx.zip")]),
		new Release("1.1.0", [new Asset(Platform.Windows, "hl-1.1-win32.zip")]),
		new Release("1.0.0", [new Asset(Platform.Windows, "hl-1.0-win32.zip")])
	];
}
