import path from "node:path";
const home = path.join(__dirname, ".thelounge");

import config from "../../server/config.ts";
config.setHome(home);
