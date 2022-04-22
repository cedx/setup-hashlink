// TODO
const privateConstructor = Symbol("private constructor");

/**
 * TODO
 */
export class Option {

	/**
	 * TODO
	 * @type {Option}
	 */
	static #none = new this(undefined, privateConstructor);

	/**
	 * The underlying value.
	 * @type {*}
	 */
	#value;

	/**
	 * Creates a new option.
	 * @param {*} value The option value.
	 * @param {Symbol|null} [token] TODO
	 * @private
	 */
	constructor(value, token = null) {
		if (token != privateConstructor) throw new TypeError("TODO");
		this.#value = value;
	}

	/**
	 * TODO
	 * @type {Option}
	 */
	static get none() {
		return this.#none;
	}

	/**
	 * TODO
	 * @type {*}
	 */
	get value() {
		return this.#value;
	}

	/**
	 * TODO
	 * @param {*} value
	 * @returns {Option}
	 */
	static some(value) {
		return new this(value, privateConstructor);
	}
}
