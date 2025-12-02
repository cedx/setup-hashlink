"Running the test suite..."
dotnet test --settings .runsettings
pwsh -Command {
	Import-Module Pester
	Invoke-Pester test
	exit $LASTEXITCODE
}
