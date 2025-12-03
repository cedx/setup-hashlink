@{
	DefaultCommandPrefix = "HashLink"
	ModuleVersion = "8.0.0"
	PowerShellVersion = "7.4"
	RootModule = "bin/Belin.SetupHashLink.dll"

	Author = "Cédric Belin <cedx@outlook.com>"
	CompanyName = "Cedric-Belin.fr"
	Copyright = "© Cédric Belin"
	Description = "Set up your GitHub Actions workflow with a specific version of the HashLink VM."
	GUID = "6bb1e481-9f7c-4dd0-922c-fdf44f2c0e78"

	AliasesToExport = @()
	FunctionsToExport = @()
	VariablesToExport = @()

	CmdletsToExport = @(
		"Find-Release"
		"Get-Release"
		"Install-Release"
		"New-Release"
		"New-ReleaseAsset"
		"Test-Release"
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
