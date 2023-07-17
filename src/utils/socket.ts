import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = `${process.env.API_BASE_URL}`;

export const socket = io(URL, {
  autoConnect: false,
});
