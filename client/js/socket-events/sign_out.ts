import socket from "../socket.ts";
import Auth from "../auth.ts";

socket.on("sign-out", function () {
	Auth.signout();
});
