//! --class-path src
import setup_hashlink.Version;

/** Runs the script. **/
function main() {
	Tools.replaceInFile("package.json", ~/"version": "\d+(\.\d+){2}"/, '"version": "${Version.packageVersion}"');
	Tools.replaceInFile("README.md", ~/action\/v\d+(\.\d+){2}/, 'action/v${Version.packageVersion}');
}
