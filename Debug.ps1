#!/usr/bin/env pwsh
$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true
Set-StrictMode -Version Latest

Import-Module "$PSScriptRoot/SetupHashLink.psd1"
# Insert the command to be debugged here.
