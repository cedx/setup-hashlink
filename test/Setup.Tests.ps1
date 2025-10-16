using namespace System.Diagnostics.CodeAnalysis
using module ../src/Platform.psm1
using module ../src/Release.psm1
using module ../src/Setup.psm1

<#
.SYNOPSIS
	Tests the features of the `Setup` class.
#>
Describe "Setup" {
	BeforeAll {
		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$latestRelease = [Release]::Latest()

		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$platform = Get-Platform

		if ($Env:CI -ne "true") {
			$Env:GITHUB_ENV = "var/GitHub-Env.txt"
			$Env:GITHUB_PATH = "var/GitHub-Path.txt"
		}
	}

	Describe "Download" {
		It "should properly download and extract the HashLink VM" {
			$setup = [Setup]::new($latestRelease)
			$isSource = $setup.Release.IsSource()
			$path = $setup.Download()

			$executable = "hl$($isSource ? ".vcxproj" : $platform -eq [Platform]::Windows ? ".exe" : [string]::Empty)"
			Join-Path $path $executable | Should -Exist

			$dynamicLib = "libhl$($isSource ? ".vcxproj" : $platform -eq [Platform]::MacOS ? ".dylib" : $platform -eq [Platform]::Linux ? ".so" : ".dll")"
			Join-Path $path $dynamicLib | Should -Exist
		}
	}

	Describe "Install" {
		It "should add the HashLink VM binaries to the PATH environment variable" {
			$setup = [Setup]::new($latestRelease)
			$path = $setup.Install()

			$Env:PATH | Should -BeLikeExactly "*$path*"
			if (($platform -eq [Platform]::Linux) -and ($setup.Release.IsSource())) {
				$Env:LD_LIBRARY_PATH | Should -BeLikeExactly "*/usr/local/bin*"
			}
		}
	}
}
