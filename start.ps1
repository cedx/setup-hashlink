#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true
Import-Module ./SetupHashLink.psd1

$release = Find-HashLinkRelease $Env:SETUP_HASHLINK_VERSION
if (-not $release) { throw "No release matching the version constraint." }

$path = Install-HashLinkRelease $release
"HashLink $($release.Version) successfully installed in ""$path""."
