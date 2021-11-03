import haxe.Exception;
import tink.core.Error.ErrorCode;
import tink.unit.AssertionBuffer;

using tink.CoreApi;

/** Provides helper methods for creating assertions. **/
abstract class AssertionTools {

	/** Expects the specified promise to not reject. **/
	public static function doesNotReject(asserts: AssertionBuffer, promise: Promise<Any>, ?errorCode: ErrorCode): Promise<Noise>
		return promise.map(outcome -> switch outcome {
			case Success(_):
				asserts.assert(true, "It should not reject.");
				Success(Noise);
			case Failure(e):
				asserts.assert(errorCode != null ? e.code != errorCode : false, errorCode != null
					? 'It should not reject with a $errorCode error.'
					: "It should not reject.");
				errorCode != null && e.code != errorCode
					? Success(Noise)
					: Failure(new Error(ExpectationFailed, 'Promise rejected with a ${e.code} error.'));
		});

	/** Expects the specified function to not throw an exception. **/
	public static function doesNotThrow(asserts: AssertionBuffer, func: () -> Void, ?exceptionClass: Class<Exception>)
		try { func(); asserts.assert(true, "It should not throw an exception."); }
		catch (e) asserts.assert(!Std.isOfType(e, exceptionClass != null ? exceptionClass : Exception));

	/** Expects the specified promise to be rejected. **/
	public static function rejects(asserts: AssertionBuffer, promise: Promise<Any>, ?errorCode: ErrorCode): Promise<Noise>
		return promise.map(outcome -> switch outcome {
			case Success(_):
				asserts.assert(false, "It should reject.");
				Failure(new Error(ExpectationFailed, "Promise not rejected."));
			case Failure(e):
				asserts.assert(errorCode != null ? e.code == errorCode : true, errorCode != null
					? 'It should reject with a $errorCode error.'
					: "It should reject.");
				errorCode == null || e.code == errorCode
					? Success(Noise)
					: Failure(new Error(ExpectationFailed, 'Promise not rejected with a $errorCode error.'));
		});

	/** Expects the specified function to throw an exception. **/
	public static function throws(asserts: AssertionBuffer, func: () -> Void, ?exceptionClass: Class<Exception>)
		try { func(); asserts.fail("Exception not thrown."); }
		catch (e) asserts.assert(Std.isOfType(e, exceptionClass != null ? exceptionClass : Exception));
}
