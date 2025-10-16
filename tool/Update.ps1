"Updating the dependencies..."
$modules = Import-PowerShellDataFile Modules.psd1
foreach ($module in $modules.Keys) {
	Update-PSResource $module -TrustRepository
}
