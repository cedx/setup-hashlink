"Running the test suite..."
pwsh -Command {
	$ci = $Env:CI -eq "true"
	Import-Module Pester
	Invoke-Pester test -CI:$ci
}
