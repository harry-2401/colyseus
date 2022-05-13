import logo from "./logo.svg";
import * as Colyseus from "colyseus.js";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const client = useRef(new Colyseus.Client("ws://localhost:3000"));
  const [room, setRoom] = useState(null);
  const event = useRef("move");
  const ROOM = "battle";
  useEffect(() => {
    console.log(client.current);
  }, [client]);

  useEffect(() => {
    room?.onMessage("receiver", (message) => {
      console.log(client, message);
    });
  }, [room]);

  const handleJoinOrCreate = async () => {
    try {
      const _room = await client.current.joinOrCreate(ROOM, { auth: true });
      setRoom(_room);
      console.log("joined successfullt", _room);
    } catch (error) {
      console.error("join error", error);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const _room = await client.current.create(ROOM, {});
      setRoom(_room);

      console.log("joined successfullt", _room);
    } catch (error) {
      console.error("join error", error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const _room = await client.current.join(ROOM, {});
      setRoom(_room);

      console.log("joined successfullt", _room);
    } catch (error) {
      console.error("join error", error);
    }
  };

  const handleGetVariableRooms = () => {
    client.current
      .getAvailableRooms("battle")
      .then((rooms) => {
        rooms.forEach((room) => {
          console.log(room.roomId);
          console.log(room.clients);
          console.log(room.maxClients);
          console.log(room.metadata);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleSendMessage = () => {
    room?.send(event.current, { data: "okbro" });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Colyseus
        </a>
        <button onClick={handleJoinOrCreate}>JoinRoomOrCreate</button>
        <button onClick={handleJoinRoom}>JoinRoom</button>
        <button onClick={handleCreateRoom}>CreateRoom</button>
        <button onClick={handleGetVariableRooms}>GetVariableRooms</button>
        <button onClick={handleSendMessage}>SendMessage</button>
      </header>
    </div>
  );
}

export default App;
