/**
 * @type {Partial<import("typedoc").TypeDocOptions>}
 */
export default {
	entryPoints: ["../src/Main.ts"],
	excludePrivate: true,
	gitRevision: "main",
	hideGenerator: true,
	name: "Setup HashLink VM",
	out: "../docs",
	readme: "none",
	tsconfig: "../src/tsconfig.json"
};
