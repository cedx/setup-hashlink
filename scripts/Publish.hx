//! --class-path src
import setup_hashlink.Version;

/** Runs the script. **/
function main() {
	Sys.command("lix Dist");
	for (action in ["tag", "push origin"]) Sys.command('git $action v${Version.packageVersion}');
}
