package setup_hashlink;

import js.actions.Core;
import tink.semver.Version;

/** Application entry point. **/
function main() {
	final version = Core.getInput("version");
	switch Version.parse(version.length == 0 || version == "latest" ? Release.latest.version : version) {
		case Failure(_): Core.setFailed('Invalid version constraint: $version');
		case Success(semver): switch Release.get(semver) {
			case None: Core.setFailed('No release corresponding to version $version.');
			case Some(release): new Setup(release).install().handle(outcome -> switch outcome {
				case Failure(error): Core.setFailed(error.message);
				case Success(_): Core.info('HashLink ${release.version} successfully installed.');
			});
		}
	}
}
