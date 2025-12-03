if ($Release) { & "$PSScriptRoot/Default.ps1" }
else {
	"The ""-Release"" switch must be set!"
	exit 1
}


"Publishing the package..."
$version = (Import-PowerShellDataFile "SetupHashLink.psd1").ModuleVersion
git tag "v$version"
git push origin "v$version"
