#!/usr/bin/env pwsh
using namespace Belin.SetupHashLink
Add-Type -Path "$PSScriptRoot/bin/Belin.SetupHashLink.dll"

$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true
Set-StrictMode -Version Latest
if (-not (Test-Path Env:SETUP_HASHLINK_VERSION)) { $Env:SETUP_HASHLINK_VERSION = "Latest" }

$release = [Release]::Find($Env:SETUP_HASHLINK_VERSION)
if (-not $release) { throw "No release matches the specified version constraint." }

$path = [Setup]::new($release).Install().GetAwaiter().GetResult()
"HashLink $($release.Version) successfully installed in ""$path""."
