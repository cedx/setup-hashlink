#!/usr/bin/env pwsh
param (
	# The name of the task to be performed.
	[Parameter(Position = 0)]
	[ArgumentCompleter({
		param ($commandName, $parameterName, $wordToComplete)
		(Get-Item "$PSScriptRoot/tool/$wordToComplete*.ps1").BaseName
	})]
	[string] $Command = "Default",

	# Value indicating whether to enable the release configuration.
	[switch] $Release
)

$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true
Set-StrictMode -Version Latest
& "$PSScriptRoot/tool/$Command.ps1"
