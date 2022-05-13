import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { createServer } from "http";
import express from "express";
import { MyRoom } from "./room/MyRoom";

const PORT = 3000;

const app = express();
app.use(express.json());

const gameServer = new Server({
  transport: new WebSocketTransport({
    pingInterval: 3000,
    pingMaxRetries: 3,
    server: createServer(app),
  }),
});

gameServer.define("battle", MyRoom).enableRealtimeListing();

gameServer.listen(PORT);
