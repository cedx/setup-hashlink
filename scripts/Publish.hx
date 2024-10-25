//! --class-path src --library tink_core
import hashlink.Platform;

/** Publishes the package. **/
function main() {
	Sys.command("lix Dist");
	for (action in ["tag", "push origin"]) Sys.command('git $action v${Platform.packageVersion}');
}
