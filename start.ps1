#!/usr/bin/env pwsh
using module ./src/Release.psm1
using module ./src/Setup.psm1

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true

$release = [Release]::Find($Env:SETUP_HASHLINK_VERSION)
if (-not $release) { throw "No release matching the version constraint." }

$optionalTasks = $Env:SETUP_HASHLINK_OPTIONAL_TASKS -eq "true"
$path = [Setup]::new($release).Install($optionalTasks)

$installed = $optionalTasks ? "installed with optional tasks" : "installed"
"HashLink VM $($release.Version) successfully $installed in ""$path""."
