using namespace System.Diagnostics.CodeAnalysis
using module ../SetupHashLink.psd1

[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "existingRelease")]
$existingRelease = New-HashLinkRelease "1.16.0" @(
	New-HashLinkReleaseAsset Linux "hashlink-1.16.0.zip"
	New-HashLinkReleaseAsset MacOS "hashlink-1.16.0.zip"
	New-HashLinkReleaseAsset Windows "hashlink-1.16.0.zip"
)

[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "latestRelease")]
$latestRelease = Get-HashLinkRelease "Latest"

[SuppressMessage("PSUseDeclaredVarsMoreThanAssignments", "nonExistingRelease")]
$nonExistingRelease = New-HashLinkRelease "666.6.6"
