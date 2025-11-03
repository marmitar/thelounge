import Config from "../../config.ts";
let add, reset;

if (!Config.values.ldap.enable) {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	add = require("./add.js").default;
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	reset = require("./reset.js").default;
}

import list from "./list.ts";
import remove from "./remove.ts";
import edit from "./edit.ts";

export default [list, remove, edit, add, reset];
