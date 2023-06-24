import { useEffect } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

export function useSocket(effect: (socket: Socket) => any) {
  socket ||= io("ws://localhost:8300");
  useEffect(() => {
    return effect(socket);
  }, [effect]);
  return socket;
}
