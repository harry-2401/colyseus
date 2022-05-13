import http from "http";
import { Client, Room, ServerError } from "@colyseus/core";
import { MyState, Player } from "../state/MyState";

export class MyRoom extends Room {
  onCreate(options: any) {
    console.log("onCreate", options);

    this.setState(new MyState());

    this.onMessage("move", (client, message) => {
      console.log(message);
      this.broadcast("receiver", { ga: "ok" }, { except: client });
    });

    this.onMessage("updatePosition", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.x = data.x;
      player.y = data.y;
      player.z = data.z;
    });
  }

  onAuth(client: Client, options: any, request?: http.IncomingMessage) {
    console.log("onauth");
    // console.log(request);

    if (options.auth === true) {
      return true;
    }

    throw new ServerError(400, "Bad request");
  }

  onJoin(client: Client, options: any, auth: any) {
    console.log("onJoin", options, auth);

    const sessionId = client.sessionId;
    console.log(`${sessionId} joined!`);

    const player = new Player();

    const FLOOR_SIZE = 4;
    player.x = -(FLOOR_SIZE / 2) + Math.random() * FLOOR_SIZE;
    player.y = 1.031;
    player.z = -(FLOOR_SIZE / 2) + Math.random() * FLOOR_SIZE;

    this.state.players.set(sessionId, player);
  }

  onLeave(client: Client, cosented: boolean) {
    console.log("onLeave", cosented);

    console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("ondispose");
  }
}
