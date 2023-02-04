//! --class-path src
import setup_hashlink.Version;

/** Runs the script. **/
function main()
	Tools.replaceInFile("package.json", ~/"version": "\d+(\.\d+){2}"/, '"version": "${Version.packageVersion}"');
