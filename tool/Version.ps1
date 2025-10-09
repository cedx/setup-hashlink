Write-Output "Updating the version number in the sources..."
$version = (Get-Content "package.json" | ConvertFrom-Json).version
(Get-Content "ReadMe.md") -replace "action\/v\d+(\.\d+){2}", "action/v$version" | Out-File "ReadMe.md"
