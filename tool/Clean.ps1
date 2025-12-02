"Deleting all generated files..."
Remove-Item "bin" -ErrorAction Ignore -Force -Recurse
Remove-Item "*/obj" -Force -Recurse
Remove-Item "var/*" -Exclude ".gitkeep" -Force -Recurse
