//! --class-path src --library tink_core
import setup_hashlink.Version;

/** Runs the script. **/
function main() {
	Sys.command("lix", ["Dist"]);
	for (action in [["tag"], ["push", "origin"]]) Sys.command("git", action.concat(['v${Version.packageVersion}']);
}
