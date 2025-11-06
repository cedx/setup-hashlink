#!/usr/bin/env pwsh
using module ./src/Release.psm1
using module ./src/Setup.psm1

$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true
Set-StrictMode -Version Latest
if (-not (Test-Path Env:SETUP_HASHLINK_VERSION)) { $Env:SETUP_HASHLINK_VERSION = "latest" }

$release = [Release]::Find($Env:SETUP_HASHLINK_VERSION)
if (-not $release) { throw "No release matching the version constraint." }

$path = [Setup]::new($release).Install()
"HashLink $($release.Version) successfully installed in ""$path""."
