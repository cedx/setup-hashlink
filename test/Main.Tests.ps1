using namespace System.Diagnostics.CodeAnalysis

<#
.SYNOPSIS
	Tests the features of the `Main` module.
#>
Describe "Main" {
	BeforeAll {
		Import-Module ./SetupHashLink.psd1

		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$existingRelease = New-HashLinkRelease "1.15.0" @(
			New-HashLinkReleaseAsset Linux "hashlink-1.15.0.zip"
			New-HashLinkReleaseAsset MacOS "hashlink-1.15.0.zip"
			New-HashLinkReleaseAsset Windows "hashlink-1.15.0.zip"
		)

		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$latestRelease = Get-HashLinkRelease "Latest"

		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$nonExistingRelease = New-HashLinkRelease "666.6.6"
	}

	Context "Find-Release" {
		It "should return `$null if no release matches the version constraint" {
			Find-HashLinkRelease $nonExistingRelease.Version | Should -Be $null
		}

		It "should return the release corresponding to the version constraint if it exists" {
			Find-HashLinkRelease "latest" | Should -Be $latestRelease
			Find-HashLinkRelease "*" | Should -Be $latestRelease
			Find-HashLinkRelease "1" | Should -Be $latestRelease
			Find-HashLinkRelease "2" | Should -Be $null
			(Find-HashLinkRelease ">1.15")?.Version | Should -Be $null
			(Find-HashLinkRelease "=1.8.0")?.Version | Should -Be "1.8.0"
			(Find-HashLinkRelease "<1.10")?.Version | Should -Be "1.9.0"
			(Find-HashLinkRelease "<=1.10")?.Version | Should -Be "1.10.0"
		}

		It "should throw if the version constraint is invalid" -TestCases @{ Version = "abc" }, @{ Version = "?1.10" } {
			{ Find-HashLinkRelease $version } | Should -Throw
		}
	}

	Context "Get-Release" {
		It "should return `$null if no release matches to the version number" {
			Get-HashLinkRelease $nonExistingRelease.Version | Should -Be $null
		}

		It "should return the release corresponding to the version number if it exists" {
			(Get-HashLinkRelease "1.8.0")?.Version | Should -Be "1.8.0"
		}
	}

	Context "Test-Release" {
		It "should return `$true for the latest release" {
			Test-HashLinkRelease $latestRelease.Version | Should -BeTrue
			$latestRelease | Test-HashLinkRelease | Should -BeTrue
		}

		It "should return `$true if the release exists" {
			Test-HashLinkRelease $existingRelease.Version | Should -BeTrue
			$existingRelease | Test-HashLinkRelease | Should -BeTrue
		}

		It "should return `$false if the release does not exist" {
			Test-HashLinkRelease $nonExistingRelease.Version | Should -BeFalse
			$nonExistingRelease | Test-HashLinkRelease | Should -BeFalse
		}
	}
}
