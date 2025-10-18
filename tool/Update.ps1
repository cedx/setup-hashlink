"Updating the dependencies..."
$modules = Import-PowerShellDataFile PSModules.psd1
foreach ($module in $modules.Keys) {
	Update-PSResource $module -TrustRepository
}
