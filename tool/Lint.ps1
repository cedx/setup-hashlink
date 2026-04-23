using module PSScriptAnalyzer

"Performing the static analysis of source code..."
$PSScriptRoot, "src", "test" | Invoke-ScriptAnalyzer -Recurse
Test-ModuleManifest SetupHashLink.psd1 | Out-Null
