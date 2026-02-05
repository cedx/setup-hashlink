"Updating the version number in the sources..."
$version = Import-PowerShellDataFile SetupHashLink.psd1 | Select-Object -ExpandProperty ModuleVersion
Get-ChildItem -Filter *.csproj -Recurse | ForEach-Object {
	(Get-Content $_) -replace "<Version>\d+(\.\d+){2}</Version>", "<Version>$version</Version>" | Set-Content $_
}
