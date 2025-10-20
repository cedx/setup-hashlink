"Updating the version number in the sources..."
$version = (Import-PowerShellDataFile "SetupHashLink.psd1").ModuleVersion
(Get-Content "ReadMe.md") -replace "module/v\d+(\.\d+){2}", "module/v$version" | Out-File "ReadMe.md"
