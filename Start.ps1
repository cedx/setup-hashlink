#!/usr/bin/env pwsh
$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true

Import-Module "$PSScriptRoot/SetupHashLink.psd1"
if (-not (Test-Path Env:SETUP_HASHLINK_VERSION)) { $Env:SETUP_HASHLINK_VERSION = "Latest" }

$release = Find-HashLinkRelease $Env:SETUP_HASHLINK_VERSION
if (-not $release) { throw "No release matches the specified version constraint." }

$path = Install-HashLinkRelease -InputObject $release
"HashLink $($release.Version) successfully installed in ""$path""."
