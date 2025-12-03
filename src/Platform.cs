namespace Belin.SetupHashLink;

/// <summary>
/// Identifies an operating system or platform.
/// </summary>
public enum Platform {

	/// <summary>
	/// Specifies a Linux platform.
	/// </summary>
	Linux,

	/// <summary>
	/// Specifies a macOS platform.
	/// </summary>
	MacOS,

	/// <summary>
	/// Specifies a Windows platform.
	/// </summary>
	Windows
}

/// <summary>
/// Provides extension members for platforms.
/// </summary>
public static class PlatformExtensions {
	// TODO (.NET 10) extension(Platform)

	/// <summary>
	/// Gets the current platform.
	/// </summary>
	/// <returns>The current platform.</returns>
	public static Platform GetCurrent() => true switch {
		true when OperatingSystem.IsLinux() => Platform.Linux,
		true when OperatingSystem.IsMacOS() => Platform.MacOS,
		_ => Platform.Windows
	};
}
