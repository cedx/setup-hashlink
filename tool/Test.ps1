Write-Output "Running the test suite..."
Import-Module Pester -Scope Local
Invoke-Pester test
