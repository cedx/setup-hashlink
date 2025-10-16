"Installing the dependencies..."
$modules = Import-PowerShellDataFile Modules.psd1
foreach ($module in $modules.Keys) {
	if (-not (Get-InstalledPSResource $module)) { Install-PSResource $module }
}
