package js.actions;

import haxe.extern.EitherType;
import js.lib.Error;

/** Functions for setting results, logging, registering secrets and exporting variables across actions. **/
@:jsRequire("@actions/core")
extern class Core {

	/** Prepends the given input `path` to the system `PATH`. **/
	static function addPath(path: String): Void;

	/** Sets an environment variable. **/
	static function exportVariable(name: String, value: String): Void;

	/** Logs the specified `message`. **/
	static function info(message: String): Void;

	/** Gets the value of an input. **/
	static function getInput(name: String, ?options: InputOptions): String;

	/** Logs the specified `message` and sets the action status to failed. **/
	static function setFailed(message: EitherType<Error, String>): Void;
}

/** Defines the options of an action input. **/
typedef InputOptions = {

	/** Value indicating whether the input is required. **/
	var ?required: Bool;

	/** Value indicating whether leading/trailing whitespace will be trimmed for the input. **/
	var ?trimWhitespace: Bool;
}
