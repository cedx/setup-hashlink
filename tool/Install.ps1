"Installing the dependencies..."
$modules = Import-PowerShellDataFile Modules.psd1
foreach ($module in $modules.Keys) {
	Install-PSResource $module -TrustRepository -WarningAction SilentlyContinue
}
