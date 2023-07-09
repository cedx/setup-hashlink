//! --class-path src --library tink_core
import setup_hashlink.Platform;

/** Updates the version number in the sources. **/
function main() {
	Tools.replaceInFile("package.json", ~/"version": "\d+(\.\d+){2}"/, '"version": "${Platform.packageVersion}"');
	Tools.replaceInFile("README.md", ~/action\/v\d+(\.\d+){2}/, 'action/v${Platform.packageVersion}');
}
