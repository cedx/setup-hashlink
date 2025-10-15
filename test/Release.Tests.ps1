using namespace System.Diagnostics.CodeAnalysis
using module ../src/Platform.psm1
using module ../src/Release.psm1

<#
.SYNOPSIS
	Tests the features of the `Release` class.
#>
Describe "Release" {
	BeforeAll {
		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$existingRelease = [Release]::new("1.15.0", @(
			[ReleaseAsset]::new([Platform]::Linux, "hashlink-1.15.0.zip")
			[ReleaseAsset]::new([Platform]::MacOS, "hashlink-1.15.0.zip")
			[ReleaseAsset]::new([Platform]::Windows, "hashlink-1.15.0.zip")
		))

		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$latestRelease = [Release]::Latest()

		[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "")]
		$nonExistingRelease = [Release] "666.6.6"
	}

	Describe "Exists()" {
		It "should return `$true if the release exists" { $existingRelease.Exists() | Should -BeTrue }
		It "should return `$false if the release does not exist" { $nonExistingRelease.Exists() | Should -BeFalse }
	}

	Describe "GetAsset()" {
		It "should return `$null if no asset matches the platform" {
			$nonExistingRelease.GetAsset([Platform]::Windows) | Should -Be $null
		}

		It "should return the asset corresponding to the platform number if it exists" {
			$existingRelease.GetAsset([Platform]::Windows)?.File | Should -BeExactly "hashlink-1.15.0.zip"
		}
	}

	Describe "IsSource()" {
		It "should return `$true if the release is provided as source code" { $nonExistingRelease.IsSource() | Should -BeTrue }
		It "should return `$false if the release is provided as binary" { $existingRelease.IsSource() | Should -BeFalse }
	}

	Describe "Tag()" {
		It "should not include the patch component if it's zero" { $existingRelease.Tag() | Should -Be "1.15" }
		It "should include the patch component if it's greater than zero" { $nonExistingRelease.Tag() | Should -Be "666.6.6" }
	}

	Describe "Url()" {
		It "should point to a GitHub tag if the release is provided as source code" {
			$nonExistingRelease.Url() | Should -BeExactly "https://github.com/HaxeFoundation/hashlink/archive/refs/tags/666.6.6.zip"
		}

		It "should point to a GitHub release if the release is provided as binary" {
			$existingRelease.Url() | Should -BeExactly "https://github.com/HaxeFoundation/hashlink/releases/download/1.15/hashlink-1.15.0.zip"
		}
	}

	Describe "Find()" {
		It "should return `$null if no release matches the version constraint" {
			[Release]::Find("666.6.6") | Should -Be $null
		}

		It "should return the release corresponding to the version constraint if it exists" {
			[Release]::Find("latest") | Should -Be $latestRelease
			[Release]::Find("*") | Should -Be $latestRelease
			[Release]::Find("1") | Should -Be $latestRelease
			[Release]::Find("2") | Should -Be $null
			[Release]::Find(">1.15")?.Version | Should -Be $null
			[Release]::Find("=1.8.0")?.Version | Should -Be "1.8.0"
			[Release]::Find("<1.10")?.Version | Should -Be "1.9.0"
			[Release]::Find("<=1.10")?.Version | Should -Be "1.10.0"
		}

		It "should throw if the version constraint is invalid" {
			{ [Release]::Find("abc") } | Should -Throw
			{ [Release]::Find("?1.10") } | Should -Throw
		}
	}

	Describe "Get()" {
		It "should return `$null if no release matches to the version number" { [Release]::Get("666.6.6") | Should -Be $null }
		It "should return the release corresponding to the version number if it exists" { [Release]::Get("1.8.0")?.Version | Should -Be "1.8.0" }
	}

	Describe "Latest()" {
		It "should exist" { $latestRelease | Should -Not -Be $null }
	}
}
