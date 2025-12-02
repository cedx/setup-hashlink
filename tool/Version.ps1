"Updating the version number in the sources..."
$version = (Import-PowerShellDataFile "SetupHashLink.psd1").ModuleVersion
foreach ($item in Get-Item "*/*.csproj") {
	(Get-Content $item) -replace "<Version>\d+(\.\d+){2}</Version>", "<Version>$version</Version>" | Out-File $item
}
