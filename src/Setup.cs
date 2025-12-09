namespace Belin.SetupHashLink;

using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Threading;

/// <summary>
/// Manages the download and installation of the HashLink VM.
/// </summary>
/// <param name="release">The release to download and install.</param>
public class Setup(Release release) {

	/// <summary>
	/// The release to download and install.
	/// </summary>
	public Release Release => release;

	/// <summary>
	/// Downloads and extracts the ZIP archive of the HashLink VM.
	/// </summary>
	/// <returns>The path to the extracted directory.</returns>
	public string Download() => DownloadAsync(CancellationToken.None).GetAwaiter().GetResult();

	/// <summary>
	/// Downloads and extracts the ZIP archive of the HashLink VM.
	/// </summary>
	/// <param name="cancellationToken">The token to cancel the operation.</param>
	/// <returns>The path to the extracted directory.</returns>
	public async Task<string> DownloadAsync(CancellationToken cancellationToken = default) {
		using var httpClient = new HttpClient();
		var version = GetType().Assembly.GetName().Version!;
		httpClient.DefaultRequestHeaders.Add("User-Agent", $".NET/{Environment.Version.ToString(3)} | Belin.SetupHashLink/{version.ToString(3)}");

		var bytes = await httpClient.GetByteArrayAsync(Release.Url, cancellationToken);
		var file = Path.GetTempFileName();
		await File.WriteAllBytesAsync(file, bytes, cancellationToken);

		var directory = Path.Join(Path.GetTempPath(), Guid.NewGuid().ToString());
		// TODO (.NET 10) await ZipFile.ExtractToDirectoryAsync(file, directory, cancellationToken);
		ZipFile.ExtractToDirectory(file, directory);
		return Path.Join(directory, Path.GetFileName(Directory.EnumerateDirectories(directory).Single()));
	}

	/// <summary>
	/// Installs the HashLink VM, after downloading it.
	/// </summary>
	/// <returns>The path to the installation directory.</returns>
	public string Install() => InstallAsync(CancellationToken.None).GetAwaiter().GetResult();

	/// <summary>
	/// Installs the HashLink VM, after downloading it.
	/// </summary>
	/// <param name="cancellationToken">The token to cancel the operation.</param>
	/// <returns>The path to the installation directory.</returns>
	public async Task<string> InstallAsync(CancellationToken cancellationToken = default) {
		var directory = await DownloadAsync(cancellationToken);
		if (Release.IsSource && Environment.GetEnvironmentVariable("CI") is not null) await Compile(directory, cancellationToken);

		var binFolder = Release.IsSource ? Path.Join(directory, "bin") : directory;
		Environment.SetEnvironmentVariable("PATH", $"{Environment.GetEnvironmentVariable("PATH")}{Path.PathSeparator}{binFolder}");
		await File.AppendAllTextAsync(Environment.GetEnvironmentVariable("GITHUB_PATH")!, binFolder, cancellationToken);
		return directory;
	}

	/// <summary>
	/// Compiles the sources of the HashLink VM located in the specified directory.
	/// </summary>
	/// <param name="directory">The path to the directory containing the HashLink sources.</param>
	/// <param name="cancellationToken">The token to cancel the operation.</param>
	/// <returns>The path to the output directory.</returns>
	/// <exception cref="PlatformNotSupportedException">The compilation is not supported on Windows platform.</exception>
	private static async Task<string> Compile(string directory, CancellationToken cancellationToken) {
		var platform = PlatformExtensions.Current;
		if (platform == Platform.Windows) throw new PlatformNotSupportedException("Compilation is not supported on Windows platform.");

		var workingDirectory = Environment.CurrentDirectory;
		Environment.CurrentDirectory = directory;
		var path = platform == Platform.MacOS ? await CompileMacOS(cancellationToken) : await CompileLinux(cancellationToken);
		Environment.CurrentDirectory = workingDirectory;
		return path;
	}

	/// <summary>
	/// Compiles the HashLink sources on the Linux platform.
	/// </summary>
	/// <returns>The path to the output directory.</returns>
	/// <exception cref="ApplicationFailedException">An error occurred while executing a native command.</exception>
	private static async Task<string> CompileLinux(CancellationToken cancellationToken) {
		var dependencies = new[] {
			"libglu1-mesa-dev",
			"libmbedtls-dev",
			"libopenal-dev",
			"libpng-dev",
			"libsdl2-dev",
			"libsqlite3-dev",
			"libturbojpeg-dev",
			"libuv1-dev",
			"libvorbis-dev"
		};

		var commands = new[] {
			("sudo", "apt-get update"),
			("sudo", $"apt-get install --assume-yes --no-install-recommends {string.Join(" ", dependencies)}"),
			("make", ""),
			("sudo", "make install"),
			("sudo", "ldconfig")
		};

		foreach (var (fileName, arguments) in commands) {
			using var process = Process.Start(fileName, arguments) ?? throw new ApplicationFailedException(fileName);
			await process.WaitForExitAsync(cancellationToken);
			if (process.ExitCode != 0) throw new ApplicationFailedException(fileName);
		}

		var prefix = "/usr/local";
		var ldLibraryPath = $"{Environment.GetEnvironmentVariable("LD_LIBRARY_PATH")}{Path.PathSeparator}{prefix}/bin";
		Environment.SetEnvironmentVariable("LD_LIBRARY_PATH", ldLibraryPath);
		await File.AppendAllTextAsync(Environment.GetEnvironmentVariable("GITHUB_ENV")!, $"LD_LIBRARY_PATH={ldLibraryPath}", cancellationToken);
		return prefix;
	}

	/// <summary>
	/// Compiles the HashLink sources on the macOS platform.
	/// </summary>
	/// <param name="cancellationToken">The token to cancel the operation.</param>
	/// <returns>The path to the output directory.</returns>
	/// <exception cref="ApplicationFailedException">An error occurred while executing a native command.</exception>
	private static async Task<string> CompileMacOS(CancellationToken cancellationToken) {
		var prefix = "/usr/local";
		var commands = new[] {
			("brew", "bundle"),
			("make", ""),
			("sudo", "make codesign_osx"),
			("sudo", "make install"),
			("sudo", $"install_name_tool -change libhl.dylib {prefix}/lib/libhl.dylib {prefix}/bin/hl")
		};

		foreach (var (fileName, arguments) in commands) {
			using var process = Process.Start(fileName, arguments) ?? throw new ApplicationFailedException(fileName);
			await process.WaitForExitAsync(cancellationToken);
			if (process.ExitCode != 0) throw new ApplicationFailedException(fileName);
		}

		return prefix;
	}
}
