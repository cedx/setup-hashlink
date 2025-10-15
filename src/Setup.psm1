using namespace System.Diagnostics.CodeAnalysis
using namespace System.IO
using module ./Platform.psm1
using module ./Release.psm1

<#
.SYNOPSIS
	Manages the download and installation of the HashLink VM.
#>
class Setup {

	<#
	.SYNOPSIS
		The release to download and install.
	#>
	hidden [ValidateNotNull()] [Release] $Release

	<#
	.SYNOPSIS
		Creates a new setup.
	.PARAMETER $release
		The release to download and install.
	#>
	Setup([Release] $release) {
		$this.Release = $release
	}

	<#
	.SYNOPSIS
		Downloads and extracts the ZIP archive of the HashLink VM.
	.OUTPUTS
		The path to the extracted directory.
	#>
	[string] Download() {
		$file = New-TemporaryFile
		Invoke-WebRequest $this.Release.Url() -OutFile $file
		$directory = Join-Path ([Path]::GetTempPath()) (New-Guid)
		Expand-Archive $file $directory -Force
		return Join-Path $directory $this.FindSubfolder($directory)
	}

	<#
	.SYNOPSIS
		Installs the HashLink VM, after downloading it if required.
	.OUTPUTS
		The path to the installation directory.
	#>
	[string] Install() {
		$directory = $this.Download()
		$isSource = $this.Release.IsSource()
		if ($isSource -and ($Env:CI -eq "true")) { $this.Compile($directory) }

		$binFolder = $isSource ? (Join-Path $directory "bin") : $directory
		$Env:PATH += "$([Path]::PathSeparator)$binFolder"
		Add-Content $Env:GITHUB_PATH $binFolder
		return $directory
	}

	<#
	.SYNOPSIS
		Compiles the sources of the HashLink VM located in the specified directory.
	.PARAMETER $directory
		The path to the directory containing the HashLink sources.
	.OUTPUTS
		The path to the output directory.
	#>
	hidden [string] Compile([string] $directory) {
		$platform = Get-Platform
		if ($platform -eq [Platform]::Windows) { throw [NotSupportedException] "Compilation is not supported on Windows platform." }

		$workingDirectory = Get-Location
		Set-Location $directory
		$path = $platform -eq [Platform]::MacOS ? $this.CompileMacOS() : $this.CompileLinux()
		Set-Location $workingDirectory
		return $path
	}

	<#
	.SYNOPSIS
		Compiles the HashLink sources on the Linux platform.
	.OUTPUTS
		The path to the output directory.
	#>
	hidden [string] CompileLinux([string] $directory) {
		$dependencies = @(
			"libglu1-mesa-dev"
			"libmbedtls-dev"
			"libopenal-dev"
			"libpng-dev"
			"libsdl2-dev"
			"libsqlite3-dev"
			"libturbojpeg-dev"
			"libuv1-dev"
			"libvorbis-dev"
		)

		sudo apt-get update
		sudo apt-get install --assume-yes --no-install-recommends @dependencies
		make
		sudo make install
		sudo ldconfig

		$prefix = "/usr/local"
		$binFolder = Join-Path $prefix "bin"
		$Env:PATH += "$([Path]::PathSeparator)$binFolder"
		Add-Content $Env:GITHUB_PATH $binFolder

		$Env:LD_LIBRARY_PATH += "$([Path]::PathSeparator)$binFolder"
		Add-Content $Env:GITHUB_ENV "LD_LIBRARY_PATH=$Env:LD_LIBRARY_PATH"
		return $prefix
	}

	<#
	.SYNOPSIS
		Compiles the HashLink sources on the macOS platform.
	.OUTPUTS
		The path to the output directory.
	#>
	hidden [string] CompileMacOS([string] $directory) {
		$prefix = "/usr/local"

		brew bundle
		make
		sudo make codesign_osx
		sudo make install
		sudo install_name_tool -change libhl.dylib $prefix/lib/libhl.dylib $prefix/bin/hl

		return $prefix
	}

	<#
	.SYNOPSIS
		Determines the name of the single subfolder in the specified directory.
	.PARAMETER $directory
		The directory path.
	.OUTPUTS
		The name of the single subfolder in the specified directory.
	#>
	[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
	hidden [string] FindSubfolder([string] $directory) {
		$folders = Get-ChildItem $directory -Directory
		return $discard = switch ($folders.Length) {
			0 { throw "No subfolder found in: $directory." }
			1 { $folders[0].BaseName }
			default { throw "Multiple subfolders found in: $directory." }
		}
	}
}
