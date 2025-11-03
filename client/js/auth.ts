import storage from "./localStorage.ts";
import location from "./location.ts";

export default class Auth {
	static signout() {
		storage.clear();
		location.reload();
	}
}
