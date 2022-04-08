package js.actions;

import haxe.DynamicAccess;
import js.lib.Promise;
import js.node.Buffer;
import js.node.stream.Writable;

/** Executes tools in a cross platform way. **/
@:jsRequire("@actions/exec")
extern class Exec {

	/**
		Executes a command.
		Returns a promise that resolves with the exit code.
	**/
	static function exec(command: String, ?arguments: Array<String>, ?options: ExecOptions): Promise<Int>;

	/**
		Executes a command and gets the output.
		Returns a promise that resolves with the exit code and the collected `stdout` and `stderr`.
	**/
	static function getExecOutput(command: String, ?arguments: Array<String>, ?options: ExecOptions): Promise<ExecOutput>;
}

/** Defines the user defined listeners for an `Exec` call. **/
typedef ExecListeners = {

	/** A callback for each debug log. **/
	var ?debug: String -> Void;

	/** A callback for each line of `stderr`. **/
	var ?errline: String -> Void;

	/** A callback for each buffer of `stderr`. **/
	var ?stderr: Buffer -> Void;

	/** A callback for each line of `stdout`. **/
	var ?stdline: String -> Void;

	/** A callback for each buffer of `stdout`. **/
	var ?stdout: Buffer -> Void;
}

/** Defines the options of the methods of the `Exec` class. **/
typedef ExecOptions = {

	/** The working directory. **/
	var ?cwd: String;

	/** How long in milliseconds to wait for `STDIO` streams to close after the exit event of the process before terminating. **/
	var ?delay: Int;

	/** The dictionary of environment variables. **/
	var ?env: DynamicAccess<String>;

	/** The `stderr` stream to use. **/
	var ?errStream: Writable<Dynamic>;

	/** Value indicating whether to fail on output to `stderr`. **/
	var ?failOnStdErr: Bool;

	/** Value indicating whether to ignore failing on non zero exit code. **/
	var ?ignoreReturnCode: Bool;

	/** The input to write to the process on `STDIN.` **/
	var ?input: Buffer;

	/** The listeners for output. **/
	var ?listeners: ExecListeners;

	/** The `stdout` stream to use. **/
	var ?outStream: Writable<Dynamic>;

	/** Value indicating whether to silence the standard output. **/
	var ?silent: Bool;

	/** Value indicating whether to skip quoting/escaping arguments if needed. **/
	var ?windowsVerbatimArguments: Bool;
}

/** Defines the output of the `Exec.getExecOutput()` method. **/
typedef ExecOutput = {

	/** The exit code of the process. **/
	var exitCode: Int;

	/** The entire `stderr` of the process as a string. **/
	var stderr: String;

	/** The entire `stdout` of the process as a string. **/
	var stdout: String;
}
