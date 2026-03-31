@{
	DefaultCommandPrefix = "HashLink"
	ModuleVersion = "8.1.0"
	PowerShellVersion = "7.4"

	Author = "Cédric Belin <cedx@outlook.com>"
	CompanyName = "Cedric-Belin.fr"
	Copyright = "© Cédric Belin"
	Description = "Set up your GitHub Actions workflow with a specific version of the HashLink VM."
	GUID = "6bb1e481-9f7c-4dd0-922c-fdf44f2c0e78"

	AliasesToExport = @()
	CmdletsToExport = @()
	VariablesToExport = @()

	FunctionsToExport = @(
		"Find-Release"
		"Get-Platform"
		"Get-Release"
		"Install-Release"
		"New-Release"
		"New-ReleaseAsset"
		"Test-Release"
	)

	NestedModules = @(
		"src/Cmdlets/Find-Release.psm1"
		"src/Cmdlets/Get-Platform.psm1"
		"src/Cmdlets/Get-Release.psm1"
		"src/Cmdlets/Install-Release.psm1"
		"src/Cmdlets/New-Release.psm1"
		"src/Cmdlets/New-ReleaseAsset.psm1"
		"src/Cmdlets/Test-Release.psm1"
	)

	PrivateData = @{
		PSData = @{
			LicenseUri = "https://github.com/cedx/setup-hashlink/blob/main/License.md"
			ProjectUri = "https://github.com/cedx/setup-hashlink"
			ReleaseNotes = "https://github.com/cedx/setup-hashlink/releases"
			Tags = "actions", "ci", "hashlink", "haxe"
		}
	}
}
