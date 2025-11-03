import socket from "../socket.ts";
import {store} from "../store.ts";

socket.on("sessions:list", function (data) {
	data.sort((a, b) => b.lastUse - a.lastUse);
	store.commit("sessions", data);
});
