"Watching for file changes..."
$configuration = $Release ? "Release" : "Debug"
Start-Process dotnet "watch build --configuration $configuration" -NoNewWindow -Wait -WorkingDirectory src
