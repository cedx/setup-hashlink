using namespace System.Diagnostics.CodeAnalysis
using module ../src/Platform.psm1
using module ../src/Release.psm1
using module ../src/Setup.psm1

<#
.SYNOPSIS
	Tests the features of the `Setup` module.
#>
Describe "Setup" {
	BeforeAll {
		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$latestRelease = [Release]::Latest()

		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$platform = Get-Platform

		if (-not (Test-Path Env:GITHUB_ENV)) { $Env:GITHUB_ENV = Join-Path var GitHub-Env.txt }
		if (-not (Test-Path Env:GITHUB_PATH)) { $Env:GITHUB_PATH = Join-Path var GitHub-Path.txt }
	}

	Context "Download" {
		It "should properly download and extract the HashLink VM" {
			$setup = [Setup] $latestRelease
			$isSource = $setup.Release.IsSource()
			$path = $setup.Download()

			$executable = "hl$($isSource ? ".vcxproj" : ($platform -eq [Platform]::Windows ? ".exe" : [string]::Empty))"
			Join-Path $path $executable | Should -Exist

			$dynamicLibrary = "libhl$($isSource ? ".vcxproj" : ($platform -eq [Platform]::MacOS ? ".dylib" : ($platform -eq [Platform]::Linux ? ".so" : ".dll")))"
			Join-Path $path $dynamicLibrary | Should -Exist
		}
	}

	Context "Install" {
		It "should add the HashLink VM binaries to the PATH environment variable" {
			$setup = [Setup] $latestRelease
			$path = $setup.Install()

			$Env:PATH | Should -BeLikeExactly "*$path*"
			if (($platform -eq [Platform]::Linux) -and ($setup.Release.IsSource())) {
				$Env:LD_LIBRARY_PATH | Should -BeLikeExactly "*/usr/local/bin*"
			}
		}
	}
}
