import { useEffect } from "react";
import io, { Socket } from "socket.io-client";
import ioServerURL from "../IOServerDomain";

let socket: Socket;

export function useSocket(effect: (socket: Socket) => any) {
  socket ||= io(ioServerURL);
  useEffect(() => {
    return effect(socket);
  }, [effect]);
  return socket;
}
