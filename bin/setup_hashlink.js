#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const oidc_utils_1 = __nccwpck_require__(41);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(147));
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 41:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(925);
const auth_1 = __nccwpck_require__(702);
const core_1 = __nccwpck_require__(186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 514:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getExecOutput = exports.exec = void 0;
const string_decoder_1 = __nccwpck_require__(576);
const tr = __importStar(__nccwpck_require__(159));
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */
function exec(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
exports.exec = exec;
/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */
function getExecOutput(commandLine, args, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let stdout = '';
        let stderr = '';
        //Using string decoder covers the case where a mult-byte character is split
        const stdoutDecoder = new string_decoder_1.StringDecoder('utf8');
        const stderrDecoder = new string_decoder_1.StringDecoder('utf8');
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data) => {
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) {
                originalStdErrListener(data);
            }
        };
        const stdOutListener = (data) => {
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) {
                originalStdoutListener(data);
            }
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
        const exitCode = yield exec(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
        //flush any remaining characters
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
            exitCode,
            stdout,
            stderr
        };
    });
}
exports.getExecOutput = getExecOutput;
//# sourceMappingURL=exec.js.map

/***/ }),

/***/ 159:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.argStringToArray = exports.ToolRunner = void 0;
const os = __importStar(__nccwpck_require__(37));
const events = __importStar(__nccwpck_require__(361));
const child = __importStar(__nccwpck_require__(81));
const path = __importStar(__nccwpck_require__(17));
const io = __importStar(__nccwpck_require__(436));
const ioUtil = __importStar(__nccwpck_require__(962));
const timers_1 = __nccwpck_require__(512);
/* eslint-disable @typescript-eslint/unbound-method */
const IS_WINDOWS = process.platform === 'win32';
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */
class ToolRunner extends events.EventEmitter {
    constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
        }
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
        if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows (regular)
            else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args) {
                    cmd += ` ${this._windowsQuoteCmdArg(a)}`;
                }
            }
        }
        else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
                cmd += ` ${a}`;
            }
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + os.EOL.length);
                n = s.indexOf(os.EOL);
            }
            return s;
        }
        catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return '';
        }
    }
    _getSpawnFileName() {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                return process.env['COMSPEC'] || 'cmd.exe';
            }
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args) {
                    argline += ' ';
                    argline += options.windowsVerbatimArguments
                        ? a
                        : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [argline];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return (this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT'));
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
        }
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) {
            return '""';
        }
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
            if (cmdSpecialChars.some(x => x === char)) {
                needsQuotes = true;
                break;
            }
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) {
            return arg;
        }
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\'; // double the slash
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) {
            // Need double quotation for empty argument
            return '""';
        }
        if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
        }
        if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
        }
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\';
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '\\';
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
        }
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            // root the tool path if it is unrooted and contains relative pathing
            if (!ioUtil.isRooted(this.toolPath) &&
                (this.toolPath.includes('/') ||
                    (IS_WINDOWS && this.toolPath.includes('\\')))) {
                // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
                this.toolPath = path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            }
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield io.which(this.toolPath, true);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                    this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                    optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                    this._debug(message);
                });
                if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
                    return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
                }
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                let stdbuffer = '';
                if (cp.stdout) {
                    cp.stdout.on('data', (data) => {
                        if (this.options.listeners && this.options.listeners.stdout) {
                            this.options.listeners.stdout(data);
                        }
                        if (!optionsNonNull.silent && optionsNonNull.outStream) {
                            optionsNonNull.outStream.write(data);
                        }
                        stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.stdline) {
                                this.options.listeners.stdline(line);
                            }
                        });
                    });
                }
                let errbuffer = '';
                if (cp.stderr) {
                    cp.stderr.on('data', (data) => {
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) {
                            this.options.listeners.stderr(data);
                        }
                        if (!optionsNonNull.silent &&
                            optionsNonNull.errStream &&
                            optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr
                                ? optionsNonNull.errStream
                                : optionsNonNull.outStream;
                            s.write(data);
                        }
                        errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.errline) {
                                this.options.listeners.errline(line);
                            }
                        });
                    });
                }
                cp.on('error', (err) => {
                    state.processError = err.message;
                    state.processExited = true;
                    state.processClosed = true;
                    state.CheckComplete();
                });
                cp.on('exit', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                cp.on('close', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    state.processClosed = true;
                    this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                    if (stdbuffer.length > 0) {
                        this.emit('stdline', stdbuffer);
                    }
                    if (errbuffer.length > 0) {
                        this.emit('errline', errbuffer);
                    }
                    cp.removeAllListeners();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(exitCode);
                    }
                });
                if (this.options.input) {
                    if (!cp.stdin) {
                        throw new Error('child process missing stdin');
                    }
                    cp.stdin.end(this.options.input);
                }
            }));
        });
    }
}
exports.ToolRunner = ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */
function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = '';
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') {
            arg += '\\';
        }
        arg += c;
        escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) {
                inQuotes = !inQuotes;
            }
            else {
                append(c);
            }
            continue;
        }
        if (c === '\\' && escaped) {
            append(c);
            continue;
        }
        if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = '';
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) {
        args.push(arg.trim());
    }
    return args;
}
exports.argStringToArray = argStringToArray;
class ExecState extends events.EventEmitter {
    constructor(options, toolPath) {
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = '';
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
            throw new Error('toolPath must not be empty');
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
            this.delay = options.delay;
        }
    }
    CheckComplete() {
        if (this.done) {
            return;
        }
        if (this.processClosed) {
            this._setResult();
        }
        else if (this.processExited) {
            this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
    }
    _debug(message) {
        this.emit('debug', message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) {
                error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            }
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
                error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            }
            else if (this.processStderr && this.options.failOnStdErr) {
                error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
            }
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit('done', error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) {
            return;
        }
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay /
                1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}
//# sourceMappingURL=toolrunner.js.map

/***/ }),

/***/ 702:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 925:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(685);
const https = __nccwpck_require__(687);
const pm = __nccwpck_require__(443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 962:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rename = exports.readlink = exports.readdir = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
const fs = __importStar(__nccwpck_require__(147));
const path = __importStar(__nccwpck_require__(17));
_a = fs.promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
exports.IS_WINDOWS = process.platform === 'win32';
function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.stat(fsPath);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            throw err;
        }
        return true;
    });
}
exports.exists = exists;
function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
exports.isDirectory = isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */
function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports.IS_WINDOWS) {
        return (p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
        ); // e.g. C: or C:\hello
    }
    return p.startsWith('/');
}
exports.isRooted = isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */
function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
        let stats = undefined;
        try {
            // test file exists
            stats = yield exports.stat(filePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
        }
        if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = path.extname(filePath).toUpperCase();
                if (extensions.some(validExt => validExt.toUpperCase() === upperExt)) {
                    return filePath;
                }
            }
            else {
                if (isUnixExecutable(stats)) {
                    return filePath;
                }
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield exports.stat(filePath);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    // eslint-disable-next-line no-console
                    console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
                }
            }
            if (stats && stats.isFile()) {
                if (exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = path.dirname(filePath);
                        const upperName = path.basename(filePath).toUpperCase();
                        for (const actualName of yield exports.readdir(directory)) {
                            if (upperName === actualName.toUpperCase()) {
                                filePath = path.join(directory, actualName);
                                break;
                            }
                        }
                    }
                    catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                }
                else {
                    if (isUnixExecutable(stats)) {
                        return filePath;
                    }
                }
            }
        }
        return '';
    });
}
exports.tryGetExecutablePath = tryGetExecutablePath;
function normalizeSeparators(p) {
    p = p || '';
    if (exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, '\\');
        // remove redundant slashes
        return p.replace(/\\\\+/g, '\\');
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, '/');
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function isUnixExecutable(stats) {
    return ((stats.mode & 1) > 0 ||
        ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
        ((stats.mode & 64) > 0 && stats.uid === process.getuid()));
}
// Get the path of cmd.exe in windows
function getCmdPath() {
    var _a;
    return (_a = process.env['COMSPEC']) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
exports.getCmdPath = getCmdPath;
//# sourceMappingURL=io-util.js.map

/***/ }),

/***/ 436:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findInPath = exports.which = exports.mkdirP = exports.rmRF = exports.mv = exports.cp = void 0;
const assert_1 = __nccwpck_require__(491);
const childProcess = __importStar(__nccwpck_require__(81));
const path = __importStar(__nccwpck_require__(17));
const util_1 = __nccwpck_require__(837);
const ioUtil = __importStar(__nccwpck_require__(962));
const exec = util_1.promisify(childProcess.exec);
const execFile = util_1.promisify(childProcess.execFile);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
function cp(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { force, recursive, copySourceDirectory } = readCopyOptions(options);
        const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) {
            return;
        }
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory
            ? path.join(dest, path.basename(source))
            : dest;
        if (!(yield ioUtil.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) {
                throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            }
            else {
                yield cpDirRecursive(source, newDest, 0, force);
            }
        }
        else {
            if (path.relative(source, newDest) === '') {
                // a file cannot be copied to itself
                throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
        }
    });
}
exports.cp = cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */
function mv(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield ioUtil.exists(dest)) {
            let destExists = true;
            if (yield ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = path.join(dest, path.basename(source));
                destExists = yield ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) {
                    yield rmRF(dest);
                }
                else {
                    throw new Error('Destination already exists');
                }
            }
        }
        yield mkdirP(path.dirname(dest));
        yield ioUtil.rename(source, dest);
    });
}
exports.mv = mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
function rmRF(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) {
                throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            }
            try {
                const cmdPath = ioUtil.getCmdPath();
                if (yield ioUtil.isDirectory(inputPath, true)) {
                    yield exec(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                        env: { inputPath }
                    });
                }
                else {
                    yield exec(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                        env: { inputPath }
                    });
                }
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield ioUtil.unlink(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
        }
        else {
            let isDir = false;
            try {
                isDir = yield ioUtil.isDirectory(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
                return;
            }
            if (isDir) {
                yield execFile(`rm`, [`-rf`, `${inputPath}`]);
            }
            else {
                yield ioUtil.unlink(inputPath);
            }
        }
    });
}
exports.rmRF = rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
function mkdirP(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, 'a path argument must be provided');
        yield ioUtil.mkdir(fsPath, { recursive: true });
    });
}
exports.mkdirP = mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
function which(tool, check) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // recursive when check=true
        if (check) {
            const result = yield which(tool, false);
            if (!result) {
                if (ioUtil.IS_WINDOWS) {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                }
                else {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
                }
            }
            return result;
        }
        const matches = yield findInPath(tool);
        if (matches && matches.length > 0) {
            return matches[0];
        }
        return '';
    });
}
exports.which = which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */
function findInPath(tool) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // build the list of extensions to try
        const extensions = [];
        if (ioUtil.IS_WINDOWS && process.env['PATHEXT']) {
            for (const extension of process.env['PATHEXT'].split(path.delimiter)) {
                if (extension) {
                    extensions.push(extension);
                }
            }
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if (ioUtil.isRooted(tool)) {
            const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) {
                return [filePath];
            }
            return [];
        }
        // if any path separators, return empty
        if (tool.includes(path.sep)) {
            return [];
        }
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split(path.delimiter)) {
                if (p) {
                    directories.push(p);
                }
            }
        }
        // find all matches
        const matches = [];
        for (const directory of directories) {
            const filePath = yield ioUtil.tryGetExecutablePath(path.join(directory, tool), extensions);
            if (filePath) {
                matches.push(filePath);
            }
        }
        return matches;
    });
}
exports.findInPath = findInPath;
function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null
        ? true
        : Boolean(options.copySourceDirectory);
    return { force, recursive, copySourceDirectory };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter(this, void 0, void 0, function* () {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255)
            return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil.readdir(sourceDir);
        for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
                // Recurse
                yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            }
            else {
                yield copyFile(srcFile, destFile, force);
            }
        }
        // Change the mode for the newly created directory
        yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function copyFile(srcFile, destFile, force) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield ioUtil.lstat(destFile);
                yield ioUtil.unlink(destFile);
            }
            catch (e) {
                // Try to override file permission
                if (e.code === 'EPERM') {
                    yield ioUtil.chmod(destFile, '0666');
                    yield ioUtil.unlink(destFile);
                }
                // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil.readlink(srcFile);
            yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? 'junction' : null);
        }
        else if (!(yield ioUtil.exists(destFile)) || force) {
            yield ioUtil.copyFile(srcFile, destFile);
        }
    });
}
//# sourceMappingURL=io.js.map

/***/ }),

/***/ 473:
/***/ (function(module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._readLinuxVersionFile = exports._getOsVersion = exports._findMatch = void 0;
const semver = __importStar(__nccwpck_require__(911));
const core_1 = __nccwpck_require__(186);
// needs to be require for core node modules to be mocked
/* eslint @typescript-eslint/no-require-imports: 0 */
const os = __nccwpck_require__(37);
const cp = __nccwpck_require__(81);
const fs = __nccwpck_require__(147);
function _findMatch(versionSpec, stable, candidates, archFilter) {
    return __awaiter(this, void 0, void 0, function* () {
        const platFilter = os.platform();
        let result;
        let match;
        let file;
        for (const candidate of candidates) {
            const version = candidate.version;
            core_1.debug(`check ${version} satisfies ${versionSpec}`);
            if (semver.satisfies(version, versionSpec) &&
                (!stable || candidate.stable === stable)) {
                file = candidate.files.find(item => {
                    core_1.debug(`${item.arch}===${archFilter} && ${item.platform}===${platFilter}`);
                    let chk = item.arch === archFilter && item.platform === platFilter;
                    if (chk && item.platform_version) {
                        const osVersion = module.exports._getOsVersion();
                        if (osVersion === item.platform_version) {
                            chk = true;
                        }
                        else {
                            chk = semver.satisfies(osVersion, item.platform_version);
                        }
                    }
                    return chk;
                });
                if (file) {
                    core_1.debug(`matched ${candidate.version}`);
                    match = candidate;
                    break;
                }
            }
        }
        if (match && file) {
            // clone since we're mutating the file list to be only the file that matches
            result = Object.assign({}, match);
            result.files = [file];
        }
        return result;
    });
}
exports._findMatch = _findMatch;
function _getOsVersion() {
    // TODO: add windows and other linux, arm variants
    // right now filtering on version is only an ubuntu and macos scenario for tools we build for hosted (python)
    const plat = os.platform();
    let version = '';
    if (plat === 'darwin') {
        version = cp.execSync('sw_vers -productVersion').toString();
    }
    else if (plat === 'linux') {
        // lsb_release process not in some containers, readfile
        // Run cat /etc/lsb-release
        // DISTRIB_ID=Ubuntu
        // DISTRIB_RELEASE=18.04
        // DISTRIB_CODENAME=bionic
        // DISTRIB_DESCRIPTION="Ubuntu 18.04.4 LTS"
        const lsbContents = module.exports._readLinuxVersionFile();
        if (lsbContents) {
            const lines = lsbContents.split('\n');
            for (const line of lines) {
                const parts = line.split('=');
                if (parts.length === 2 &&
                    (parts[0].trim() === 'VERSION_ID' ||
                        parts[0].trim() === 'DISTRIB_RELEASE')) {
                    version = parts[1]
                        .trim()
                        .replace(/^"/, '')
                        .replace(/"$/, '');
                    break;
                }
            }
        }
    }
    return version;
}
exports._getOsVersion = _getOsVersion;
function _readLinuxVersionFile() {
    const lsbReleaseFile = '/etc/lsb-release';
    const osReleaseFile = '/etc/os-release';
    let contents = '';
    if (fs.existsSync(lsbReleaseFile)) {
        contents = fs.readFileSync(lsbReleaseFile).toString();
    }
    else if (fs.existsSync(osReleaseFile)) {
        contents = fs.readFileSync(osReleaseFile).toString();
    }
    return contents;
}
exports._readLinuxVersionFile = _readLinuxVersionFile;
//# sourceMappingURL=manifest.js.map

/***/ }),

/***/ 279:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RetryHelper = void 0;
const core = __importStar(__nccwpck_require__(186));
/**
 * Internal class for retries
 */
class RetryHelper {
    constructor(maxAttempts, minSeconds, maxSeconds) {
        if (maxAttempts < 1) {
            throw new Error('max attempts should be greater than or equal to 1');
        }
        this.maxAttempts = maxAttempts;
        this.minSeconds = Math.floor(minSeconds);
        this.maxSeconds = Math.floor(maxSeconds);
        if (this.minSeconds > this.maxSeconds) {
            throw new Error('min seconds should be less than or equal to max seconds');
        }
    }
    execute(action, isRetryable) {
        return __awaiter(this, void 0, void 0, function* () {
            let attempt = 1;
            while (attempt < this.maxAttempts) {
                // Try
                try {
                    return yield action();
                }
                catch (err) {
                    if (isRetryable && !isRetryable(err)) {
                        throw err;
                    }
                    core.info(err.message);
                }
                // Sleep
                const seconds = this.getSleepAmount();
                core.info(`Waiting ${seconds} seconds before trying again`);
                yield this.sleep(seconds);
                attempt++;
            }
            // Last attempt
            return yield action();
        });
    }
    getSleepAmount() {
        return (Math.floor(Math.random() * (this.maxSeconds - this.minSeconds + 1)) +
            this.minSeconds);
    }
    sleep(seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, seconds * 1000));
        });
    }
}
exports.RetryHelper = RetryHelper;
//# sourceMappingURL=retry-helper.js.map

/***/ }),

