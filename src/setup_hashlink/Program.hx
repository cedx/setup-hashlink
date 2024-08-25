package setup_hashlink;

import js.actions.Core;
import tink.semver.Constraint;

/** Application entry point. **/
function main() {
	final version = Core.getInput("version");
	switch Constraint.parse(version.length == 0 || version == "latest" ? "*" : version) {
		case Failure(_): Core.setFailed("Invalid version constraint.");
		case Success(constraint): switch Release.find(constraint) {
			case None: Core.setFailed("No release matching the version constraint.");
			case Some(release): new Setup(release).install().handle(outcome -> switch outcome {
				case Failure(error): Core.setFailed(error.message);
				case Success(path): Core.info('HashLink ${release.version} successfully installed in "$path".');
			});
		}
	}
}
