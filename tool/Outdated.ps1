using module ./PSResource.psm1

"Checking for outdated dependencies..."
dotnet package list --outdated
Import-PowerShellDataFile PSModules.psd1 | Select-Object -ExpandProperty Keys | Get-InstalledPSResource | Test-PSResourceUpdate