/***/ 784:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.evaluateVersions = exports.isExplicitVersion = exports.findFromManifest = exports.getManifestFromRepo = exports.findAllVersions = exports.find = exports.cacheFile = exports.cacheDir = exports.extractZip = exports.extractXar = exports.extractTar = exports.extract7z = exports.downloadTool = exports.HTTPError = void 0;
const core = __importStar(__nccwpck_require__(186));
const io = __importStar(__nccwpck_require__(436));
const fs = __importStar(__nccwpck_require__(147));
const mm = __importStar(__nccwpck_require__(473));
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const httpm = __importStar(__nccwpck_require__(925));
const semver = __importStar(__nccwpck_require__(911));
const stream = __importStar(__nccwpck_require__(781));
const util = __importStar(__nccwpck_require__(837));
const v4_1 = __importDefault(__nccwpck_require__(824));
const exec_1 = __nccwpck_require__(514);
const assert_1 = __nccwpck_require__(491);
const retry_helper_1 = __nccwpck_require__(279);
class HTTPError extends Error {
    constructor(httpStatusCode) {
        super(`Unexpected HTTP response: ${httpStatusCode}`);
        this.httpStatusCode = httpStatusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.HTTPError = HTTPError;
const IS_WINDOWS = process.platform === 'win32';
const IS_MAC = process.platform === 'darwin';
const userAgent = 'actions/tool-cache';
/**
 * Download a tool from an url and stream it into a file
 *
 * @param url       url of tool to download
 * @param dest      path to download tool
 * @param auth      authorization header
 * @param headers   other headers
 * @returns         path to downloaded tool
 */
function downloadTool(url, dest, auth, headers) {
    return __awaiter(this, void 0, void 0, function* () {
        dest = dest || path.join(_getTempDirectory(), v4_1.default());
        yield io.mkdirP(path.dirname(dest));
        core.debug(`Downloading ${url}`);
        core.debug(`Destination ${dest}`);
        const maxAttempts = 3;
        const minSeconds = _getGlobal('TEST_DOWNLOAD_TOOL_RETRY_MIN_SECONDS', 10);
        const maxSeconds = _getGlobal('TEST_DOWNLOAD_TOOL_RETRY_MAX_SECONDS', 20);
        const retryHelper = new retry_helper_1.RetryHelper(maxAttempts, minSeconds, maxSeconds);
        return yield retryHelper.execute(() => __awaiter(this, void 0, void 0, function* () {
            return yield downloadToolAttempt(url, dest || '', auth, headers);
        }), (err) => {
            if (err instanceof HTTPError && err.httpStatusCode) {
                // Don't retry anything less than 500, except 408 Request Timeout and 429 Too Many Requests
                if (err.httpStatusCode < 500 &&
                    err.httpStatusCode !== 408 &&
                    err.httpStatusCode !== 429) {
                    return false;
                }
            }
            // Otherwise retry
            return true;
        });
    });
}
exports.downloadTool = downloadTool;
function downloadToolAttempt(url, dest, auth, headers) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs.existsSync(dest)) {
            throw new Error(`Destination file path ${dest} already exists`);
        }
        // Get the response headers
        const http = new httpm.HttpClient(userAgent, [], {
            allowRetries: false
        });
        if (auth) {
            core.debug('set auth');
            if (headers === undefined) {
                headers = {};
            }
            headers.authorization = auth;
        }
        const response = yield http.get(url, headers);
        if (response.message.statusCode !== 200) {
            const err = new HTTPError(response.message.statusCode);
            core.debug(`Failed to download from "${url}". Code(${response.message.statusCode}) Message(${response.message.statusMessage})`);
            throw err;
        }
        // Download the response body
        const pipeline = util.promisify(stream.pipeline);
        const responseMessageFactory = _getGlobal('TEST_DOWNLOAD_TOOL_RESPONSE_MESSAGE_FACTORY', () => response.message);
        const readStream = responseMessageFactory();
        let succeeded = false;
        try {
            yield pipeline(readStream, fs.createWriteStream(dest));
            core.debug('download complete');
            succeeded = true;
            return dest;
        }
        finally {
            // Error, delete dest before retry
            if (!succeeded) {
                core.debug('download failed');
                try {
                    yield io.rmRF(dest);
                }
                catch (err) {
                    core.debug(`Failed to delete '${dest}'. ${err.message}`);
                }
            }
        }
    });
}
/**
 * Extract a .7z file
 *
 * @param file     path to the .7z file
 * @param dest     destination directory. Optional.
 * @param _7zPath  path to 7zr.exe. Optional, for long path support. Most .7z archives do not have this
 * problem. If your .7z archive contains very long paths, you can pass the path to 7zr.exe which will
 * gracefully handle long paths. By default 7zdec.exe is used because it is a very small program and is
 * bundled with the tool lib. However it does not support long paths. 7zr.exe is the reduced command line
 * interface, it is smaller than the full command line interface, and it does support long paths. At the
 * time of this writing, it is freely available from the LZMA SDK that is available on the 7zip website.
 * Be sure to check the current license agreement. If 7zr.exe is bundled with your action, then the path
 * to 7zr.exe can be pass to this function.
 * @returns        path to the destination directory
 */
function extract7z(file, dest, _7zPath) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(IS_WINDOWS, 'extract7z() not supported on current OS');
        assert_1.ok(file, 'parameter "file" is required');
        dest = yield _createExtractFolder(dest);
        const originalCwd = process.cwd();
        process.chdir(dest);
        if (_7zPath) {
            try {
                const logLevel = core.isDebug() ? '-bb1' : '-bb0';
                const args = [
                    'x',
                    logLevel,
                    '-bd',
                    '-sccUTF-8',
                    file
                ];
                const options = {
                    silent: true
                };
                yield exec_1.exec(`"${_7zPath}"`, args, options);
            }
            finally {
                process.chdir(originalCwd);
            }
        }
        else {
            const escapedScript = path
                .join(__dirname, '..', 'scripts', 'Invoke-7zdec.ps1')
                .replace(/'/g, "''")
                .replace(/"|\n|\r/g, ''); // double-up single quotes, remove double quotes and newlines
            const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, '');
            const escapedTarget = dest.replace(/'/g, "''").replace(/"|\n|\r/g, '');
            const command = `& '${escapedScript}' -Source '${escapedFile}' -Target '${escapedTarget}'`;
            const args = [
                '-NoLogo',
                '-Sta',
                '-NoProfile',
                '-NonInteractive',
                '-ExecutionPolicy',
                'Unrestricted',
                '-Command',
                command
            ];
            const options = {
                silent: true
            };
            try {
                const powershellPath = yield io.which('powershell', true);
                yield exec_1.exec(`"${powershellPath}"`, args, options);
            }
            finally {
                process.chdir(originalCwd);
            }
        }
        return dest;
    });
}
exports.extract7z = extract7z;
/**
 * Extract a compressed tar archive
 *
 * @param file     path to the tar
 * @param dest     destination directory. Optional.
 * @param flags    flags for the tar command to use for extraction. Defaults to 'xz' (extracting gzipped tars). Optional.
 * @returns        path to the destination directory
 */
function extractTar(file, dest, flags = 'xz') {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            throw new Error("parameter 'file' is required");
        }
        // Create dest
        dest = yield _createExtractFolder(dest);
        // Determine whether GNU tar
        core.debug('Checking tar --version');
        let versionOutput = '';
        yield exec_1.exec('tar --version', [], {
            ignoreReturnCode: true,
            silent: true,
            listeners: {
                stdout: (data) => (versionOutput += data.toString()),
                stderr: (data) => (versionOutput += data.toString())
            }
        });
        core.debug(versionOutput.trim());
        const isGnuTar = versionOutput.toUpperCase().includes('GNU TAR');
        // Initialize args
        let args;
        if (flags instanceof Array) {
            args = flags;
        }
        else {
            args = [flags];
        }
        if (core.isDebug() && !flags.includes('v')) {
            args.push('-v');
        }
        let destArg = dest;
        let fileArg = file;
        if (IS_WINDOWS && isGnuTar) {
            args.push('--force-local');
            destArg = dest.replace(/\\/g, '/');
            // Technically only the dest needs to have `/` but for aesthetic consistency
            // convert slashes in the file arg too.
            fileArg = file.replace(/\\/g, '/');
        }
        if (isGnuTar) {
            // Suppress warnings when using GNU tar to extract archives created by BSD tar
            args.push('--warning=no-unknown-keyword');
            args.push('--overwrite');
        }
        args.push('-C', destArg, '-f', fileArg);
        yield exec_1.exec(`tar`, args);
        return dest;
    });
}
exports.extractTar = extractTar;
/**
 * Extract a xar compatible archive
 *
 * @param file     path to the archive
 * @param dest     destination directory. Optional.
 * @param flags    flags for the xar. Optional.
 * @returns        path to the destination directory
 */
function extractXar(file, dest, flags = []) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(IS_MAC, 'extractXar() not supported on current OS');
        assert_1.ok(file, 'parameter "file" is required');
        dest = yield _createExtractFolder(dest);
        let args;
        if (flags instanceof Array) {
            args = flags;
        }
        else {
            args = [flags];
        }
        args.push('-x', '-C', dest, '-f', file);
        if (core.isDebug()) {
            args.push('-v');
        }
        const xarPath = yield io.which('xar', true);
        yield exec_1.exec(`"${xarPath}"`, _unique(args));
        return dest;
    });
}
exports.extractXar = extractXar;
/**
 * Extract a zip
 *
 * @param file     path to the zip
 * @param dest     destination directory. Optional.
 * @returns        path to the destination directory
 */
function extractZip(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            throw new Error("parameter 'file' is required");
        }
        dest = yield _createExtractFolder(dest);
        if (IS_WINDOWS) {
            yield extractZipWin(file, dest);
        }
        else {
            yield extractZipNix(file, dest);
        }
        return dest;
    });
}
exports.extractZip = extractZip;
function extractZipWin(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        // build the powershell command
        const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, ''); // double-up single quotes, remove double quotes and newlines
        const escapedDest = dest.replace(/'/g, "''").replace(/"|\n|\r/g, '');
        const pwshPath = yield io.which('pwsh', false);
        //To match the file overwrite behavior on nix systems, we use the overwrite = true flag for ExtractToDirectory
        //and the -Force flag for Expand-Archive as a fallback
        if (pwshPath) {
            //attempt to use pwsh with ExtractToDirectory, if this fails attempt Expand-Archive
            const pwshCommand = [
                `$ErrorActionPreference = 'Stop' ;`,
                `try { Add-Type -AssemblyName System.IO.Compression.ZipFile } catch { } ;`,
                `try { [System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`,
                `catch { if (($_.Exception.GetType().FullName -eq 'System.Management.Automation.MethodException') -or ($_.Exception.GetType().FullName -eq 'System.Management.Automation.RuntimeException') ){ Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force } else { throw $_ } } ;`
            ].join(' ');
            const args = [
                '-NoLogo',
                '-NoProfile',
                '-NonInteractive',
                '-ExecutionPolicy',
                'Unrestricted',
                '-Command',
                pwshCommand
            ];
            core.debug(`Using pwsh at path: ${pwshPath}`);
            yield exec_1.exec(`"${pwshPath}"`, args);
        }
        else {
            const powershellCommand = [
                `$ErrorActionPreference = 'Stop' ;`,
                `try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ;`,
                `if ((Get-Command -Name Expand-Archive -Module Microsoft.PowerShell.Archive -ErrorAction Ignore)) { Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force }`,
                `else {[System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`
            ].join(' ');
            const args = [
                '-NoLogo',
                '-Sta',
                '-NoProfile',
                '-NonInteractive',
                '-ExecutionPolicy',
                'Unrestricted',
                '-Command',
                powershellCommand
            ];
            const powershellPath = yield io.which('powershell', true);
            core.debug(`Using powershell at path: ${powershellPath}`);
            yield exec_1.exec(`"${powershellPath}"`, args);
        }
    });
}
function extractZipNix(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        const unzipPath = yield io.which('unzip', true);
        const args = [file];
        if (!core.isDebug()) {
            args.unshift('-q');
        }
        args.unshift('-o'); //overwrite with -o, otherwise a prompt is shown which freezes the run
        yield exec_1.exec(`"${unzipPath}"`, args, { cwd: dest });
    });
}
/**
 * Caches a directory and installs it into the tool cacheDir
 *
 * @param sourceDir    the directory to cache into tools
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */
function cacheDir(sourceDir, tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
        version = semver.clean(version) || version;
        arch = arch || os.arch();
        core.debug(`Caching tool ${tool} ${version} ${arch}`);
        core.debug(`source dir: ${sourceDir}`);
        if (!fs.statSync(sourceDir).isDirectory()) {
            throw new Error('sourceDir is not a directory');
        }
        // Create the tool dir
        const destPath = yield _createToolPath(tool, version, arch);
        // copy each child item. do not move. move can fail on Windows
        // due to anti-virus software having an open handle on a file.
        for (const itemName of fs.readdirSync(sourceDir)) {
            const s = path.join(sourceDir, itemName);
            yield io.cp(s, destPath, { recursive: true });
        }
        // write .complete
        _completeToolPath(tool, version, arch);
        return destPath;
    });
}
exports.cacheDir = cacheDir;
/**
 * Caches a downloaded file (GUID) and installs it
 * into the tool cache with a given targetName
 *
 * @param sourceFile    the file to cache into tools.  Typically a result of downloadTool which is a guid.
 * @param targetFile    the name of the file name in the tools directory
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */
function cacheFile(sourceFile, targetFile, tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
        version = semver.clean(version) || version;
        arch = arch || os.arch();
        core.debug(`Caching tool ${tool} ${version} ${arch}`);
        core.debug(`source file: ${sourceFile}`);
        if (!fs.statSync(sourceFile).isFile()) {
            throw new Error('sourceFile is not a file');
        }
        // create the tool dir
        const destFolder = yield _createToolPath(tool, version, arch);
        // copy instead of move. move can fail on Windows due to
        // anti-virus software having an open handle on a file.
        const destPath = path.join(destFolder, targetFile);
        core.debug(`destination file ${destPath}`);
        yield io.cp(sourceFile, destPath);
        // write .complete
        _completeToolPath(tool, version, arch);
        return destFolder;
    });
}
exports.cacheFile = cacheFile;
/**
 * Finds the path to a tool version in the local installed tool cache
 *
 * @param toolName      name of the tool
 * @param versionSpec   version of the tool
 * @param arch          optional arch.  defaults to arch of computer
 */
function find(toolName, versionSpec, arch) {
    if (!toolName) {
        throw new Error('toolName parameter is required');
    }
    if (!versionSpec) {
        throw new Error('versionSpec parameter is required');
    }
    arch = arch || os.arch();
    // attempt to resolve an explicit version
    if (!isExplicitVersion(versionSpec)) {
        const localVersions = findAllVersions(toolName, arch);
        const match = evaluateVersions(localVersions, versionSpec);
        versionSpec = match;
    }
    // check for the explicit version in the cache
    let toolPath = '';
    if (versionSpec) {
        versionSpec = semver.clean(versionSpec) || '';
        const cachePath = path.join(_getCacheDirectory(), toolName, versionSpec, arch);
        core.debug(`checking cache: ${cachePath}`);
        if (fs.existsSync(cachePath) && fs.existsSync(`${cachePath}.complete`)) {
            core.debug(`Found tool in cache ${toolName} ${versionSpec} ${arch}`);
            toolPath = cachePath;
        }
        else {
            core.debug('not found');
        }
    }
    return toolPath;
}
exports.find = find;
/**
 * Finds the paths to all versions of a tool that are installed in the local tool cache
 *
 * @param toolName  name of the tool
 * @param arch      optional arch.  defaults to arch of computer
 */
