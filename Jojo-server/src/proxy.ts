// import { proxySchema } from 'better-sqlite3-proxy'
// import { db } from './db'

export type User = {
  id?: null | number;
  username: string;
  password_hash: string;
  is_admin: boolean;
  avatar: null | string;
};

export type Log = {
  id?: null | number;
  user_id: null | number;
  user?: User;
  rpc: string;
  input: string; // json
  output: string; // json
  time_used: number;
  user_agent: null | string;
};

export type Room = {
  id?: null | number;
  title: string;
  user_id: number;
  user?: User;
};

export type Message = {
  id?: null | number;
  user_id: number;
  user?: User;
  room_id: number;
  room?: Room;
  content: string;
  sent_time: number;
};

export type DBProxy = {
  user: User[];
  log: Log[];
  room: Room[];
  message: Message[];
};

// export let proxy = proxySchema<DBProxy>({
//   db,
//   tableFields: {
//     user: [],
//     log: [
//       /* foreign references */
//       ['user', { field: 'user_id', table: 'user' }],
//     ],
//     room: [
//       /* foreign references */
//       ['user', { field: 'user_id', table: 'user' }],
//     ],
//     message: [
//       /* foreign references */
//       ['user', { field: 'user_id', table: 'user' }],
//       ['room', { field: 'room_id', table: 'room' }],
//     ],
//   },
// })
