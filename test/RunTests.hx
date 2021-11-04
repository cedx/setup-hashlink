import instrument.coverage.Coverage;
import tink.testrunner.Runner;
import tink.unit.TestBatch;

/** Runs the test suite. **/
function main() {
	final tests = TestBatch.make([
		new setup_hashlink.ReleaseTest(),
		new setup_hashlink.SetupTest()
	]);

	Runner.run(tests).handle(outcome -> {
		Coverage.endCoverage();
		Runner.exit(outcome);
	});
}