function findAllVersions(toolName, arch) {
    const versions = [];
    arch = arch || os.arch();
    const toolPath = path.join(_getCacheDirectory(), toolName);
    if (fs.existsSync(toolPath)) {
        const children = fs.readdirSync(toolPath);
        for (const child of children) {
            if (isExplicitVersion(child)) {
                const fullPath = path.join(toolPath, child, arch || '');
                if (fs.existsSync(fullPath) && fs.existsSync(`${fullPath}.complete`)) {
                    versions.push(child);
                }
            }
        }
    }
    return versions;
}
exports.findAllVersions = findAllVersions;
function getManifestFromRepo(owner, repo, auth, branch = 'master') {
    return __awaiter(this, void 0, void 0, function* () {
        let releases = [];
        const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}`;
        const http = new httpm.HttpClient('tool-cache');
        const headers = {};
        if (auth) {
            core.debug('set auth');
            headers.authorization = auth;
        }
        const response = yield http.getJson(treeUrl, headers);
        if (!response.result) {
            return releases;
        }
        let manifestUrl = '';
        for (const item of response.result.tree) {
            if (item.path === 'versions-manifest.json') {
                manifestUrl = item.url;
                break;
            }
        }
        headers['accept'] = 'application/vnd.github.VERSION.raw';
        let versionsRaw = yield (yield http.get(manifestUrl, headers)).readBody();
        if (versionsRaw) {
            // shouldn't be needed but protects against invalid json saved with BOM
            versionsRaw = versionsRaw.replace(/^\uFEFF/, '');
            try {
                releases = JSON.parse(versionsRaw);
            }
            catch (_a) {
                core.debug('Invalid json');
            }
        }
        return releases;
    });
}
exports.getManifestFromRepo = getManifestFromRepo;
function findFromManifest(versionSpec, stable, manifest, archFilter = os.arch()) {
    return __awaiter(this, void 0, void 0, function* () {
        // wrap the internal impl
        const match = yield mm._findMatch(versionSpec, stable, manifest, archFilter);
        return match;
    });
}
exports.findFromManifest = findFromManifest;
function _createExtractFolder(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!dest) {
            // create a temp dir
            dest = path.join(_getTempDirectory(), v4_1.default());
        }
        yield io.mkdirP(dest);
        return dest;
    });
}
function _createToolPath(tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
        const folderPath = path.join(_getCacheDirectory(), tool, semver.clean(version) || version, arch || '');
        core.debug(`destination ${folderPath}`);
        const markerPath = `${folderPath}.complete`;
        yield io.rmRF(folderPath);
        yield io.rmRF(markerPath);
        yield io.mkdirP(folderPath);
        return folderPath;
    });
}
function _completeToolPath(tool, version, arch) {
    const folderPath = path.join(_getCacheDirectory(), tool, semver.clean(version) || version, arch || '');
    const markerPath = `${folderPath}.complete`;
    fs.writeFileSync(markerPath, '');
    core.debug('finished caching tool');
}
/**
 * Check if version string is explicit
 *
 * @param versionSpec      version string to check
 */
function isExplicitVersion(versionSpec) {
    const c = semver.clean(versionSpec) || '';
    core.debug(`isExplicit: ${c}`);
    const valid = semver.valid(c) != null;
    core.debug(`explicit? ${valid}`);
    return valid;
}
exports.isExplicitVersion = isExplicitVersion;
/**
 * Get the highest satisfiying semantic version in `versions` which satisfies `versionSpec`
 *
 * @param versions        array of versions to evaluate
 * @param versionSpec     semantic version spec to satisfy
 */
function evaluateVersions(versions, versionSpec) {
    let version = '';
    core.debug(`evaluating ${versions.length} versions`);
    versions = versions.sort((a, b) => {
        if (semver.gt(a, b)) {
            return 1;
        }
        return -1;
    });
    for (let i = versions.length - 1; i >= 0; i--) {
        const potential = versions[i];
        const satisfied = semver.satisfies(potential, versionSpec);
        if (satisfied) {
            version = potential;
            break;
        }
    }
    if (version) {
        core.debug(`matched: ${version}`);
    }
    else {
        core.debug('match not found');
    }
    return version;
}
exports.evaluateVersions = evaluateVersions;
/**
 * Gets RUNNER_TOOL_CACHE
 */
function _getCacheDirectory() {
    const cacheDirectory = process.env['RUNNER_TOOL_CACHE'] || '';
    assert_1.ok(cacheDirectory, 'Expected RUNNER_TOOL_CACHE to be defined');
    return cacheDirectory;
}
/**
 * Gets RUNNER_TEMP
 */
function _getTempDirectory() {
    const tempDirectory = process.env['RUNNER_TEMP'] || '';
    assert_1.ok(tempDirectory, 'Expected RUNNER_TEMP to be defined');
    return tempDirectory;
}
/**
 * Gets a global variable
 */
function _getGlobal(key, defaultValue) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const value = global[key];
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return value !== undefined ? value : defaultValue;
}
/**
 * Returns an array of unique values.
 * @param values Values to make unique.
 */
function _unique(values) {
    return Array.from(new Set(values));
}
//# sourceMappingURL=tool-cache.js.map

/***/ }),

/***/ 911:
/***/ ((module, exports) => {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var t = exports.tokens = {}
var R = 0

function tok (n) {
  t[n] = R++
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

tok('NUMERICIDENTIFIER')
src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*'
tok('NUMERICIDENTIFIERLOOSE')
src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

tok('NONNUMERICIDENTIFIER')
src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

tok('MAINVERSION')
src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')'

tok('MAINVERSIONLOOSE')
src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

tok('PRERELEASEIDENTIFIER')
src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
                            '|' + src[t.NONNUMERICIDENTIFIER] + ')'

tok('PRERELEASEIDENTIFIERLOOSE')
src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[t.NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

tok('PRERELEASE')
src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))'

tok('PRERELEASELOOSE')
src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

tok('BUILDIDENTIFIER')
src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

tok('BUILD')
src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
             '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

tok('FULL')
tok('FULLPLAIN')
src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
                  src[t.PRERELEASE] + '?' +
                  src[t.BUILD] + '?'

src[t.FULL] = '^' + src[t.FULLPLAIN] + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
tok('LOOSEPLAIN')
src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
                  src[t.PRERELEASELOOSE] + '?' +
                  src[t.BUILD] + '?'

tok('LOOSE')
src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$'

tok('GTLT')
src[t.GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
tok('XRANGEIDENTIFIERLOOSE')
src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
tok('XRANGEIDENTIFIER')
src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*'

tok('XRANGEPLAIN')
src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[t.PRERELEASE] + ')?' +
                   src[t.BUILD] + '?' +
                   ')?)?'

tok('XRANGEPLAINLOOSE')
src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[t.PRERELEASELOOSE] + ')?' +
                        src[t.BUILD] + '?' +
                        ')?)?'

tok('XRANGE')
src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$'
tok('XRANGELOOSE')
src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
tok('COERCE')
src[t.COERCE] = '(^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'
tok('COERCERTL')
re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g')

// Tilde ranges.
// Meaning is "reasonably at or greater than"
tok('LONETILDE')
src[t.LONETILDE] = '(?:~>?)'

tok('TILDETRIM')
src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+'
re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

tok('TILDE')
src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$'
tok('TILDELOOSE')
src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
tok('LONECARET')
src[t.LONECARET] = '(?:\\^)'

tok('CARETTRIM')
src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+'
re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g')
var caretTrimReplace = '$1^'

tok('CARET')
src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$'
tok('CARETLOOSE')
src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
tok('COMPARATORLOOSE')
src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$'
tok('COMPARATOR')
src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
tok('COMPARATORTRIM')
src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
                      '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
tok('HYPHENRANGE')
src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s*$'

tok('HYPHENRANGELOOSE')
src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
tok('STAR')
src[t.STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[t.LOOSE] : re[t.FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

SemVer.prototype.compareBuild = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  var i = 0
  do {
    var a = this.build[i]
    var b = other.build[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.compareBuild = compareBuild
function compareBuild (a, b, loose) {
  var versionA = new SemVer(a, loose)
  var versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(b, a, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1] !== undefined ? m[1] : ''
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY || version === ANY) {
    return true
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    if (this.value === '') {
      return true
    }
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    if (comp.value === '') {
      return true
    }
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[t.COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[t.CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
}

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true
  var remainingComparators = comparators.slice()
  var testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p + pr
    } else if (xm) {
      ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0' + pr +
        ' <' + M + '.' + (+m + 1) + '.0' + pr
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version, options) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  var match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    var next
    while ((next = re[t.COERCERTL].exec(version)) &&
      (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
          next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null) {
    return null
  }

  return parse(match[2] +
    '.' + (match[3] || '0') +
    '.' + (match[4] || '0'), options)
}


/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(219);


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(808);
var tls = __nccwpck_require__(404);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var events = __nccwpck_require__(361);
var assert = __nccwpck_require__(491);
var util = __nccwpck_require__(837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 707:
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ 859:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var crypto = __nccwpck_require__(113);

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};


/***/ }),

/***/ 824:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var rng = __nccwpck_require__(859);
var bytesToUuid = __nccwpck_require__(707);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ 491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 81:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 576:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 512:
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ 404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""));
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	matched(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
}
EReg.__name__ = true;
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
class IntIterator {
	constructor(min,max) {
		this.min = min;
		this.max = max;
	}
	hasNext() {
		return this.min < this.max;
	}
	next() {
		return this.min++;
	}
}
IntIterator.__name__ = true;
Math.__name__ = true;
class Reflect {
	static field(o,field) {
		try {
			return o[field];
		} catch( _g ) {
			return null;
		}
	}
	static fields(o) {
		let a = [];
		if(o != null) {
			let hasOwnProperty = Object.prototype.hasOwnProperty;
			for( var f in o ) {
			if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
				a.push(f);
			}
			}
		}
		return a;
	}
	static copy(o) {
		if(o == null) {
			return null;
		}
		let o2 = { };
		let _g = 0;
		let _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			let f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
		return o2;
	}
}
Reflect.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
	static parseInt(x) {
		if(x != null) {
			let _g = 0;
			let _g1 = x.length;
			while(_g < _g1) {
				let i = _g++;
				let c = x.charCodeAt(i);
				if(c <= 8 || c >= 14 && c != 32 && c != 45) {
					let nc = x.charCodeAt(i + 1);
					let v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
					if(isNaN(v)) {
						return null;
					} else {
						return v;
					}
				}
			}
		}
		return null;
	}
}
Std.__name__ = true;
class StringTools {
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
	static replace(s,sub,by) {
		return s.split(sub).join(by);
	}
	static hex(n,digits) {
		let s = "";
		while(true) {
			s = "0123456789ABCDEF".charAt(n & 15) + s;
			n >>>= 4;
			if(!(n > 0)) {
				break;
			}
		}
		if(digits != null) {
			while(s.length < digits) s = "0" + s;
		}
		return s;
	}
}
StringTools.__name__ = true;
class Sys {
	static systemName() {
		let _g = process.platform;
		switch(_g) {
		case "darwin":
			return "Mac";
		case "freebsd":
			return "BSD";
		case "linux":
			return "Linux";
		case "win32":
			return "Windows";
		default:
			return _g;
		}
	}
}
Sys.__name__ = true;
class coconut_data_helpers_Annex {
	constructor(target) {
		this.target = target;
		this.registry = new haxe_ds_ObjectMap();
	}
}
coconut_data_helpers_Annex.__name__ = true;
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:true,__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	unwrap() {
		return this.__nativeException;
	}
	get_native() {
		return this.__nativeException;
	}
	static caught(value) {
		if(((value) instanceof haxe_Exception)) {
			return value;
		} else if(((value) instanceof Error)) {
			return new haxe_Exception(value.message,null,value);
		} else {
			return new haxe_ValueException(value,null,value);
		}
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = true;
class haxe_Resource {
	static getString(name) {
		let _g = 0;
		let _g1 = haxe_Resource.content;
		while(_g < _g1.length) {
			let x = _g1[_g];
			++_g;
			if(x.name == name) {
				if(x.str != null) {
					return x.str;
				}
				return haxe_crypto_Base64.decode(x.data).toString();
			}
		}
		return null;
	}
}
haxe_Resource.__name__ = true;
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
	unwrap() {
		return this.value;
	}
}
haxe_ValueException.__name__ = true;
class haxe_io_Bytes {
	constructor(data) {
		this.length = data.byteLength;
		this.b = new Uint8Array(data);
		this.b.bufferValue = data;
		data.hxBytes = this;
		data.bytes = this.b;
	}
	getString(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		let s = "";
		let b = this.b;
		let i = pos;
		let max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			while(i < max) {
				let c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					let code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					let code = (c & 31) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else {
					let u = (c & 15) << 18 | (b[i++] & 127) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				let c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	toString() {
		return this.getString(0,this.length);
	}
	static ofString(s,encoding) {
		if(encoding == haxe_io_Encoding.RawNative) {
			let buf = new Uint8Array(s.length << 1);
			let _g = 0;
			let _g1 = s.length;
			while(_g < _g1) {
				let i = _g++;
				let c = s.charCodeAt(i);
				buf[i << 1] = c & 255;
				buf[i << 1 | 1] = c >> 8;
			}
			return new haxe_io_Bytes(buf.buffer);
		}
		let a = [];
		let i = 0;
		while(i < s.length) {
			let c = s.charCodeAt(i++);
			if(55296 <= c && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
			}
			if(c <= 127) {
				a.push(c);
			} else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			} else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			} else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
		return new haxe_io_Bytes(new Uint8Array(a).buffer);
	}
}
haxe_io_Bytes.__name__ = true;
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
class haxe_crypto_Base64 {
	static decode(str,complement) {
		if(complement == null) {
			complement = true;
		}
		if(complement) {
			while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
		}
		return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
	}
}
haxe_crypto_Base64.__name__ = true;
class haxe_crypto_BaseCode {
	constructor(base) {
		let len = base.length;
		let nbits = 1;
		while(len > 1 << nbits) ++nbits;
		if(nbits > 8 || len != 1 << nbits) {
			throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
		}
		this.base = base;
		this.nbits = nbits;
	}
	initTable() {
		let tbl = [];
		let _g = 0;
		while(_g < 256) tbl[_g++] = -1;
		let _g1 = 0;
		let _g2 = this.base.length;
		while(_g1 < _g2) {
			let i = _g1++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	decodeBytes(b) {
		let nbits = this.nbits;
		if(this.tbl == null) {
			this.initTable();
		}
		let tbl = this.tbl;
		let size = b.length * nbits >> 3;
		let out = new haxe_io_Bytes(new ArrayBuffer(size));
		let buf = 0;
		let curbits = 0;
		let pin = 0;
		let pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				let i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
}
haxe_crypto_BaseCode.__name__ = true;
class haxe_ds_IntMap {
	constructor() {
		this.h = { };
	}
}
haxe_ds_IntMap.__name__ = true;
class haxe_ds_ObjectMap {
	constructor() {
		this.h = { __keys__ : { }};
	}
}
haxe_ds_ObjectMap.__name__ = true;
var haxe_ds_Option = $hxEnums["haxe.ds.Option"] = { __ename__:true,__constructs__:null
	,Some: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.ds.Option",toString:$estr}; },$_._hx_name="Some",$_.__params__ = ["v"],$_)
	,None: {_hx_name:"None",_hx_index:1,__enum__:"haxe.ds.Option",toString:$estr}
};
haxe_ds_Option.__constructs__ = [haxe_ds_Option.Some,haxe_ds_Option.None];
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
class haxe_io_Path {
	static join(paths) {
		let _g = [];
		let _g1 = 0;
		while(_g1 < paths.length) {
			let v = paths[_g1];
			++_g1;
			if(v != null && v != "") {
				_g.push(v);
			}
		}
		if(_g.length == 0) {
			return "";
		}
		let path = _g[0];
		let _g2 = 1;
		let _g3 = _g.length;
		while(_g2 < _g3) {
			path = haxe_io_Path.addTrailingSlash(path);
			path += _g[_g2++];
		}
		return haxe_io_Path.normalize(path);
	}
	static normalize(path) {
		let slash = "/";
		path = path.split("\\").join(slash);
		if(path == slash) {
			return slash;
		}
		let target = [];
		let _g = 0;
		let _g1 = path.split(slash);
		while(_g < _g1.length) {
			let token = _g1[_g];
			++_g;
			if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
				target.pop();
			} else if(token == "") {
				if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
					target.push(token);
				}
			} else if(token != ".") {
				target.push(token);
			}
		}
		let acc_b = "";
		let colon = false;
		let slashes = false;
		let _g2_offset = 0;
		let _g2_s = target.join(slash);
		while(_g2_offset < _g2_s.length) {
			let s = _g2_s;
			let index = _g2_offset++;
			let c = s.charCodeAt(index);
			if(c >= 55296 && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
			}
			let c1 = c;
			if(c1 >= 65536) {
				++_g2_offset;
			}
			let c2 = c1;
			switch(c2) {
			case 47:
				if(!colon) {
					slashes = true;
				} else {
					let i = c2;
					colon = false;
					if(slashes) {
						acc_b += "/";
						slashes = false;
					}
					acc_b += String.fromCodePoint(i);
				}
				break;
			case 58:
				acc_b += ":";
				colon = true;
				break;
			default:
				let i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
		}
		return acc_b;
	}
	static addTrailingSlash(path) {
		if(path.length == 0) {
			return "/";
		}
		let c1 = path.lastIndexOf("/");
		let c2 = path.lastIndexOf("\\");
		if(c1 < c2) {
			if(c2 != path.length - 1) {
				return path + "\\";
			} else {
				return path;
			}
		} else if(c1 != path.length - 1) {
			return path + "/";
		} else {
			return path;
		}
	}
}
haxe_io_Path.__name__ = true;
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__];
				let con = e.__constructs__[o._hx_index];
				let n = con._hx_name;
				if(con.__params__) {
					s = s + "\t";
					return n + "(" + ((function($this) {
						var $r;
						let _g = [];
						{
							let _g1 = 0;
							let _g2 = con.__params__;
							while(true) {
								if(!(_g1 < _g2.length)) {
									break;
								}
								let p = _g2[_g1];
								_g1 = _g1 + 1;
								_g.push(js_Boot.__string_rec(o[p],s));
							}
						}
						$r = _g;
						return $r;
					}(this))).join(",") + ")";
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true;
var js_actions_Core = __nccwpck_require__(186);
var js_actions_Exec = __nccwpck_require__(514);
var js_actions_ToolCache = __nccwpck_require__(784);
var js_node_Fs = __nccwpck_require__(147);
function setup_$hashlink_Program_main() {
	let version = js_actions_Core.getInput("version");
	let _g = tink_semver_Constraint.parse(version.length == 0 || version == "latest" ? "*" : version);
	switch(_g._hx_index) {
	case 0:
		let _g1 = setup_$hashlink_Release.find(_g.data);
		switch(_g1._hx_index) {
		case 0:
			let release = _g1.v;
			new setup_$hashlink_Setup(release).install().handle(function(outcome) {
				switch(outcome._hx_index) {
				case 0:
					js_actions_Core.info("HashLink " + release.version + " successfully installed.");
					break;
				case 1:
					js_actions_Core.setFailed(outcome.failure.message);
					break;
				}
			});
			break;
		case 1:
			js_actions_Core.setFailed("No release matching the version constraint.");
			break;
		}
		break;
	case 1:
		js_actions_Core.setFailed("Invalid version constraint.");
		break;
	}
}
class tink_Url {
	static resolve(this1,that) {
		if(that.scheme != null) {
			return that;
		} else if(that.hosts[0] != null) {
			if(that.scheme != null) {
				return that;
			} else {
				let copy = Reflect.copy(that);
				copy.scheme = this1.scheme;
				return copy;
			}
		} else {
			let parts = { path : tink_url_Path.join(this1.path,that.path), payload : "", scheme : this1.scheme, query : that.query, auth : this1.auth, hosts : this1.hosts, hash : that.hash};
			tink_Url.makePayload(parts);
			return parts;
		}
	}
	static makePayload(parts) {
		let payload = "";
		let _g = parts.auth;
		let _g1 = parts.hosts;
		if(_g == null) {
			if(_g1.length != 0) {
				payload = "" + ("//" + _g1.join(","));
			}
		} else if(_g1.length == 0) {
			payload = "" + ("//" + (_g == null ? "null" : _g == null ? "" : "" + _g + "@"));
		} else {
			payload = "" + ("//" + (_g == null ? "null" : _g == null ? "" : "" + _g + "@") + _g1.join(","));
		}
		payload += parts.path == null ? "null" : parts.path;
		let _g2 = parts.query;
		if(_g2 != null) {
			payload += "?" + (_g2 == null ? "null" : _g2);
		}
		let _g3 = parts.hash;
		if(_g3 != null) {
			payload += "#" + _g3;
		}
		parts.payload = payload.toString();
	}
	static toString(this1) {
		if(this1.scheme == null) {
			return this1.payload;
		} else {
			return "" + this1.scheme + ":" + this1.payload;
		}
	}
	static fromString(s) {
		return tink_Url.parse(s);
	}
	static noop(_) {
	}
	static parse(s,onError) {
		while(true) {
			if(s == null) {
				s = "";
				onError = null;
				continue;
			}
			if(onError == null) {
				onError = tink_Url.noop;
			}
			s = StringTools.trim(s);
			if(s.startsWith("data:")) {
				return { scheme : "data", payload : HxOverrides.substr(s,5,null), hosts : []};
			}
			let FORMAT = new EReg("^(([a-zA-Z][a-zA-Z0-9\\-+.]*):)?((//(([^@/]+)@)?([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?)$","");
			let HOST = new EReg("^(\\[(.*)\\]|([^:]*))(:(.*))?$","");
			FORMAT.match(s);
			let hosts;
			let _g = FORMAT.matched(7);
			if(_g == null) {
				hosts = [];
			} else {
				let _g1 = [];
				let _g2 = 0;
				let _g3 = _g.split(",");
				while(_g2 < _g3.length) {
					let host = _g3[_g2];
					++_g2;
					HOST.match(host);
					let host1;
					let _g = HOST.matched(3);
					let _g4 = HOST.matched(2);
					if(_g4 == null) {
						host1 = _g;
					} else if(_g == null) {
						host1 = "[" + _g4 + "]";
					} else {
						onError("invalid host " + host);
						host1 = null;
					}
					let port;
					let _g5 = HOST.matched(5);
					if(_g5 == null) {
						port = null;
					} else {
						let _g = Std.parseInt(_g5);
						if(_g == null) {
							onError("invalid port " + _g5);
							port = null;
						} else {
							port = _g;
						}
					}
					_g1.push(tink_url_Host._new(host1,port));
				}
				hosts = _g1;
			}
			let path = FORMAT.matched(8);
			if(hosts.length > 0 && path.charAt(0) != "/") {
				path = "/" + path;
			}
			return { scheme : FORMAT.matched(2), payload : FORMAT.matched(3), hosts : hosts, auth : FORMAT.matched(6), path : tink_url_Path.ofString(path), query : FORMAT.matched(10), hash : FORMAT.matched(12)};
		}
	}
}
class tink_url_Host {
	static _new(name,port) {
		let this1;
		if(port == null) {
			this1 = name;
		} else if(port > 65535 || port <= 0) {
			throw haxe_Exception.thrown("Invalid port");
		} else {
			this1 = "" + name + ":" + port;
		}
		return this1;
	}
}
class tink_url_Path {
	static join(this1,that) {
		if(that == "") {
			return this1;
		} else if(that.charAt(0) == "/") {
			return that;
		} else if(this1.charAt(this1.length - 1) == "/") {
			return tink_url_Path.ofString(this1 + that);
		} else {
			let _g = this1.lastIndexOf("/");
			if(_g == -1) {
				return that;
			} else {
				return tink_url_Path.ofString(HxOverrides.substr(this1,0,_g + 1) + (that == null ? "null" : that));
			}
		}
	}
	static ofString(s) {
		return tink_url_Path.normalize(s);
	}
	static normalize(s) {
		s = StringTools.trim(StringTools.replace(s,"\\","/"));
		if(s == ".") {
			return "./";
		}
		let isDir = s.endsWith("/..") || s.endsWith("/") || s.endsWith("/.");
		let parts = [];
		let isAbsolute = s.startsWith("/");
		let up = 0;
		let _g = 0;
		let _g1 = s.split("/");
		while(_g < _g1.length) {
			let _g2 = StringTools.trim(_g1[_g++]);
			switch(_g2) {
			case "":
				break;
			case ".":
				break;
			case "..":
				if(parts.pop() == null) {
					++up;
				}
				break;
			default:
				parts.push(_g2);
			}
		}
		if(isAbsolute) {
			parts.unshift("");
		} else {
			let _g = 0;
			let _g1 = up;
			while(_g < _g1) {
				++_g;
				parts.unshift("..");
			}
		}
		if(isDir) {
			parts.push("");
		}
		return parts.join("/");
	}
}
class tink_pure_List {
	static first(this1,predicate) {
		let _g = new tink_pure_NodeIterator(this1);
		while(_g.list.length > 0) {
			let x = _g.next();
			if(predicate == null || predicate(x)) {
				return haxe_ds_Option.Some(x);
			}
		}
		return haxe_ds_Option.None;
	}
	static _new() {
		return null;
	}
	static fromArray(i) {
		let ret = null;
		let len = 0;
		let pos = i.length;
		while(pos-- > 0) ret = new tink_pure__$List_Node(++len,i[pos],ret == null ? tink_pure__$List_Node.EMPTY : [ret]);
		return ret;
	}
}
class tink_pure__$List_Node {
	constructor(length,value,tails) {
		this.value = value;
		this.length = length;
		this.tails = tails == null ? tink_pure__$List_Node.EMPTY : tails;
	}
}
tink_pure__$List_Node.__name__ = true;
class tink_json_BasicParser {
	constructor() {
		this.afterParsing = [];
		this.plugins = new tink_core_Annex(this);
	}
	init(source) {
		this.pos = 0;
		this.max = source.length;
		this.source = source;
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
	}
	parseString() {
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let e;
		if(this.source.charCodeAt(this.pos) == 34) {
			this.pos += 1;
			e = true;
		} else {
			e = false;
		}
		if(!e) {
			this.die("Expected " + "string");
		}
		return this.parseRestOfString();
	}
	parseRestOfString() {
		return this.slice(this.skipString(),this.pos - 1);
	}
	skipString() {
		let start = this.pos;
		while(true) {
			let _g = this.source.indexOf(tink_json_BasicParser.DBQT,this.pos);
			if(_g == -1) {
				this.die("unterminated string",start);
			} else {
				this.pos = _g + 1;
				let p = this.pos - 2;
				while(this.source.charCodeAt(p) == 92) --p;
				if((p - this.pos & 1) == 0) {
					break;
				}
			}
		}
		return start;
	}
	invalidNumber(start) {
		return this.die("Invalid number " + this.source.substring(start,this.pos),start);
	}
	skipNumber(c) {
		let start = this.pos - 1;
		let minus = c == 45;
		let digit = !minus;
		let zero = c == 48;
		let point = false;
		let e = false;
		let pm = false;
		let end = false;
		while(this.pos < this.max) {
			c = this.source.charCodeAt(this.pos++);
			switch(c) {
			case 43:case 45:
				if(!e || pm) {
					this.invalidNumber(start);
				}
				digit = false;
				pm = true;
				break;
			case 46:
				if(minus || point) {
					this.invalidNumber(start);
				}
				digit = false;
				point = true;
				break;
			case 48:
				if(zero && !point) {
					this.invalidNumber(start);
				}
				if(minus) {
					minus = false;
					zero = true;
				}
				digit = true;
				break;
			case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				if(zero && !point) {
					this.invalidNumber(start);
				}
				if(minus) {
					minus = false;
				}
				digit = true;
				zero = false;
				break;
			case 69:case 101:
				if(minus || zero || e) {
					this.invalidNumber(start);
				}
				digit = false;
				e = true;
				break;
			default:
				if(!digit) {
					this.invalidNumber(start);
				}
				this.pos--;
				end = true;
			}
			if(end) {
				break;
			}
		}
		return start;
	}
	slice(from,to) {
		return this.source.substring(from,to);
	}
	skipArray() {
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp;
		if(this.source.charCodeAt(this.pos) == 93) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(tmp) {
			return;
		}
		while(true) {
			this.skipValue();
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp;
			if(this.source.charCodeAt(this.pos) == 44) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				break;
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp1;
		if(this.source.charCodeAt(this.pos) == 93) {
			this.pos += 1;
			tmp1 = true;
		} else {
			tmp1 = false;
		}
		if(!tmp1) {
			this.die("Expected " + "]");
		}
	}
	skipValue() {
		let _g = this.source.charCodeAt(this.pos++);
		switch(_g) {
		case 34:
			this.skipString();
			break;
		case 91:
			this.skipArray();
			break;
		case 102:
			let tmp;
			if(this.source.charCodeAt(this.pos) == 97 && this.source.charCodeAt(this.pos + 1) == 108 && this.source.charCodeAt(this.pos + 2) == 115 && this.source.charCodeAt(this.pos + 3) == 101) {
				this.pos += 4;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "alse");
			}
			break;
		case 110:
			let tmp1;
			if(this.source.charCodeAt(this.pos) == 117 && this.source.charCodeAt(this.pos + 1) == 108 && this.source.charCodeAt(this.pos + 2) == 108) {
				this.pos += 3;
				tmp1 = true;
			} else {
				tmp1 = false;
			}
			if(!tmp1) {
				this.die("Expected " + "ull");
			}
			break;
		case 116:
			let tmp2;
			if(this.source.charCodeAt(this.pos) == 114 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 101) {
				this.pos += 3;
				tmp2 = true;
			} else {
				tmp2 = false;
			}
			if(!tmp2) {
				this.die("Expected " + "rue");
			}
			break;
		case 123:
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp3;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp3 = true;
			} else {
				tmp3 = false;
			}
			if(tmp3) {
				return;
			}
			while(true) {
				if(this.source.charCodeAt(this.pos++) != 34) {
					this.die("expected string",this.pos - 1);
				}
				this.skipString();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp;
				if(this.source.charCodeAt(this.pos) == 58) {
					this.pos += 1;
					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
					tmp = true;
				} else {
					tmp = false;
				}
				if(!tmp) {
					this.die("Expected " + ":");
				}
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp1;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp4;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				tmp4 = true;
			} else {
				tmp4 = false;
			}
			if(!tmp4) {
				this.die("Expected " + "}");
			}
			break;
		default:
			if(_g == 46 || _g == 45 || _g < 58 && _g > 47) {
				this.skipNumber(_g);
			} else {
				this.invalidChar(_g);
			}
		}
	}
	invalidChar(c) {
		return this.die("invalid char " + StringTools.hex(c,2),this.pos - 1);
	}
	die(s,pos,end) {
		if(end == null) {
			end = -1;
		}
		if(pos == null) {
			pos = -1;
		}
		if(pos == -1) {
			pos = this.pos;
			end = pos;
		} else if(end == -1) {
			end = this.pos;
		}
		if(end <= pos) {
			end = pos + 1;
		}
		let clip = function(s,maxLength,left) {
			if(s.length > maxLength) {
				if(left) {
					return "... " + HxOverrides.substr(s,s.length - maxLength,null);
				} else {
					return HxOverrides.substr(s,0,maxLength) + " ...";
				}
			} else {
				return s;
			}
		};
		let center = pos + end >> 1;
		return tink_core_TypedError.withData(422,s + (" at " + (end > pos + 1 ? "characters " + pos + " - " + end : "character " + pos) + " in " + (clip(this.source.substring(0,pos),20,true) + "  ---->  " + clip(this.source.substring(pos,center),20,false) + clip(this.source.substring(center,end),20,true) + "  <----  " + clip(this.source.substring(end,this.max),20,false))),{ source : this.source, start : pos, end : end},{ fileName : "tink/json/Parser.hx", lineNumber : 472, className : "tink.json.BasicParser", methodName : "die"}).throwSelf();
	}
}
tink_json_BasicParser.__name__ = true;
class tink_json_Parser0 extends tink_json_BasicParser {
	constructor() {
		super();
	}
	process0() {
		let _gthis = this;
		let cur = 0;
		let v_assets = null;
		let v_version = null;
		let hasv_version = false;
		let __start__ = this.pos;
		while(true) {
			let _g = this.source.charCodeAt(this.pos++);
			let _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					let _g = this.source.charCodeAt(this.pos++);
					let _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 97:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 115) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 115) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 116) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 115) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 34) {
											while(true) {
												let _g = this.source.charCodeAt(this.pos++);
												let _hx_tmp;
												if(_g == 58 == true) {
													break;
												} else {
													_hx_tmp = _g < 33;
													if(_hx_tmp != true) {
														this.die("expected " + ":");
													}
												}
											}
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											let v_assets1;
											if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
												this.pos += 4;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												v_assets1 = true;
											} else {
												v_assets1 = false;
											}
											if(v_assets1) {
												v_assets = null;
											} else {
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												let v_assets1;
												if(this.source.charCodeAt(this.pos) == 91) {
													this.pos += 1;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_assets1 = true;
												} else {
													v_assets1 = false;
												}
												if(!v_assets1) {
													this.die("Expected " + "[");
												}
												let __ret = [];
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												let v_assets2;
												if(this.source.charCodeAt(this.pos) == 93) {
													this.pos += 1;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_assets2 = true;
												} else {
													v_assets2 = false;
												}
												if(!v_assets2) {
													while(true) {
														__ret.push(new setup_$hashlink_ReleaseAsset(this.process1()));
														while(this.source.charCodeAt(this.pos) < 33) this.pos++;
														let v_assets;
														if(this.source.charCodeAt(this.pos) == 44) {
															this.pos += 1;
															while(this.source.charCodeAt(this.pos) < 33) this.pos++;
															v_assets = true;
														} else {
															v_assets = false;
														}
														if(!v_assets) {
															break;
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													let v_assets;
													if(this.source.charCodeAt(this.pos) == 93) {
														this.pos += 1;
														while(this.source.charCodeAt(this.pos) < 33) this.pos++;
														v_assets = true;
													} else {
														v_assets = false;
													}
													if(!v_assets) {
														this.die("Expected " + "]");
													}
												}
												v_assets = tink_pure_List.fromArray(__ret);
											}
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											let tmp;
											if(this.source.charCodeAt(this.pos) == 44) {
												this.pos += 1;
												tmp = true;
											} else {
												tmp = false;
											}
											if(!tmp) {
												break _hx_loop4;
											} else {
												continue;
											}
										}
									}
								}
							}
						}
					}
					break;
				case 118:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 114) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 115) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 105) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 111) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 110) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													let _g = this.source.charCodeAt(this.pos++);
													let _hx_tmp;
													if(_g == 58 == true) {
														break;
													} else {
														_hx_tmp = _g < 33;
														if(_hx_tmp != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												let this1 = this.parseString();
												v_version = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
												hasv_version = true;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												let tmp;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp = true;
												} else {
													tmp = false;
												}
												if(!tmp) {
													break _hx_loop4;
												} else {
													continue;
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					let _g = this.source.charCodeAt(this.pos++);
					let _hx_tmp;
					if(_g == 58 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp = true;
				} else {
					tmp = false;
				}
				if(!tmp) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		let __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { assets : v_assets, version : hasv_version ? v_version : __missing__("version")};
	}
	process1() {
		let _gthis = this;
		let cur = 0;
		let v_file = null;
		let hasv_file = false;
		let v_platform = null;
		let hasv_platform = false;
		let __start__ = this.pos;
		while(true) {
			let _g = this.source.charCodeAt(this.pos++);
			let _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					let _g = this.source.charCodeAt(this.pos++);
					let _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 102:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 105) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 108) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										let _g = this.source.charCodeAt(this.pos++);
										let _hx_tmp;
										if(_g == 58 == true) {
											break;
										} else {
											_hx_tmp = _g < 33;
											if(_hx_tmp != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									let this1 = this.parseString();
									v_file = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
									hasv_file = true;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									let tmp;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp = true;
									} else {
										tmp = false;
									}
									if(!tmp) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				case 112:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 108) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 97) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 116) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 102) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 111) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 114) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 109) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														let _g = this.source.charCodeAt(this.pos++);
														let _hx_tmp;
														if(_g == 58 == true) {
															break;
														} else {
															_hx_tmp = _g < 33;
															if(_hx_tmp != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													let this1 = this.parseString();
													let v = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
													switch(v) {
													case "Linux":case "Mac":case "Windows":
														v_platform = v;
														break;
													default:
														throw haxe_Exception.thrown(new tink_core_TypedError(422,"Unrecognized enum value: " + v + ". Accepted values are: " + new tink_json_Writer0().write(["Linux","Mac","Windows"]),{ fileName : "tink/json/macros/GenReader.hx", lineNumber : 454, className : "tink.json.Parser0", methodName : "process1"}));
													}
													hasv_platform = true;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													let tmp;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp = true;
													} else {
														tmp = false;
													}
													if(!tmp) {
														break _hx_loop4;
													} else {
														continue;
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					let _g = this.source.charCodeAt(this.pos++);
					let _hx_tmp;
					if(_g == 58 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp = true;
				} else {
					tmp = false;
				}
				if(!tmp) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		let __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { file : hasv_file ? v_file : __missing__("file"), platform : hasv_platform ? v_platform : __missing__("platform")};
	}
	parse(source) {
		if(this.afterParsing.length > 0) {
			this.afterParsing = [];
		}
		this.init(source);
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp;
		if(this.source.charCodeAt(this.pos) == 91) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			this.die("Expected " + "[");
		}
		let __ret = [];
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp1;
		if(this.source.charCodeAt(this.pos) == 93) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp1 = true;
		} else {
			tmp1 = false;
		}
		if(!tmp1) {
			while(true) {
				__ret.push(new setup_$hashlink_Release(this.process0()));
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
					tmp = true;
				} else {
					tmp = false;
				}
				if(!tmp) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp;
			if(this.source.charCodeAt(this.pos) == 93) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "]");
			}
		}
		let _g = 0;
		let _g1 = this.afterParsing;
		while(_g < _g1.length) _g1[_g++]();
		if(this.afterParsing.length > 0) {
			this.afterParsing = [];
		}
		return __ret;
	}
}
tink_json_Parser0.__name__ = true;
class tink_core_Annex {
	constructor(target) {
		this.target = target;
		this.registry = new haxe_ds_ObjectMap();
	}
}
tink_core_Annex.__name__ = true;
class setup_$hashlink_Release {
	constructor(__coco_init) {
		let _gthis = this;
		let before = tink_state_internal_AutoObservable.cur;
		tink_state_internal_AutoObservable.cur = null;
		let ret = new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			let _g = _gthis.getAsset(Sys.systemName());
			let compute;
			switch(_g._hx_index) {
			case 0:
				compute = tink_Url.fromString("releases/download/" + tink_state_Observable.get_value(_gthis.__coco_tag) + "/" + _g.v.file);
				break;
			case 1:
				compute = tink_Url.fromString("archive/refs/tags/" + tink_state_Observable.get_value(_gthis.__coco_tag) + ".zip");
				break;
			}
			return tink_Url.resolve(setup_$hashlink_Release.baseUrl,compute);
		}),null,null);
		tink_state_internal_AutoObservable.cur = before;
		this.__coco_url = ret;
		let before1 = tink_state_internal_AutoObservable.cur;
		tink_state_internal_AutoObservable.cur = null;
		let ret1 = new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			let semver = tink_core_OutcomeTools.sure(tink_semver_Version.parse(_gthis.version));
			let tag = "" + semver.major + "." + semver.minor;
			if(semver.patch > 0) {
				return "" + tag + "." + semver.patch;
			} else {
				return tag;
			}
		}),null,null);
		tink_state_internal_AutoObservable.cur = before1;
		this.__coco_tag = ret1;
		let before2 = tink_state_internal_AutoObservable.cur;
		tink_state_internal_AutoObservable.cur = null;
		let ret2 = new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			return _gthis.getAsset(Sys.systemName()) == haxe_ds_Option.None;
		}),null,null);
		tink_state_internal_AutoObservable.cur = before2;
		this.__coco_isSource = ret2;
		let before3 = tink_state_internal_AutoObservable.cur;
		tink_state_internal_AutoObservable.cur = null;
		let ret3 = new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			let ret = false;
			let _g = new tink_pure_NodeIterator(setup_$hashlink_Release.data);
			while(_g.list.length > 0) if(_g.next().version == _gthis.version) {
				ret = true;
				break;
			}
			return ret;
		}),null,null);
		tink_state_internal_AutoObservable.cur = before3;
		this.__coco_exists = ret3;
		let _g = __coco_init.assets;
		this.assets = _g == null ? tink_pure_List._new() : _g;
		this.version = __coco_init.version;
		this.__coco_transitionCount = tink_state_State._new(0);
		this.errorTrigger = tink_core_Signal.trigger();
		this.transitionErrors = this.errorTrigger;
		this.annex = new coconut_data_helpers_Annex(this);
		this.observables = { assets : new tink_state__$Observable_ConstObservable(this.assets,null), exists : this.__coco_exists, isSource : this.__coco_isSource, tag : this.__coco_tag, url : this.__coco_url, version : new tink_state__$Observable_ConstObservable(this.version,null), isInTransition : tink_state_Observable.map(this.__coco_transitionCount,tink_state__$Observable_Transform.plain(function(count) {
			return count > 0;
		}))};
	}
	getAsset(platform) {
		return tink_pure_List.first(this.assets,function(asset) {
			return asset.platform == platform;
		});
	}
	static find(constraint) {
		return tink_pure_List.first(setup_$hashlink_Release.data,function(release) {
			return tink_semver_Constraint.matches(constraint,tink_core_OutcomeTools.sure(tink_semver_Version.parse(release.version)));
		});
	}
}
setup_$hashlink_Release.__name__ = true;
class setup_$hashlink_ReleaseAsset {
	constructor(__coco_init) {
		this.file = __coco_init.file;
		this.platform = __coco_init.platform;
		this.__coco_transitionCount = tink_state_State._new(0);
		this.errorTrigger = tink_core_Signal.trigger();
		this.transitionErrors = this.errorTrigger;
		this.annex = new coconut_data_helpers_Annex(this);
		this.observables = { file : new tink_state__$Observable_ConstObservable(this.file,null), platform : new tink_state__$Observable_ConstObservable(this.platform,null), isInTransition : tink_state_Observable.map(this.__coco_transitionCount,tink_state__$Observable_Transform.plain(function(count) {
			return count > 0;
		}))};
	}
}
setup_$hashlink_ReleaseAsset.__name__ = true;
class setup_$hashlink_Setup {
	constructor(release) {
		this.release = release;
	}
	download() {
		let cache;
		let _gthis = this;
		return tink_core_Promise.next(tink_core_Promise.next(tink_core_Promise.next(tink_core_Future.ofJsPromise(js_actions_ToolCache.downloadTool(tink_Url.toString(tink_state_Observable.get_value(this.release.__coco_url)))),function(file) {
			return tink_core_Future.ofJsPromise(js_actions_ToolCache.extractZip(file));
		}),function(path) {
			cache = path;
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(_gthis.findSubfolder(path)));
		}),function(name) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(_gthis.normalizeSeparator(haxe_io_Path.join([cache,name])))));
		});
	}
	install() {
		let cache = js_actions_ToolCache.find("hashlink",this.release.version);
		let _gthis = this;
		return tink_core_Promise.next(tink_core_Promise.next(cache.length > 0 ? new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(cache))) : tink_core_Promise.next(this.download(),function(path) {
			return tink_core_Future.ofJsPromise(js_actions_ToolCache.cacheDir(path,"hashlink",_gthis.release.version));
		}),function(path) {
			if(tink_state_Observable.get_value(_gthis.release.__coco_isSource)) {
				return _gthis.compile(path);
			} else {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(path)));
			}
		}),function(path) {
			let resolvedPath = _gthis.normalizeSeparator(path);
			js_actions_Core.addPath(tink_state_Observable.get_value(_gthis.release.__coco_isSource) ? haxe_io_Path.join([resolvedPath,"bin"]) : resolvedPath);
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(resolvedPath)));
		});
	}
	compile(directory) {
		let platform = Sys.systemName();
		if(!["Linux","Mac"].includes(platform)) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(405,"Compilation is not supported on " + platform + " platform.",{ fileName : "src/setup_hashlink/Setup.hx", lineNumber : 52, className : "setup_hashlink.Setup", methodName : "compile"}))));
		}
		let workingDirectory = haxe_io_Path.addTrailingSlash(process.cwd());
		process.chdir(directory);
		let _this = platform == "Linux" ? this.getLinuxCommands() : this.getMacOsCommands();
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = tink_core_Future.ofJsPromise(js_actions_Exec.exec(_this[i]));
		}
		return tink_core_Promise.next(tink_core_Promise.inSequence(result),function(_) {
			process.chdir(workingDirectory);
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success("/usr/local")));
		});
	}
	findSubfolder(directory) {
		let _this = js_node_Fs.readdirSync(directory);
		let _g = [];
		let _g1 = 0;
		while(_g1 < _this.length) {
			let v = _this[_g1];
			++_g1;
			if(sys_FileSystem.isDirectory(haxe_io_Path.join([directory,v]))) {
				_g.push(v);
			}
		}
		switch(_g.length) {
		case 0:
			return tink_core_Outcome.Failure(new tink_core_TypedError(404,"No subfolder found in: " + directory + ".",{ fileName : "src/setup_hashlink/Setup.hx", lineNumber : 64, className : "setup_hashlink.Setup", methodName : "findSubfolder"}));
		case 1:
			return tink_core_Outcome.Success(_g[0]);
		default:
			return tink_core_Outcome.Failure(new tink_core_TypedError(409,"Multiple subfolders found in: " + directory + ".",{ fileName : "src/setup_hashlink/Setup.hx", lineNumber : 66, className : "setup_hashlink.Setup", methodName : "findSubfolder"}));
		}
	}
	getLinuxCommands() {
		return ["sudo apt-get update","sudo apt-get install --assume-yes --no-install-recommends " + ["libmbedtls-dev","libopenal-dev","libpng-dev","libsdl2-dev","libturbojpeg0-dev","libuv1-dev","libvorbis-dev"].join(" "),"make","sudo make install","sudo ldconfig","export LD_LIBRARY_PATH=/usr/local/lib"];
	}
	getMacOsCommands() {
		return ["brew bundle","make","sudo make install"];
	}
	normalizeSeparator(path) {
		if(Sys.systemName() == "Windows") {
			return StringTools.replace(path,"/","\\");
		} else {
			return path;
		}
	}
}
setup_$hashlink_Setup.__name__ = true;
class sys_FileSystem {
	static isDirectory(path) {
		try {
			return js_node_Fs.statSync(path).isDirectory();
		} catch( _g ) {
			return false;
		}
	}
}
sys_FileSystem.__name__ = true;
class tink_core_Callback {
	static invoke(this1,data) {
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			this1(data);
			tink_core_Callback.depth--;
		} else {
			tink_core_Callback.defer(function() {
				this1(data);
			});
		}
	}
	static defer(f) {
		process.nextTick(f);
	}
}
class tink_core_CallbackLinkRef {
	constructor() {
	}
	cancel() {
		let this1 = this.link;
		if(this1 != null) {
			this1.cancel();
		}
	}
}
tink_core_CallbackLinkRef.__name__ = true;
class tink_core_CallbackLink {
	static fromMany(callbacks) {
		return new tink_core_SimpleLink(function() {
			if(callbacks != null) {
				let _g = 0;
				while(_g < callbacks.length) {
					let cb = callbacks[_g];
					++_g;
					if(cb != null) {
						cb.cancel();
					}
				}
			} else {
				callbacks = null;
			}
		});
	}
}
class tink_core_SimpleLink {
	constructor(f) {
		this.f = f;
	}
	cancel() {
		if(this.f != null) {
			this.f();
			this.f = null;
		}
	}
}
tink_core_SimpleLink.__name__ = true;
class tink_core__$Callback_LinkPair {
	constructor(a,b) {
		this.dissolved = false;
		this.a = a;
		this.b = b;
	}
	cancel() {
		if(!this.dissolved) {
			this.dissolved = true;
			let this1 = this.a;
			if(this1 != null) {
				this1.cancel();
			}
			let this2 = this.b;
			if(this2 != null) {
				this2.cancel();
			}
			this.a = null;
			this.b = null;
		}
	}
}
tink_core__$Callback_LinkPair.__name__ = true;
class tink_core__$Callback_ListCell {
	constructor(cb,list) {
		if(cb == null) {
			throw haxe_Exception.thrown("callback expected but null received");
		}
		this.cb = cb;
		this.list = list;
	}
	cancel() {
		if(this.list != null) {
			let list = this.list;
			this.cb = null;
			this.list = null;
			if(--list.used <= list.cells.length >> 1) {
				list.compact();
			}
		}
	}
}
tink_core__$Callback_ListCell.__name__ = true;
class tink_core_SimpleDisposable {
	constructor(dispose) {
		if(tink_core_SimpleDisposable._hx_skip_constructor) {
			return;
		}
		this._hx_constructor(dispose);
	}
	_hx_constructor(dispose) {
		this.disposeHandlers = [];
		this.f = dispose;
	}
	dispose() {
		let _g = this.disposeHandlers;
		if(_g != null) {
			this.disposeHandlers = null;
			let f = this.f;
			this.f = tink_core_SimpleDisposable.noop;
			f();
			let _g1 = 0;
			while(_g1 < _g.length) _g[_g1++]();
		}
	}
	static noop() {
	}
}
tink_core_SimpleDisposable.__name__ = true;
class tink_core_CallbackList extends tink_core_SimpleDisposable {
	constructor(destructive) {
		tink_core_SimpleDisposable._hx_skip_constructor = true;
		super();
		tink_core_SimpleDisposable._hx_skip_constructor = false;
		this._hx_constructor(destructive);
	}
	_hx_constructor(destructive) {
		if(destructive == null) {
			destructive = false;
		}
		this.onfill = function() {
		};
		this.ondrain = function() {
		};
		this.busy = false;
		this.queue = [];
		this.used = 0;
		let _gthis = this;
		super._hx_constructor(function() {
			if(!_gthis.busy) {
				_gthis.destroy();
			}
		});
		this.destructive = destructive;
		this.cells = [];
	}
	destroy() {
		let _g = 0;
		let _g1 = this.cells;
		while(_g < _g1.length) {
			let c = _g1[_g];
			++_g;
			c.cb = null;
			c.list = null;
		}
		this.queue = null;
		this.cells = null;
		if(this.used > 0) {
			this.used = 0;
			let fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		}
	}
	invoke(data) {
		let _gthis = this;
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			if(_gthis.disposeHandlers != null) {
				if(_gthis.busy) {
					if(_gthis.destructive != true) {
						let _g = $bind(_gthis,_gthis.invoke);
						let data1 = data;
						let tmp = function() {
							_g(data1);
						};
						_gthis.queue.push(tmp);
					}
				} else {
					_gthis.busy = true;
					if(_gthis.destructive) {
						_gthis.dispose();
					}
					let length = _gthis.cells.length;
					let _g = 0;
					while(_g < length) {
						let _this = _gthis.cells[_g++];
						if(_this.list != null) {
							_this.cb(data);
						}
					}
					_gthis.busy = false;
					if(_gthis.disposeHandlers == null) {
						_gthis.destroy();
					} else {
						if(_gthis.used < _gthis.cells.length) {
							_gthis.compact();
						}
						if(_gthis.queue.length > 0) {
							(_gthis.queue.shift())();
						}
					}
				}
			}
			tink_core_Callback.depth--;
		} else {
			tink_core_Callback.defer(function() {
				if(_gthis.disposeHandlers != null) {
					if(_gthis.busy) {
						if(_gthis.destructive != true) {
							let _g = $bind(_gthis,_gthis.invoke);
							let data1 = data;
							let tmp = function() {
								_g(data1);
							};
							_gthis.queue.push(tmp);
						}
					} else {
						_gthis.busy = true;
						if(_gthis.destructive) {
							_gthis.dispose();
						}
						let length = _gthis.cells.length;
						let _g = 0;
						while(_g < length) {
							let _this = _gthis.cells[_g++];
							if(_this.list != null) {
								_this.cb(data);
							}
						}
						_gthis.busy = false;
						if(_gthis.disposeHandlers == null) {
							_gthis.destroy();
						} else {
							if(_gthis.used < _gthis.cells.length) {
								_gthis.compact();
							}
							if(_gthis.queue.length > 0) {
								(_gthis.queue.shift())();
							}
						}
					}
				}
			});
		}
	}
	compact() {
		if(this.busy) {
			return;
		} else if(this.used == 0) {
			this.resize(0);
			let fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		} else {
			let compacted = 0;
			let _g = 0;
			let _g1 = this.cells.length;
			while(_g < _g1) {
				let i = _g++;
				let _g1 = this.cells[i];
				if(_g1.cb != null) {
					if(compacted != i) {
						this.cells[compacted] = _g1;
					}
					if(++compacted == this.used) {
						break;
					}
				}
			}
			this.resize(this.used);
		}
	}
	resize(length) {
		this.cells.length = length;
	}
}
tink_core_CallbackList.__name__ = true;
class tink_core_TypedError {
	constructor(code,message,pos) {
		if(code == null) {
			code = 500;
		}
		this.isTinkError = true;
		this.code = code;
		this.message = message;
		this.pos = pos;
		this.exceptionStack = [];
		this.callStack = [];
	}
	printPos() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	toString() {
		let ret = "Error#" + this.code + ": " + this.message;
		if(this.pos != null) {
			ret += " @ " + this.printPos();
		}
		return ret;
	}
	throwSelf() {
		throw haxe_Exception.thrown(this);
	}
	static withData(code,message,data,pos) {
		return tink_core_TypedError.typed(code,message,data,pos);
	}
	static typed(code,message,data,pos) {
		let ret = new tink_core_TypedError(code,message,pos);
		ret.data = data;
		return ret;
	}
	static asError(v) {
		if(v != null && v.isTinkError) {
			return v;
		} else {
			return null;
		}
	}
	static catchExceptions(f,report,pos) {
		try {
			return tink_core_Outcome.Success(f());
		} catch( _g ) {
			let e = tink_core_TypedError.asError(haxe_Exception.caught(_g).unwrap());
			return tink_core_Outcome.Failure(e == null ? report == null ? tink_core_TypedError.withData(null,"Unexpected Error",e,pos) : report(e) : e);
		}
	}
}
tink_core_TypedError.__name__ = true;
class tink_core__$Future_NeverFuture {
	constructor() {
	}
	getStatus() {
		return tink_core_FutureStatus.NeverEver;
	}
	handle(callback) {
		return null;
	}
}
tink_core__$Future_NeverFuture.__name__ = true;
class tink_core__$Lazy_LazyConst {
	constructor(value) {
		this.value = value;
	}
	get() {
		return this.value;
	}
	compute() {
	}
}
tink_core__$Lazy_LazyConst.__name__ = true;
class tink_core__$Future_SyncFuture {
	constructor(value) {
		this.value = value;
	}
	getStatus() {
		return tink_core_FutureStatus.Ready(this.value);
	}
	handle(cb) {
		tink_core_Callback.invoke(cb,tink_core_Lazy.get(this.value));
		return null;
	}
}
tink_core__$Future_SyncFuture.__name__ = true;
class tink_core_Future {
	static flatMap(this1,next,gather) {
		let _g = this1.getStatus();
		switch(_g._hx_index) {
		case 3:
			let l = _g.result;
			return new tink_core__$Future_SuspendableFuture(function(fire) {
				return next(tink_core_Lazy.get(l)).handle(function(v) {
					fire(v);
				});
			});
		case 4:
			return tink_core_Future.NEVER;
		default:
			return new tink_core__$Future_SuspendableFuture(function($yield) {
				let inner = new tink_core_CallbackLinkRef();
				return new tink_core__$Callback_LinkPair(this1.handle(function(v) {
					let outer = next(v).handle($yield);
					inner.link = outer;
				}),inner);
			});
		}
	}
	static ofJsPromise(promise) {
		return tink_core_Future.irreversible(function(cb) {
			promise.then(function(a) {
				let _g = cb;
				let a1 = tink_core_Outcome.Success(a);
				tink_core_Callback.defer(function() {
					_g(a1);
				});
			},function(e) {
				cb(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,e.message,e,{ fileName : "tink/core/Future.hx", lineNumber : 158, className : "tink.core._Future.Future_Impl_", methodName : "ofJsPromise"})));
			});
		});
	}
	static processMany(a,concurrency,fn,lift) {
		if(a.length == 0) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(lift(tink_core_Outcome.Success([]))));
		} else {
			return new tink_core__$Future_SuspendableFuture(function($yield) {
				let links = [];
				let _g = [];
				let _g1 = 0;
				while(_g1 < a.length) {
					++_g1;
					_g.push(null);
				}
				let ret = _g;
				let index = 0;
				let pending = 0;
				let done = false;
				let concurrency1;
				if(concurrency == null) {
					concurrency1 = a.length;
				} else {
					let v = concurrency;
					concurrency1 = v < 1 ? 1 : v > a.length ? a.length : v;
				}
				let fireWhenReady = function() {
					if(index == ret.length) {
						if(pending == 0) {
							let v = lift(tink_core_Outcome.Success(ret));
							done = true;
							$yield(v);
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				};
				let step = null;
				step = function() {
					if(!done && !fireWhenReady()) {
						while(index < ret.length) {
							index += 1;
							let index1 = index - 1;
							let p = a[index1];
							let check = function(o) {
								let _g = fn(o);
								switch(_g._hx_index) {
								case 0:
									ret[index1] = _g.data;
									fireWhenReady();
									break;
								case 1:
									let _g1 = _g.failure;
									let _g2 = 0;
									while(_g2 < links.length) {
										let l = links[_g2];
										++_g2;
										if(l != null) {
											l.cancel();
										}
									}
									let v = lift(tink_core_Outcome.Failure(_g1));
									done = true;
									$yield(v);
									break;
								}
							};
							let _g = p.getStatus();
							if(_g._hx_index == 3) {
								let _hx_tmp;
								_hx_tmp = tink_core_Lazy.get(_g.result);
								check(_hx_tmp);
								if(!done) {
									continue;
								}
							} else {
								pending += 1;
								links.push(p.handle(function(o) {
									pending -= 1;
									check(o);
									if(!done) {
										step();
									}
								}));
							}
							break;
						}
					}
				};
				let _g2 = 0;
				let _g3 = concurrency1;
				while(_g2 < _g3) {
					++_g2;
					step();
				}
				return tink_core_CallbackLink.fromMany(links);
			});
		}
	}
	static irreversible(init) {
		return new tink_core__$Future_SuspendableFuture(function($yield) {
			init($yield);
			return null;
		});
	}
}
var tink_core_FutureStatus = $hxEnums["tink.core.FutureStatus"] = { __ename__:true,__constructs__:null
	,Suspended: {_hx_name:"Suspended",_hx_index:0,__enum__:"tink.core.FutureStatus",toString:$estr}
	,Awaited: {_hx_name:"Awaited",_hx_index:1,__enum__:"tink.core.FutureStatus",toString:$estr}
	,EagerlyAwaited: {_hx_name:"EagerlyAwaited",_hx_index:2,__enum__:"tink.core.FutureStatus",toString:$estr}
	,Ready: ($_=function(result) { return {_hx_index:3,result:result,__enum__:"tink.core.FutureStatus",toString:$estr}; },$_._hx_name="Ready",$_.__params__ = ["result"],$_)
	,NeverEver: {_hx_name:"NeverEver",_hx_index:4,__enum__:"tink.core.FutureStatus",toString:$estr}
};
tink_core_FutureStatus.__constructs__ = [tink_core_FutureStatus.Suspended,tink_core_FutureStatus.Awaited,tink_core_FutureStatus.EagerlyAwaited,tink_core_FutureStatus.Ready,tink_core_FutureStatus.NeverEver];
class tink_core__$Future_SuspendableFuture {
	constructor(wakeup) {
		this.status = tink_core_FutureStatus.Suspended;
		this.wakeup = wakeup;
		this.callbacks = new tink_core_CallbackList(true);
		let _gthis = this;
		this.callbacks.ondrain = function() {
			if(_gthis.status == tink_core_FutureStatus.Awaited) {
				_gthis.status = tink_core_FutureStatus.Suspended;
				let this1 = _gthis.link;
				if(this1 != null) {
					this1.cancel();
				}
				_gthis.link = null;
			}
		};
		this.callbacks.onfill = function() {
			if(_gthis.status == tink_core_FutureStatus.Suspended) {
				_gthis.status = tink_core_FutureStatus.Awaited;
				_gthis.arm();
			}
		};
	}
	getStatus() {
		return this.status;
	}
	trigger(value) {
		if(this.status._hx_index != 3) {
			this.status = tink_core_FutureStatus.Ready(new tink_core__$Lazy_LazyConst(value));
			let link = this.link;
			this.link = null;
			this.wakeup = null;
			this.callbacks.invoke(value);
			if(link != null) {
				link.cancel();
			}
		}
	}
	handle(callback) {
		let _g = this.status;
		if(_g._hx_index == 3) {
			tink_core_Callback.invoke(callback,tink_core_Lazy.get(_g.result));
			return null;
		} else {
			let _this = this.callbacks;
			if(_this.disposeHandlers == null) {
				return null;
			} else {
				let node = new tink_core__$Callback_ListCell(callback,_this);
				_this.cells.push(node);
				if(_this.used++ == 0) {
					let fn = _this.onfill;
					if(tink_core_Callback.depth < 500) {
						tink_core_Callback.depth++;
						fn();
						tink_core_Callback.depth--;
					} else {
						tink_core_Callback.defer(fn);
					}
				}
				return node;
			}
		}
	}
	arm() {
		let _gthis = this;
		this.link = this.wakeup(function(x) {
			_gthis.trigger(x);
		});
	}
}
tink_core__$Future_SuspendableFuture.__name__ = true;
class tink_core_Lazy {
	static get(this1) {
		this1.compute();
		return this1.get();
	}
}
class tink_core_NamedWith {
}
tink_core_NamedWith.__name__ = true;
var tink_core_Outcome = $hxEnums["tink.core.Outcome"] = { __ename__:true,__constructs__:null
	,Success: ($_=function(data) { return {_hx_index:0,data:data,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Success",$_.__params__ = ["data"],$_)
	,Failure: ($_=function(failure) { return {_hx_index:1,failure:failure,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Failure",$_.__params__ = ["failure"],$_)
};
tink_core_Outcome.__constructs__ = [tink_core_Outcome.Success,tink_core_Outcome.Failure];
class tink_core_OutcomeTools {
	static sure(outcome) {
		switch(outcome._hx_index) {
		case 0:
			return outcome.data;
		case 1:
			let _g = outcome.failure;
			let _g1 = tink_core_TypedError.asError(_g);
			if(_g1 == null) {
				throw haxe_Exception.thrown(_g);
			} else {
				return _g1.throwSelf();
			}
			break;
		}
	}
}
tink_core_OutcomeTools.__name__ = true;
class tink_core_Promise {
	static next(this1,f,gather) {
		return tink_core_Future.flatMap(this1,function(o) {
			switch(o._hx_index) {
			case 0:
				return f(o.data);
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(o.failure)));
			}
		});
	}
	static many(a,concurrency) {
		return tink_core_Future.processMany(a,concurrency,function(o) {
			return o;
		},function(o) {
			return o;
		});
	}
	static inSequence(a) {
		return tink_core_Promise.many(a,1);
	}
}
class tink_core_Signal {
	static trigger() {
		return new tink_core_SignalTrigger();
	}
}
class tink_core_SignalTrigger {
	constructor() {
	}
}
tink_core_SignalTrigger.__name__ = true;
class tink_json_JsonString {
}
var tink_json_Value = $hxEnums["tink.json.Value"] = { __ename__:true,__constructs__:null
	,VNumber: ($_=function(f) { return {_hx_index:0,f:f,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VNumber",$_.__params__ = ["f"],$_)
	,VString: ($_=function(s) { return {_hx_index:1,s:s,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VString",$_.__params__ = ["s"],$_)
	,VNull: {_hx_name:"VNull",_hx_index:2,__enum__:"tink.json.Value",toString:$estr}
	,VBool: ($_=function(b) { return {_hx_index:3,b:b,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VBool",$_.__params__ = ["b"],$_)
	,VArray: ($_=function(a) { return {_hx_index:4,a:a,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VArray",$_.__params__ = ["a"],$_)
	,VObject: ($_=function(a) { return {_hx_index:5,a:a,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VObject",$_.__params__ = ["a"],$_)
};
tink_json_Value.__constructs__ = [tink_json_Value.VNumber,tink_json_Value.VString,tink_json_Value.VNull,tink_json_Value.VBool,tink_json_Value.VArray,tink_json_Value.VObject];
class tink_json_BasicWriter {
	constructor() {
		this.plugins = new tink_core_Annex(this);
	}
	init() {
		this.buf = "";
	}
}
tink_json_BasicWriter.__name__ = true;
class tink_json_Writer0 extends tink_json_BasicWriter {
	constructor() {
		super();
	}
	write(value) {
		this.init();
		this.buf += String.fromCodePoint(91);
		let first = true;
		let _g = 0;
		while(_g < value.length) {
			let value1 = value[_g++];
			if(first) {
				first = false;
			} else {
				this.buf += String.fromCodePoint(44);
			}
			let s = JSON.stringify(value1);
			this.buf += s;
		}
		this.buf += String.fromCodePoint(93);
		return this.buf.toString();
	}
}
tink_json_Writer0.__name__ = true;
class tink_parse_Char {
	static ofRange(i) {
		let ret = new Array(256);
		if(i.max > 256) {
			i = new IntIterator(i.min,256);
		}
		let _g = i;
		while(_g.min < _g.max) ret[_g.min++] = true;
		return ret;
	}
	static oneOf(chars) {
		let ret = new Array(256);
		let _g = 0;
		while(_g < chars.length) ret[chars[_g++]] = true;
		return ret;
	}
	static ofCode(c) {
		let _g = tink_parse_Char.byInt.h[c];
		if(_g == null) {
			let this1 = tink_parse_Char.byInt;
			let ret = new Array(256);
			ret[c] = true;
			let v = ret;
			this1.h[c] = v;
			return v;
		} else {
			return _g;
		}
	}
}
class tink_parse_ParserBase {
	constructor(source,reporter,offset) {
		if(offset == null) {
			offset = 0;
		}
		this.source = source;
		this.max = source.length;
		this.pos = 0;
		this.reporter = reporter;
		this.offset = offset;
	}
	skipIgnored() {
		while(this.lastSkip != this.pos) {
			this.lastSkip = this.pos;
			this.doSkipIgnored();
		}
		this.lastSkip = this.pos;
		return null;
	}
	doSkipIgnored() {
	}
	allow(s) {
		this.skipIgnored();
		return this.allowHere(s);
	}
	allowHere(s) {
		if(tink_parse_StringSlice.hasSub(this.source,s,this.pos)) {
			this.pos += s.length;
			return true;
		} else {
			return false;
		}
	}
	die(message,range) {
		if(range == null) {
			range = new IntIterator(this.pos,this.pos + 1);
		}
		let from = range.min;
		let to = range.max;
		let pos = this.reporter.makePos(this.offset + from,this.offset + (to == null ? from + 1 : to));
		throw haxe_Exception.thrown(this.reporter.makeError(message,pos));
	}
}
tink_parse_ParserBase.__name__ = true;
class tink_parse__$StringSlice_Data {
	constructor(string,start,end) {
		this.string = string;
		this.start = start;
		this.end = end;
		if((this.length = end - start) < 0) {
			this.length = 0;
			this.end = this.start;
		}
	}
	toString() {
		if(this.representation == null) {
			this.representation = this.string.substring(this.start,this.end);
		}
		return this.representation;
	}
}
tink_parse__$StringSlice_Data.__name__ = true;
class tink_parse_StringSlice {
	static _new(string,start,end) {
		return new tink_parse__$StringSlice_Data(string,start == string.length ? start : start < 0 ? start % string.length + string.length : start % string.length,end == string.length ? end : end < 0 ? end % string.length + string.length : end % string.length);
	}
	static clamp(this1,index) {
		if(index < 0) {
			if(-index > this1.length) {
				return 0;
			} else {
				return index + this1.length;
			}
		} else if(index > this1.length) {
			return this1.length;
		} else {
			return index;
		}
	}
	static wrap(this1,index) {
		if(index < 0) {
			return index + this1.length;
		} else {
			return index;
		}
	}
	static ofString(s) {
		if(s == null || s == "") {
			return tink_parse_StringSlice.EMPTY;
		} else if(s.length == 1) {
			let _g = s.charCodeAt(0);
			if(_g < tink_parse_StringSlice.CHARS.length) {
				return tink_parse_StringSlice.CHARS[_g];
			} else {
				return new tink_parse__$StringSlice_Data(s,0,s.length);
			}
		} else {
			return new tink_parse__$StringSlice_Data(s,0,s.length);
		}
	}
	static hasSub(this1,other,at) {
		if(at == null) {
			at = 0;
		}
		at = tink_parse_StringSlice.wrap(this1,at);
		if(at + other.length > this1.length) {
			return false;
		}
		let b = other;
		return tink_parse_StringSlice.isEqual(this1.string,this1.start + at,other.length,b.string,b.start,b.length);
	}
	static isEqual(s1,p1,l1,s2,p2,l2) {
		if(l2 != l1) {
			return false;
		}
		let _g = 0;
		while(_g < l2) {
			let i = _g++;
			if(s1.charCodeAt(p1 + i) != s2.charCodeAt(p2 + i)) {
				return false;
			}
		}
		return true;
	}
}
class tink_pure_NodeIterator {
	constructor(node) {
		this.list = [];
		if(node != null) {
			this.list.push(node);
		}
	}
	hasNext() {
		return this.list.length > 0;
	}
	next() {
		let _g = this.list.pop();
		if(_g == null) {
			return null;
		} else {
			let _g1 = -_g.tails.length;
			while(_g1 < 0) this.list.push(_g.tails[-(_g1++) - 1]);
			return _g.value;
		}
	}
}
tink_pure_NodeIterator.__name__ = true;
var tink_semver_Bound = $hxEnums["tink.semver.Bound"] = { __ename__:true,__constructs__:null
	,Unbounded: {_hx_name:"Unbounded",_hx_index:0,__enum__:"tink.semver.Bound",toString:$estr}
	,Exlusive: ($_=function(limit) { return {_hx_index:1,limit:limit,__enum__:"tink.semver.Bound",toString:$estr}; },$_._hx_name="Exlusive",$_.__params__ = ["limit"],$_)
	,Inclusive: ($_=function(limit) { return {_hx_index:2,limit:limit,__enum__:"tink.semver.Bound",toString:$estr}; },$_._hx_name="Inclusive",$_.__params__ = ["limit"],$_)
};
tink_semver_Bound.__constructs__ = [tink_semver_Bound.Unbounded,tink_semver_Bound.Exlusive,tink_semver_Bound.Inclusive];
class tink_semver_BoundTools {
	static isLowerThan(a,b) {
		switch(a._hx_index) {
		case 1:
			let _g = a.limit;
			switch(b._hx_index) {
			case 1:
				let _g1 = b.limit;
				if(tink_semver_Version.eq(_g,_g1)) {
					return false;
				} else if(tink_semver_Version.gt(_g,_g1)) {
					return false;
				} else {
					return true;
				}
				break;
			case 2:
				if(tink_semver_Version.gt(_g,b.limit)) {
					return false;
				} else {
					return true;
				}
				break;
			default:
				return true;
			}
			break;
		case 2:
			let _g2 = a.limit;
			switch(b._hx_index) {
			case 1:
				let _g3 = b.limit;
				if(tink_semver_Version.eq(_g2,_g3)) {
					return false;
				} else if(tink_semver_Version.gt(_g2,_g3)) {
					return false;
				} else {
					return true;
				}
				break;
			case 2:
				if(tink_semver_Version.gt(_g2,b.limit)) {
					return false;
				} else {
					return true;
				}
				break;
			default:
				return true;
			}
			break;
		default:
			return true;
		}
	}
	static min(a,b,kind) {
		switch(a._hx_index) {
		case 0:
			if(kind == tink_semver_ExtremumKind.Lower) {
				return tink_semver_Bound.Unbounded;
			} else {
				return b;
			}
			break;
		case 1:
			let _g = a.limit;
			switch(b._hx_index) {
			case 0:
				if(kind == tink_semver_ExtremumKind.Lower) {
					return tink_semver_Bound.Unbounded;
				} else {
					return a;
				}
				break;
			case 1:
				if(tink_semver_Version.lt(_g,b.limit)) {
					return a;
				} else {
					return b;
				}
				break;
			case 2:
				let _g1 = b.limit;
				if(tink_semver_Version.eq(_g,_g1)) {
					if(kind == tink_semver_ExtremumKind.Lower) {
						return b;
					} else {
						return a;
					}
				} else if(tink_semver_Version.lt(_g,_g1)) {
					return a;
				} else {
					return b;
				}
				break;
			}
			break;
		case 2:
			let _g2 = a.limit;
			switch(b._hx_index) {
			case 0:
				if(kind == tink_semver_ExtremumKind.Lower) {
					return tink_semver_Bound.Unbounded;
				} else {
					return a;
				}
				break;
			case 1:
				let _g3 = b.limit;
				if(tink_semver_Version.eq(_g3,_g2)) {
					if(kind == tink_semver_ExtremumKind.Lower) {
						return a;
					} else {
						return b;
					}
				} else if(tink_semver_Version.lt(_g2,_g3)) {
					return a;
				} else {
					return b;
				}
				break;
			case 2:
				if(tink_semver_Version.lt(_g2,b.limit)) {
					return a;
				} else {
					return b;
				}
				break;
			}
			break;
		}
	}
	static max(a,b,kind) {
		switch(a._hx_index) {
		case 0:
			if(kind == tink_semver_ExtremumKind.Upper) {
				return tink_semver_Bound.Unbounded;
			} else {
				return b;
			}
			break;
		case 1:
			let _g = a.limit;
			switch(b._hx_index) {
			case 0:
				if(kind == tink_semver_ExtremumKind.Upper) {
					return tink_semver_Bound.Unbounded;
				} else {
					return a;
				}
				break;
			case 1:
				if(tink_semver_Version.gt(_g,b.limit)) {
					return a;
				} else {
					return b;
				}
				break;
			case 2:
				let _g1 = b.limit;
				if(tink_semver_Version.eq(_g,_g1)) {
					if(kind == tink_semver_ExtremumKind.Upper) {
						return b;
					} else {
						return a;
					}
				} else if(tink_semver_Version.gt(_g,_g1)) {
					return a;
				} else {
					return b;
				}
				break;
			}
			break;
		case 2:
			let _g2 = a.limit;
			switch(b._hx_index) {
			case 0:
				if(kind == tink_semver_ExtremumKind.Upper) {
					return tink_semver_Bound.Unbounded;
				} else {
					return a;
				}
				break;
			case 1:
				let _g3 = b.limit;
				if(tink_semver_Version.eq(_g3,_g2)) {
					if(kind == tink_semver_ExtremumKind.Upper) {
						return a;
					} else {
						return b;
					}
				} else if(tink_semver_Version.gt(_g2,_g3)) {
					return a;
				} else {
					return b;
				}
				break;
			case 2:
				if(tink_semver_Version.gt(_g2,b.limit)) {
					return a;
				} else {
					return b;
				}
				break;
			}
			break;
		}
	}
}
tink_semver_BoundTools.__name__ = true;
var tink_semver_ExtremumKind = $hxEnums["tink.semver.ExtremumKind"] = { __ename__:true,__constructs__:null
	,Upper: {_hx_name:"Upper",_hx_index:0,__enum__:"tink.semver.ExtremumKind",toString:$estr}
	,Lower: {_hx_name:"Lower",_hx_index:1,__enum__:"tink.semver.ExtremumKind",toString:$estr}
};
tink_semver_ExtremumKind.__constructs__ = [tink_semver_ExtremumKind.Upper,tink_semver_ExtremumKind.Lower];
class tink_semver_Constraint {
	static parse(s) {
		if(s == null) {
			return tink_core_Outcome.Success(tink_semver_Constraint.WILDCARD);
		} else if(s == "") {
			return tink_core_Outcome.Success(tink_semver_Constraint.WILDCARD);
		} else {
			return tink_core_TypedError.catchExceptions(($_=new tink_semver_Parser(tink_parse_StringSlice.ofString(s)),$bind($_,$_.parseConstraint)),null,{ fileName : "tink/semver/Constraint.hx", lineNumber : 23, className : "tink.semver._Constraint.Constraint_Impl_", methodName : "parse"});
		}
	}
	static create(ranges) {
		let merged = [];
		let _g = 0;
		while(_g < ranges.length) {
			let _g1 = tink_semver_RangeTools.nonEmpty(ranges[_g++]);
			switch(_g1._hx_index) {
			case 0:
				let nu = _g1.v;
				let next = [];
				let _g2 = 0;
				while(_g2 < merged.length) {
					let old = merged[_g2];
					++_g2;
					let _g = tink_semver_RangeTools.merge(old,nu);
					switch(_g._hx_index) {
					case 0:
						nu = _g.v;
						break;
					case 1:
						next.push(old);
						break;
					}
				}
				next.push(nu);
				merged = next;
				break;
			case 1:
				break;
			}
		}
		return merged;
	}
	static exact(version) {
		return [{ min : tink_semver_Bound.Inclusive(version), max : tink_semver_Bound.Inclusive(version)}];
	}
	static range(min,max) {
		let o = tink_semver_RangeTools.nonEmpty({ min : tink_semver_Bound.Inclusive(min), max : tink_semver_Bound.Exlusive(max)});
		return o._hx_index == 0 ? [o.v] : [];
	}
	static matches(this1,v) {
		if(this1 == null) {
			return true;
		} else {
			let _g = 0;
			while(_g < this1.length) if(tink_semver_RangeTools.contains(this1[_g++],v)) {
				return true;
			}
			return false;
		}
	}
	static fromRange(r) {
		return tink_semver_Constraint.create([r]);
	}
	static ofVersion(v) {
		let _g = v.major;
		let _g1 = v.preview;
		if(_g1 == null) {
			if(_g == 0) {
				return tink_semver_Constraint.exact(v);
			} else {
				return tink_semver_Version.range(v,tink_semver_Version.nextMajor(v));
			}
		} else {
			switch(_g1) {
			case "alpha":case "beta":case "rc":
				return tink_semver_Constraint.exact(v);
			default:
				if(_g == 0) {
					return tink_semver_Constraint.exact(v);
				} else {
					return tink_semver_Version.range(v,tink_semver_Version.nextMajor(v));
				}
			}
		}
	}
	static or(a,b) {
		if(a == null) {
			return null;
		} else if(b == null) {
			return null;
		} else {
			return tink_semver_Constraint.create(a.concat(b));
		}
	}
	static and(a,b) {
		if(a == null) {
			return b;
		} else if(b == null) {
			return a;
		} else {
			let ret = [];
			let _g_current = 0;
			let _g_array = a;
			while(_g_current < _g_array.length) {
				let res = _g_array[_g_current++];
				let _g1_current = 0;
				let _g1_array = b;
				_hx_loop2: while(_g1_current < _g1_array.length) {
					let _g = tink_semver_RangeTools.intersect(res,_g1_array[_g1_current++]);
					switch(_g._hx_index) {
					case 0:
						res = _g.v;
						break;
					case 1:
						res = null;
						break _hx_loop2;
					}
				}
				if(res != null) {
					ret.push(res);
				}
			}
			return tink_semver_Constraint.create(ret);
		}
	}
}
class tink_semver__$Parser_Reporter {
	constructor(source) {
		this.source = source;
	}
	makeError(message,pos) {
		let this1 = this.source;
		let tmp = tink_parse_StringSlice._new(this1.string,tink_parse_StringSlice.wrap(this1,pos.min) + this1.start,tink_parse_StringSlice.clamp(this1,pos.max) + this1.start);
		return new tink_core_TypedError(null,"" + message + " at " + ("\"" + (tmp == null ? "null" : tmp.toString()) + "\"(" + pos.min + "-" + pos.max + ")") + (" in \"" + (this.source == null ? "null" : this.source.toString()) + "\""),{ fileName : "tink/semver/Parser.hx", lineNumber : 23, className : "tink.semver._Parser.Reporter", methodName : "makeError"});
	}
	makePos(from,to) {
		return new IntIterator(from,to);
	}
}
tink_semver__$Parser_Reporter.__name__ = true;
class tink_semver_Parser extends tink_parse_ParserBase {
	constructor(s) {
		super(s,new tink_semver__$Parser_Reporter(s));
	}
	doSkipIgnored() {
		while(true) {
			let tmp;
			if(this.pos < this.max) {
				let this1 = this.source;
				tmp = tink_parse_Char.WHITE[this1.string.charCodeAt(this.pos + this1.start)];
			} else {
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			this.pos++;
		}
	}
	num() {
		this.skipIgnored();
		let start = this.pos;
		while(true) {
			let _g;
			if(this.pos < this.max) {
				let this1 = this.source;
				_g = tink_parse_Char.DIGIT[this1.string.charCodeAt(this.pos + this1.start)];
			} else {
				_g = false;
			}
			if(!_g) {
				break;
			}
			this.pos++;
		}
		let this1 = this.source;
		let _g = Std.parseInt(tink_parse_StringSlice._new(this1.string,tink_parse_StringSlice.wrap(this1,start) + this1.start,tink_parse_StringSlice.clamp(this1,this.pos) + this1.start).toString());
		if(_g == null) {
			return -1;
		} else {
			return _g;
		}
	}
	lower(f) {
		return function(v) {
			return tink_semver_Constraint.fromRange({ min : f(v), max : tink_semver_Bound.Unbounded});
		};
	}
	upper(f) {
		return function(v) {
			return tink_semver_Constraint.fromRange({ min : tink_semver_Bound.Unbounded, max : f(v)});
		};
	}
	parseSimple(f) {
		let r = f(this.parseInlineVersion());
		while(true) {
			let cond = tink_parse_Char.ofCode(124);
			this.skipIgnored();
			let tmp;
			if(this.pos < this.max) {
				let this1 = this.source;
				tmp = cond[this1.string.charCodeAt(this.pos + this1.start)];
			} else {
				tmp = false;
			}
			if(!(!tmp && this.pos < this.max)) {
				break;
			}
			r = tink_semver_Constraint.and(r,this.parseSingle());
		}
		return r;
	}
	parseConstraint() {
		let ret = this.parseSingle();
		while(this.allow(tink_semver_Parser.OR)) ret = tink_semver_Constraint.or(ret,this.parseSingle());
		return ret;
	}
	carret(v) {
		return tink_semver_Version.range(v,v.major == 0 ? v.minor == 0 ? tink_semver_Version.nextPatch(v) : tink_semver_Version.nextMinor(v) : tink_semver_Version.nextMajor(v));
	}
	parseSingle() {
		this.skipIgnored();
		if(this.allowHere(tink_parse_StringSlice.ofString("*"))) {
			return null;
		} else if(this.allowHere(tink_parse_StringSlice.ofString(">="))) {
			return this.parseSimple(this.lower(tink_semver_Bound.Inclusive));
		} else if(this.allowHere(tink_parse_StringSlice.ofString(">"))) {
			return this.parseSimple(this.lower(tink_semver_Bound.Exlusive));
		} else if(this.allowHere(tink_parse_StringSlice.ofString("<="))) {
			return this.parseSimple(this.upper(tink_semver_Bound.Inclusive));
		} else if(this.allowHere(tink_parse_StringSlice.ofString("<"))) {
			return this.parseSimple(this.upper(tink_semver_Bound.Exlusive));
		} else if(this.allowHere(tink_parse_StringSlice.ofString("="))) {
			return tink_semver_Constraint.exact(this.parseInlineVersion());
		} else if(this.allowHere(tink_parse_StringSlice.ofString("^"))) {
			return this.parseSimple($bind(this,this.carret));
		} else {
			let p = this.parsePartial();
			if(this.allow(tink_semver_Parser.HYPHEN)) {
				let tmp = tink_semver_Bound.Inclusive(this.full(p));
				this.skipIgnored();
				return tink_semver_Constraint.fromRange({ min : tmp, max : tink_semver_Bound.Inclusive(this.parseInlineVersion())});
			} else if(p.patch < 0) {
				let v = this.full(p,true);
				return tink_semver_Version.range(v,p.minor < 0 ? tink_semver_Version.nextMajor(v) : tink_semver_Version.nextMinor(v));
			} else {
				return tink_semver_Constraint.ofVersion(this.full(p));
			}
		}
	}
	parseVersion() {
		let ret = this.parseInlineVersion();
		this.skipIgnored();
		if(this.pos == this.max) {
			return ret;
		} else {
			return this.die("Unexpected string",new IntIterator(this.pos,this.max));
		}
	}
	parsePartial() {
		let start = this.pos;
		let _gthis = this;
		let next = function() {
			if(_gthis.allowHere(tink_parse_StringSlice.ofString("."))) {
				return _gthis.num();
			} else {
				return -1;
			}
		};
		let major = this.num();
		let minor = next();
		let patch = next();
		let preview = null;
		let previewNum = -1;
		if(patch >= 0 && this.allowHere(tink_semver_Parser.HYPHEN)) {
			this.skipIgnored();
			let start = this.pos;
			while(true) {
				let preview;
				if(this.pos < this.max) {
					let this1 = this.source;
					preview = tink_parse_Char.LOWER[this1.string.charCodeAt(this.pos + this1.start)];
				} else {
					preview = false;
				}
				if(!preview) {
					break;
				}
				this.pos++;
			}
			let this1 = this.source;
			preview = tink_core_OutcomeTools.sure(tink_semver_Preview.ofString(tink_parse_StringSlice._new(this1.string,tink_parse_StringSlice.wrap(this1,start) + this1.start,tink_parse_StringSlice.clamp(this1,this.pos) + this1.start).toString()));
			if(this.allowHere(tink_semver_Parser.DOT)) {
				previewNum = this.num();
			}
		}
		return { major : major, minor : minor, patch : patch, preview : preview, previewNum : previewNum, pos : new IntIterator(start,this.pos)};
	}
	clamp(i) {
		if(i < 0) {
			return 0;
		} else {
			return i;
		}
	}
	full(p,clamped) {
		if(clamped != true && p.patch < 0) {
			this.die("Partial version not allowed",p.pos);
		}
		let ret = tink_semver_Version._new(p.major,this.clamp(p.minor),this.clamp(p.patch));
		if(p.preview != null) {
			return new tink_semver__$Version_Data(ret.major,ret.minor,ret.patch,p.preview,p.previewNum);
		} else {
			return ret;
		}
	}
	parseInlineVersion() {
		return this.full(this.parsePartial());
	}
}
tink_semver_Parser.__name__ = true;
class tink_semver_Preview {
	static ofString(s) {
		switch(s) {
		case "alpha":
			return tink_core_Outcome.Success("alpha");
		case "beta":
			return tink_core_Outcome.Success("beta");
		case "rc":
			return tink_core_Outcome.Success("rc");
		default:
			return tink_core_Outcome.Failure(new tink_core_TypedError(422,"" + s + " should be alpha | beta | rc",{ fileName : "tink/semver/Preview.hx", lineNumber : 14, className : "tink.semver._Preview.Preview_Impl_", methodName : "ofString"}));
		}
	}
}
class tink_semver_RangeTools {
	static merge(a,b) {
		let _g = a.max;
		let _g1 = a.min;
		switch(_g._hx_index) {
		case 1:
			let _g2 = b.max;
			let _g3 = b.min;
			if(_g3._hx_index == 2) {
				if(tink_semver_Version.eq(_g.limit,_g3.limit)) {
					return haxe_ds_Option.Some({ min : _g1, max : _g2});
				} else {
					switch(_g2._hx_index) {
					case 1:
						if(_g1._hx_index == 2) {
							if(tink_semver_Version.eq(_g1.limit,_g2.limit)) {
								return haxe_ds_Option.Some({ min : _g3, max : _g});
							} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
								return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
							} else {
								return haxe_ds_Option.None;
							}
						} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
						break;
					case 2:
						if(_g1._hx_index == 1) {
							if(tink_semver_Version.eq(_g1.limit,_g2.limit)) {
								return haxe_ds_Option.Some({ min : _g3, max : _g});
							} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
								return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
							} else {
								return haxe_ds_Option.None;
							}
						} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
						break;
					default:
						if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
					}
				}
			} else {
				switch(_g2._hx_index) {
				case 1:
					if(_g1._hx_index == 2) {
						if(tink_semver_Version.eq(_g1.limit,_g2.limit)) {
							return haxe_ds_Option.Some({ min : _g3, max : _g});
						} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
					} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
						return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
					} else {
						return haxe_ds_Option.None;
					}
					break;
				case 2:
					if(_g1._hx_index == 1) {
						if(tink_semver_Version.eq(_g1.limit,_g2.limit)) {
							return haxe_ds_Option.Some({ min : _g3, max : _g});
						} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
					} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
						return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
					} else {
						return haxe_ds_Option.None;
					}
					break;
				default:
					if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
						return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
					} else {
						return haxe_ds_Option.None;
					}
				}
			}
			break;
		case 2:
			let _g4 = b.max;
			let _g5 = b.min;
			if(_g5._hx_index == 1) {
				if(tink_semver_Version.eq(_g.limit,_g5.limit)) {
					return haxe_ds_Option.Some({ min : _g1, max : _g4});
				} else {
					switch(_g4._hx_index) {
					case 1:
						if(_g1._hx_index == 2) {
							if(tink_semver_Version.eq(_g1.limit,_g4.limit)) {
								return haxe_ds_Option.Some({ min : _g5, max : _g});
							} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
								return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
							} else {
								return haxe_ds_Option.None;
							}
						} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
						break;
					case 2:
						if(_g1._hx_index == 1) {
							if(tink_semver_Version.eq(_g1.limit,_g4.limit)) {
								return haxe_ds_Option.Some({ min : _g5, max : _g});
							} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
								return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
							} else {
								return haxe_ds_Option.None;
							}
						} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
						break;
					default:
						if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
					}
				}
			} else {
				switch(_g4._hx_index) {
				case 1:
					if(_g1._hx_index == 2) {
						if(tink_semver_Version.eq(_g1.limit,_g4.limit)) {
							return haxe_ds_Option.Some({ min : _g5, max : _g});
						} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
					} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
						return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
					} else {
						return haxe_ds_Option.None;
					}
					break;
				case 2:
					if(_g1._hx_index == 1) {
						if(tink_semver_Version.eq(_g1.limit,_g4.limit)) {
							return haxe_ds_Option.Some({ min : _g5, max : _g});
						} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
							return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
						} else {
							return haxe_ds_Option.None;
						}
					} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
						return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
					} else {
						return haxe_ds_Option.None;
					}
					break;
				default:
					if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
						return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
					} else {
						return haxe_ds_Option.None;
					}
				}
			}
			break;
		default:
			switch(_g1._hx_index) {
			case 1:
				let _g6 = b.max;
				if(_g6._hx_index == 2) {
					if(tink_semver_Version.eq(_g1.limit,_g6.limit)) {
						return haxe_ds_Option.Some({ min : b.min, max : _g});
					} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
						return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
					} else {
						return haxe_ds_Option.None;
					}
				} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
					return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
				} else {
					return haxe_ds_Option.None;
				}
				break;
			case 2:
				let _g7 = b.max;
				if(_g7._hx_index == 1) {
					if(tink_semver_Version.eq(_g1.limit,_g7.limit)) {
						return haxe_ds_Option.Some({ min : b.min, max : _g});
					} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
						return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
					} else {
						return haxe_ds_Option.None;
					}
				} else if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
					return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
				} else {
					return haxe_ds_Option.None;
				}
				break;
			default:
				if(tink_semver_RangeTools.intersect(a,b) != haxe_ds_Option.None) {
					return haxe_ds_Option.Some({ min : tink_semver_BoundTools.min(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.max(a.max,b.max,tink_semver_ExtremumKind.Upper)});
				} else {
					return haxe_ds_Option.None;
				}
			}
		}
	}
	static contains(r,v) {
		let tmp;
		let _g = r.min;
		switch(_g._hx_index) {
		case 0:
			tmp = true;
			break;
		case 1:
			tmp = tink_semver_Version.lt(_g.limit,v);
			break;
		case 2:
			tmp = tink_semver_Version.lte(_g.limit,v);
			break;
		}
		if(tmp) {
			let _g = r.max;
			switch(_g._hx_index) {
			case 0:
				return true;
			case 1:
				return tink_semver_Version.gt(_g.limit,v);
			case 2:
				return tink_semver_Version.gte(_g.limit,v);
			}
		} else {
			return false;
		}
	}
	static nonEmpty(r) {
		if(tink_semver_BoundTools.isLowerThan(r.min,r.max)) {
			return haxe_ds_Option.Some(r);
		} else {
			return haxe_ds_Option.None;
		}
	}
	static intersect(a,b) {
		return tink_semver_RangeTools.nonEmpty({ min : tink_semver_BoundTools.max(a.min,b.min,tink_semver_ExtremumKind.Lower), max : tink_semver_BoundTools.min(a.max,b.max,tink_semver_ExtremumKind.Upper)});
	}
}
tink_semver_RangeTools.__name__ = true;
class tink_semver_Version {
	static _new(major,minor,patch) {
		if(patch == null) {
			patch = 0;
		}
		if(minor == null) {
			minor = 0;
		}
		return new tink_semver__$Version_Data(major,minor,patch);
	}
	static nextMajor(this1) {
		return new tink_semver__$Version_Data(this1.major + 1,0,0);
	}
	static nextMinor(this1) {
		return new tink_semver__$Version_Data(this1.major,this1.minor + 1,0);
	}
	static nextPatch(this1) {
		return new tink_semver__$Version_Data(this1.major,this1.minor,this1.patch + 1);
	}
	static compare(this1,that) {
		let i = this1.major - that.major;
		let i1 = this1.minor - that.minor;
		let i2 = this1.patch - that.patch;
		let i3 = tink_semver_Version.idx(this1,this1.preview) - tink_semver_Version.idx(this1,that.preview);
		let i4 = this1.previewNum - that.previewNum;
		return tink_semver_Comparison.chain(tink_semver_Comparison.chain(tink_semver_Comparison.chain(tink_semver_Comparison.chain(i > 0 ? 1 : i < 0 ? -1 : 0,i1 > 0 ? 1 : i1 < 0 ? -1 : 0),i2 > 0 ? 1 : i2 < 0 ? -1 : 0),i3 > 0 ? 1 : i3 < 0 ? -1 : 0),i4 > 0 ? 1 : i4 < 0 ? -1 : 0);
	}
	static idx(this1,p) {
		if(p == null) {
			return 100;
		} else {
			switch(p) {
			case "alpha":
				return 1;
			case "beta":
				return 2;
			case "rc":
				return 3;
			}
		}
	}
	static eq(a,b) {
		return tink_semver_Version.compare(a,b) == 0;
	}
	static gt(a,b) {
		return tink_semver_Version.compare(a,b) == 1;
	}
	static lt(a,b) {
		return tink_semver_Version.compare(a,b) == -1;
	}
	static gte(a,b) {
		return tink_semver_Version.compare(a,b) != -1;
	}
	static lte(a,b) {
		return tink_semver_Version.compare(a,b) != 1;
	}
	static range(a,b) {
		return tink_semver_Constraint.range(a,b);
	}
	static parse(s) {
		return tink_core_TypedError.catchExceptions(($_=new tink_semver_Parser(tink_parse_StringSlice.ofString(s)),$bind($_,$_.parseVersion)),tink_semver_Version.reportError,{ fileName : "tink/semver/Version.hx", lineNumber : 97, className : "tink.semver._Version.Version_Impl_", methodName : "parse"});
	}
	static reportError(d) {
		if(typeof(d) == "string") {
			return new tink_core_TypedError(422,d,{ fileName : "tink/semver/Version.hx", lineNumber : 103, className : "tink.semver._Version.Version_Impl_", methodName : "reportError"});
		} else {
			return tink_core_TypedError.withData(422,Std.string(d),d,{ fileName : "tink/semver/Version.hx", lineNumber : 105, className : "tink.semver._Version.Version_Impl_", methodName : "reportError"});
		}
	}
}
class tink_semver__$Version_Data {
	constructor(major,minor,patch,preview,previewNum) {
		if(previewNum == null) {
			previewNum = -1;
		}
		if(major < 0 || minor < 0 || patch < 0) {
			throw haxe_Exception.thrown("version components must not be negative");
		}
		this.major = major;
		this.minor = minor;
		this.patch = patch;
		this.preview = preview;
		this.previewNum = previewNum;
	}
	toString() {
		let ret = "" + this.major + "." + this.minor + "." + this.patch;
		if(this.preview != null) {
			ret += "-" + this.preview;
			if(this.previewNum != -1) {
				ret += "." + this.previewNum;
			}
		}
		return ret;
	}
}
tink_semver__$Version_Data.__name__ = true;
class tink_semver_Comparison {
	static chain(a,b) {
		if(a == 0) {
			return b;
		} else {
			return a;
		}
	}
}
class tink_state_Observable {
	static get_value(this1) {
		let ret = this1.getValue();
		if(tink_state_internal_AutoObservable.cur != null) {
			tink_state_internal_AutoObservable.cur.subscribeTo(this1,ret);
		}
		return ret;
	}
	static map(this1,f) {
		return new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			let value = tink_state_Observable.get_value(this1);
			return f(value);
		}),null,null);
	}
}
class tink_state__$Observable_ConstObservable {
	constructor(value,toString) {
		this.revision = tink_state_internal_Revision._new();
		this.value = value;
	}
	getRevision() {
		return this.revision;
	}
	getValue() {
		return this.value;
	}
	getComparator() {
		return null;
	}
	onInvalidate(i) {
		return null;
	}
}
tink_state__$Observable_ConstObservable.__name__ = true;
class tink_state_internal_Invalidator {
	constructor(toString) {
		if(tink_state_internal_Invalidator._hx_skip_constructor) {
			return;
		}
		this._hx_constructor(toString);
	}
	_hx_constructor(toString) {
		this.list = new tink_core_CallbackList();
		this.observers = new Map();
		this.revision = tink_state_internal_Revision._new();
	}
	getRevision() {
		return this.revision;
	}
	onInvalidate(i) {
		let _gthis = this;
		if(this.observers.get(i)) {
			return null;
		} else {
			this.observers.set(i,true);
			let _this = this.list;
			let this1;
			if(_this.disposeHandlers == null) {
				this1 = null;
			} else {
				let node = new tink_core__$Callback_ListCell(function(_) {
					i.invalidate();
				},_this);
				_this.cells.push(node);
				if(_this.used++ == 0) {
					let fn = _this.onfill;
					if(tink_core_Callback.depth < 500) {
						tink_core_Callback.depth++;
						fn();
						tink_core_Callback.depth--;
					} else {
						tink_core_Callback.defer(fn);
					}
				}
				this1 = node;
			}
			return new tink_core__$Callback_LinkPair(this1,new tink_core_SimpleLink(function() {
				return _gthis.observers.delete(i);
			}));
		}
	}
	fire() {
		this.revision = tink_state_internal_Revision._new();
		this.list.invoke(null);
	}
}
tink_state_internal_Invalidator.__name__ = true;
class tink_state__$Observable_Transform {
	static plain(f) {
		return f;
	}
}
class tink_state_State {
	static _new(value,comparator,guard,onStatusChange,toString) {
		return guard == null ? new tink_state__$State_SimpleState(value,comparator,onStatusChange,toString) : new tink_state__$State_GuardedState(value,guard,comparator,onStatusChange,toString);
	}
}
class tink_state__$State_SimpleState extends tink_state_internal_Invalidator {
	constructor(value,comparator,onStatusChange,toString) {
		if(tink_state_internal_Invalidator._hx_skip_constructor) {
			super();
			return;
		}
		tink_state_internal_Invalidator._hx_skip_constructor = true;
		super();
		tink_state_internal_Invalidator._hx_skip_constructor = false;
		this._hx_constructor(value,comparator,onStatusChange,toString);
	}
	_hx_constructor(value,comparator,onStatusChange,toString) {
		super._hx_constructor(toString);
		this.value = value;
		this.comparator = comparator;
		if(onStatusChange != null) {
			let _g = onStatusChange;
			let a1 = false;
			let tmp = function() {
				_g(a1);
			};
			this.list.ondrain = tmp;
			let _g1 = onStatusChange;
			let a11 = true;
			let tmp1 = function() {
				_g1(a11);
			};
			this.list.onfill = tmp1;
		}
	}
	getValue() {
		return this.value;
	}
	getComparator() {
		return this.comparator;
	}
}
tink_state__$State_SimpleState.__name__ = true;
class tink_state__$State_GuardedState extends tink_state__$State_SimpleState {
	constructor(value,guard,comparator,onStatusChange,toString) {
		tink_state_internal_Invalidator._hx_skip_constructor = true;
		super();
		tink_state_internal_Invalidator._hx_skip_constructor = false;
		this._hx_constructor(value,guard,comparator,onStatusChange,toString);
	}
	_hx_constructor(value,guard,comparator,onStatusChange,toString) {
		this.guardApplied = false;
		super._hx_constructor(value,comparator,onStatusChange,toString);
		this.guard = guard;
	}
	getValue() {
		if(!this.guardApplied) {
			this.guardApplied = true;
			return this.value = this.guard(this.value);
		} else {
			return this.value;
		}
	}
}
tink_state__$State_GuardedState.__name__ = true;
class tink_state_internal__$AutoObservable_Computation {
	static sync(f) {
		return function(_,_1) {
			return f();
		};
	}
}
class tink_state_internal__$AutoObservable_SubscriptionTo {
	constructor(source,cur,owner) {
		this.used = true;
		this.source = source;
		this.last = cur;
		this.lastRev = source.getRevision();
		this.owner = owner;
		if(owner.hot) {
			this.link = this.source.onInvalidate(this.owner);
		}
	}
}
tink_state_internal__$AutoObservable_SubscriptionTo.__name__ = true;
class tink_state_internal_AutoObservable extends tink_state_internal_Invalidator {
	constructor(compute,comparator,toString) {
		tink_state_internal_Invalidator._hx_skip_constructor = true;
		super();
		tink_state_internal_Invalidator._hx_skip_constructor = false;
		this._hx_constructor(compute,comparator,toString);
	}
	_hx_constructor(compute,comparator,toString) {
		this.sync = true;
		this.dependencies = new Map();
		this.last = null;
		this.status = 0;
		this.hot = false;
		super._hx_constructor(toString);
		this.compute = compute;
		this.comparator = comparator;
		let _gthis = this;
		this.list.onfill = function() {
			_gthis.getValue();
			_gthis.getRevision();
			if(_gthis.subscriptions != null) {
				let _g = 0;
				let _g1 = _gthis.subscriptions;
				while(_g < _g1.length) {
					let s = _g1[_g];
					++_g;
					s.link = s.source.onInvalidate(s.owner);
				}
			}
			_gthis.hot = true;
		};
		this.list.ondrain = function() {
			_gthis.hot = false;
			if(_gthis.subscriptions != null) {
				let _g = 0;
				let _g1 = _gthis.subscriptions;
				while(_g < _g1.length) {
					let this1 = _g1[_g++].link;
					if(this1 != null) {
						this1.cancel();
					}
				}
			}
		};
	}
	getRevision() {
		if(this.hot) {
			return this.revision;
		}
		if(this.subscriptions == null) {
			this.getValue();
		}
		let _g = 0;
		let _g1 = this.subscriptions;
		while(_g < _g1.length) if(_g1[_g++].source.getRevision() > this.revision) {
			return this.revision = tink_state_internal_Revision._new();
		}
		return this.revision;
	}
	subsValid() {
		if(this.subscriptions == null) {
			return false;
		}
		let _g = 0;
		let _g1 = this.subscriptions;
		while(_g < _g1.length) {
			let s = _g1[_g];
			++_g;
			if(s.source.getRevision() != s.lastRev) {
				return false;
			}
		}
		return true;
	}
	isValid() {
		if(this.status != 0) {
			if(!this.hot) {
				return this.subsValid();
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	getComparator() {
		return this.comparator;
	}
	getValue() {
		let _gthis = this;
		let doCompute = function() {
			_gthis.status = 1;
			if(_gthis.subscriptions != null) {
				let _g = 0;
				let _g1 = _gthis.subscriptions;
				while(_g < _g1.length) _g1[_g++].used = false;
			}
			_gthis.subscriptions = [];
			_gthis.sync = true;
			let before = tink_state_internal_AutoObservable.cur;
			tink_state_internal_AutoObservable.cur = _gthis;
			let ret = _gthis.compute(function(v) {
				_gthis.update(v);
			});
			tink_state_internal_AutoObservable.cur = before;
			_gthis.last = ret;
			_gthis.sync = false;
		};
		let prevSubs = this.subscriptions;
		let count = 0;
		while(!this.isValid()) if(++count == tink_state_Observable.MAX_ITERATIONS) {
			throw haxe_Exception.thrown("no result after " + tink_state_Observable.MAX_ITERATIONS + " attempts");
		} else if(this.subscriptions != null) {
			let valid = true;
			let _g = 0;
			let _g1 = this.subscriptions;
			while(_g < _g1.length) {
				let s = _g1[_g];
				++_g;
				let nextRev = s.source.getRevision();
				let tmp;
				if(nextRev == s.lastRev) {
					tmp = false;
				} else {
					s.lastRev = nextRev;
					let before = s.last;
					let before1 = tink_state_internal_AutoObservable.cur;
					tink_state_internal_AutoObservable.cur = null;
					let ret = s.source.getValue();
					tink_state_internal_AutoObservable.cur = before1;
					s.last = ret;
					let this1 = s.source.getComparator();
					let a = s.last;
					tmp = !(this1 == null ? a == before : this1(a,before));
				}
				if(tmp) {
					valid = false;
					break;
				}
			}
			if(valid) {
				this.status = 1;
			} else {
				doCompute();
				if(prevSubs != null) {
					let _g = 0;
					while(_g < prevSubs.length) {
						let s = prevSubs[_g];
						++_g;
						if(!s.used) {
							if(this.hot) {
								let this1 = s.link;
								if(this1 != null) {
									this1.cancel();
								}
							}
							this.dependencies.delete(s.source);
						}
					}
				}
			}
		} else {
			doCompute();
		}
		return this.last;
	}
	update(value) {
		if(!this.sync) {
			this.last = value;
			this.fire();
		}
	}
	subscribeTo(source,cur) {
		let _g = this.dependencies.get(source);
		if(_g == null) {
			let sub = new tink_state_internal__$AutoObservable_SubscriptionTo(source,cur,this);
			this.dependencies.set(source,sub);
			this.subscriptions.push(sub);
		} else if(!_g.used) {
			_g.used = true;
			_g.last = cur;
			this.subscriptions.push(_g);
		}
	}
	invalidate() {
		if(this.status == 1) {
			this.status = 0;
			this.fire();
		}
	}
}
tink_state_internal_AutoObservable.__name__ = true;
class tink_state_internal_Revision {
	static _new() {
		return tink_state_internal_Revision.counter += 1.0;
	}
}
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
{
	String.__name__ = true;
	Array.__name__ = true;
}
haxe_Resource.content = [{ name : "releases.json", data : "Ww0KCXsNCgkJInZlcnNpb24iOiAiMS4xMS4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMTEuMC13aW4uemlwIn0NCgkJXQ0KCX0sDQoJew0KCQkidmVyc2lvbiI6ICIxLjEwLjAiLA0KCQkiYXNzZXRzIjogWw0KCQkJeyJwbGF0Zm9ybSI6ICJXaW5kb3dzIiwgImZpbGUiOiAiaGwtMS4xMC4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuOS4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuOS4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuOC4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuOC4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuNy4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuNy4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuNi4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiTGludXgiLCAiZmlsZSI6ICJobC0xLjYuMC1saW51eC50Z3oifSwNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuNi4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuNS4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiTGludXgiLCAiZmlsZSI6ICJobC0xLjUuMC1saW51eC50Z3oifSwNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuNS4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuNC4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuNC13aW4uemlwIn0NCgkJXQ0KCX0sDQoJew0KCQkidmVyc2lvbiI6ICIxLjMuMCIsDQoJCSJhc3NldHMiOiBbDQoJCQl7InBsYXRmb3JtIjogIk1hYyIsICJmaWxlIjogImhsLTEuMy1vc3gzMi56aXAifSwNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMy13aW4zMi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuMi4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiTWFjIiwgImZpbGUiOiAiaGwtMS4yLW9zeC56aXAifSwNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMi13aW4zMi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuMS4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMS13aW4zMi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuMC4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMC13aW4zMi56aXAifQ0KCQldDQoJfQ0KXQ0K"}];
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
tink_state_internal_Revision.counter = .0;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
tink_pure__$List_Node.EMPTY = [];
tink_json_BasicParser.DBQT = String.fromCodePoint(34);
setup_$hashlink_Release.baseUrl = tink_Url.fromString("https://github.com/HaxeFoundation/hashlink/");
setup_$hashlink_Release.data = tink_pure_List.fromArray(new tink_json_Parser0().parse(haxe_Resource.getString("releases.json")));
tink_core_Callback.depth = 0;
tink_core_SimpleDisposable._hx_skip_constructor = false;
tink_core_Future.NEVER = new tink_core__$Future_NeverFuture();
tink_json_JsonString.BACKSLASH = "\\";
tink_parse_Char.byInt = new haxe_ds_IntMap();
tink_parse_Char.WHITE = tink_parse_Char.oneOf([9,10,11,12,13,32]);
tink_parse_Char.LOWER = tink_parse_Char.ofRange(new IntIterator(97,123));
tink_parse_Char.DIGIT = tink_parse_Char.ofRange(new IntIterator(48,58));
tink_parse_StringSlice.CHARS = (function($this) {
	var $r;
	let _g = [];
	{
		let _g1 = 0;
		while(_g1 < 128) {
			let i = _g1++;
			_g.push(new tink_parse__$StringSlice_Data(String.fromCodePoint(i),0,1));
		}
	}
	$r = _g;
	return $r;
}(this));
tink_parse_StringSlice.EMPTY = new tink_parse__$StringSlice_Data("",0,0);
tink_semver_Parser.OR = tink_parse_StringSlice.ofString("||");
tink_semver_Parser.DOT = tink_parse_StringSlice.ofString(".");
tink_semver_Parser.HYPHEN = tink_parse_StringSlice.ofString("-");
tink_state_Observable.MAX_ITERATIONS = 100;
tink_state_internal_Invalidator._hx_skip_constructor = false;
setup_$hashlink_Program_main();
})(global);

})();

module.exports = __webpack_exports__;
/******/ })()
;