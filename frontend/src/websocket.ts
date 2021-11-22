import { io } from "socket.io-client";

const socket = io("ws://localhost:5000");

socket.on("connect", () => {
    console.log(`Websocket connection successfully established. Socket-ID ${socket.id}`)
})

socket.on("close", () => {
    console.log("Websocket connection closed.")
})

socket.connect()

export { socket };