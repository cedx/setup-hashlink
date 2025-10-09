. $PSScriptRoot/Default.ps1

Write-Output "Publishing the package..."
$version = (Get-Content "package.json" | ConvertFrom-Json).version
git tag "v$version"
git push origin "v$version"
