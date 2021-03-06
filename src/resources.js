import {Platform} from "./platform.js";

/**
 * The release data.
 * @type {import("./release.js").ReleaseOptions[]}
 */
export default [
	{
		version: "1.12.0",
		assets: [
			{platform: Platform.windows, file: "hl-1.12.0-win.zip"}
		]
	},
	{
		version: "1.11.0",
		assets: [
			{platform: Platform.windows, file: "hl-1.11.0-win.zip"}
		]
	},
	{
		version: "1.10.0",
		assets: [
			{platform: Platform.windows, file: "hl-1.10.0-win.zip"}
		]
	},
	{
		version: "1.9.0",
		assets: [
			{platform: Platform.windows, file: "hl-1.9.0-win.zip"}
		]
	},
	{
		version: "1.8.0",
		assets: [
			{platform: Platform.windows, file: "hl-1.8.0-win.zip"}
		]
	},
	{
		version: "1.7.0",
		assets: [
			{platform: Platform.windows, file: "hl-1.7.0-win.zip"}
		]
	},
	{
		version: "1.6.0",
		assets: [
			{platform: Platform.linux, file: "hl-1.6.0-linux.tgz"},
			{platform: Platform.windows, file: "hl-1.6.0-win.zip"}
		]
	},
	{
		version: "1.5.0",
		assets: [
			{platform: Platform.linux, file: "hl-1.5.0-linux.tgz"},
			{platform: Platform.windows, file: "hl-1.5.0-win.zip"}
		]
	},
	{
		version: "1.4.0",
		assets: [
			{platform: Platform.windows, file: "hl-1.4-win.zip"}
		]
	},
	{
		version: "1.3.0",
		assets: [
			{platform: Platform.macOS, file: "hl-1.3-osx32.zip"},
			{platform: Platform.windows, file: "hl-1.3-win32.zip"}
		]
	},
	{
		version: "1.2.0",
		assets: [
			{platform: Platform.macOS, file: "hl-1.2-osx.zip"},
			{platform: Platform.windows, file: "hl-1.2-win32.zip"}
		]
	},
	{
		version: "1.1.0",
		assets: [
			{platform: Platform.windows, file: "hl-1.1-win32.zip"}
		]
	},
	{
		version: "1.0.0",
		assets: [
			{platform: Platform.windows, file: "hl-1.0-win32.zip"}
		]
	}
];
