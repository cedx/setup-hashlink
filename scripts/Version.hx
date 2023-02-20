//! --class-path src --library tink_core
import setup_hashlink.Version;

/** Updates the version number in the sources. **/
function main() {
	Tools.replaceInFile("package.json", ~/"version": "\d+(\.\d+){2}"/, '"version": "${Version.packageVersion}"');
	Tools.replaceInFile("README.md", ~/action\/v\d+(\.\d+){2}/, 'action/v${Version.packageVersion}');
}
