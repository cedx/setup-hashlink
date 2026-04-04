"Performing the static analysis of source code..."
Import-Module PSScriptAnalyzer
$PSScriptRoot, "src", "test" | Invoke-ScriptAnalyzer -Recurse
Test-ModuleManifest SetupHashLink.psd1 | Out-Null
