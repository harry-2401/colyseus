import http from "http";
import { Client, Room, ServerError } from "@colyseus/core";
import { MyState } from "../state/MyState";

export class MyRoom extends Room {
  onCreate(options: any) {
    console.log("onCreate", options);

    this.setState(new MyState());

    this.onMessage("move", (client, message) => {
      console.log(message);
      this.broadcast("receiver", { ga: "ok" }, { except: client });
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
  }

  onLeave(client: Client, cosented: boolean) {
    console.log("onLeave", cosented);
  }

  onDispose() {
    console.log("ondispose");
  }
}
