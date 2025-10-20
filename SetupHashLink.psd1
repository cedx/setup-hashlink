@{
	ModuleVersion = "7.0.0"
	RootModule = "src/Main.psm1"

	Author = "Cédric Belin <cedx@outlook.com>"
	CompanyName = "Cedric-Belin.fr"
	Copyright = "© Cédric Belin"
	DefaultCommandPrefix = "HashLink"
	Description = "Set up your GitHub Actions workflow with a specific version of the HashLink VM."
	GUID = "6bb1e481-9f7c-4dd0-922c-fdf44f2c0e78"

	AliasesToExport = @()
	CmdletsToExport = @()
	VariablesToExport = @()

	FunctionsToExport = @(
		"Find-Release"
		"Get-Release"
		"New-Release"
		"New-ReleaseAsset"
		"Test-Release"
	)

	NestedModules = @(
		"src/Platform.psm1"
		"src/Release.psm1"
		"src/Setup.psm1"
	)

	PrivateData = @{
		PSData = @{
			LicenseUri = "https://raw.githubusercontent.com/cedx/setup-hashlink/main/License.md"
			ProjectUri = "https://github.com/cedx/setup-hashlink"
			ReleaseNotes = "https://github.com/cedx/setup-hashlink/releases"
			Tags = "actions", "ci", "hashlink", "haxe"
		}
	}
}
