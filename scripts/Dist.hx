/** Packages the project. **/
function main() {
	final file = "bin/setup_hashlink.js";
	for (script in ["Clean", "Build", "Version"]) Sys.command('lix $script');
	Sys.command('npx esbuild --allow-overwrite --bundle --legal-comments=none --log-level=warning --minify --outfile=$file --platform=node $file');
}
