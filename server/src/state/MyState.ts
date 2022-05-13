import { Schema, type, ArraySchema, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") z: number;
}

export class MyState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
