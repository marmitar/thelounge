import path from "node:path";
const home = path.join(__dirname, ".thelounge");

import config from "../../server/config.ts";
// eslint-disable-next-line @typescript-eslint/no-floating-promises -- TODO: top-level await
config.setHome(home);
