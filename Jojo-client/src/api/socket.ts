// import { Server } from "socket.io";
// import messageHandler from "../../../Jojo-server/src/chat/messageHandler";

// export default function SocketHandler(req: Request, res: Response) {
//   // It means that socket server was already initialised
//   if (res.socket.server.io) {
//     // console.log("Already set up");
//     res.end();
//     return;
//   }

//   const io = new Server(res.socket.server);
//   res.socket.server.io = io;

//   const onConnection = (socket: any) => {
//     messageHandler(io, socket);
//   };

//   // Define actions inside
//   io.on("connection", onConnection);

//   // console.log("Setting up socket");
//   res.end();
// }
