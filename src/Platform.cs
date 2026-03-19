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
	extension(Platform _) {

		/// <summary>
		/// The current platform.
		/// </summary>
		public static Platform Current => true switch {
			true when OperatingSystem.IsLinux() => Platform.Linux,
			true when OperatingSystem.IsMacOS() => Platform.MacOS,
			_ => Platform.Windows
		};
	}
}
