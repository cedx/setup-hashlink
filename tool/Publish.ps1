& "$PSScriptRoot/Default.ps1"

"Publishing the package..."
$version = (Import-PowerShellDataFile "SetupHashLink.psd1").ModuleVersion
git tag "v$version"
git push origin "v$version"
