export type JWTPayload = {
  id: number;
  role: "landlord" | "tenant";
};

export type FetchError = {
  status: number;
  data: { message: string };
};

export type LoginInput = {
  email: string | null | undefined;
  password: string | null | undefined;
};
export type LoginFBInput = {
  accessToken: string;
  user_type: "landlord" | "tenant";
};
export type SignUpInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: string;
};

export type PropertyListOutput = {
  id: string;
  title: string;
  rent: number;
  rental_start_at: string;
  rental_end_at: string;
  attachments: string[];
  last_name: string;
  first_name: string;
};
export type EventListOutput = {
  id: number;
  event_title: string;
  type: string;
  priority: string;
  status: string;
  attachments: string[];
  handled_by_id: number;
  comment: string;
  description: string;
  property_title: string;
};

export enum UserType {
  "landlord",
  "tenant",
}
export const uploadDir = "./upload";
export const userRole = { landlord: "landlord", tenant: "tenant" };

export type PropertyInput = {
  title: string;
  rent: number;
  area: string;
  district: string;
  location: string;
  street: string;
  building: string;
  block: string;
  floor: string;
  room: string;
  rental_start_at: Date;
  rental_end_at: Date;
};
export type EventInput = {
  title: string;
  type: string;
  priority: string;
  description: string;
};
export interface ModalSlice {
  isShow: boolean;
}
export interface LocationSlice {
  location: null | string;
}

export const district: string[][] = [
  ["central_west", "Central west"],
  ["eastern", "Eastern"],
  ["southern", "Southern"],
  ["wan_chai", "Wan Chai"],
  ["kowloon_city", "Kowloon City"],
  ["kwun_tong", "Kwun Tong"],
  ["sham_shui_po", "Sham Shui Po"],
  ["wong_tai_sin", "Wong Tai Sin"],
  ["yau_tsim_mong", "Yau Tsim Mong"],
  ["island", "Island"],
  ["kwai_tsing", "Kwai Tsing"],
  ["north", "North"],
  ["sai_kung", "Sai Kung"],
  ["sha_tin", "Sha Tin"],
  ["tai_po", "Tai Po"],
  ["tsuen_wan", "Tsuen Wan"],
  ["tuen_mun", "Tuen Mun"],
  ["yuen_long", "Yuen Long"],
];

export const area: string[][] = [
  ["hong_kong", "Hong Kong"],
  ["kowloon", "Kowloon"],
  ["new_territories", "New Territories"],
  ["island", "Island"],
];

export const event_type: string[][] = [
  ["maintenance", "Maintenance"],
  ["notices", "Notices"],
  ["reimbursement", "Reimbursement"],
  ["complaint", "Complaint"],
];

export const event_priority: string[][] = [
  ["high", "High"],
  ["medium", "Medium"],
  ["low", "Low"],
];
export const event_status: string[][] = [
  ["resolved", "Resolved"],
  ["pending", "Pending"],
  ["rejected", "Rejected"],
  ["cancelled", "Cancelled"],
];
export type ChatroomListOutput = {
  id: number;
  creator_id: number;
  receiver_id: number;
};

export type MessageOutput = {
  id: number;
  room_id: number;
  sender_id: number;
  content: string;
  created_at: Date;
};

export type UserListOutput = {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  status: string;
};

export type Message = {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  timestamp: string;
};

export type ChatRoomProps = {
  senderId: number;
  receiverId: number;
};

export type chatroom = {
  id: number;
  creator_id: number;
  receiver_id: number;
  created_at: string;
};

export type User = {
  email: string;
  name: string;
};

export enum EventTypes {
  "maintenance",
  "notices",
  "reimbursement",
  "complaint",
}

export enum EventPriority {
  "high",
  "medium",
  "low",
}

export const eventTypesEnumMsg = {
  message: `Please select an event type`,
};

export const eventPriorityEnumMsg = {
  message: `Please select an event priority`,
};

export enum PropertyArea {
  "hong_kong",
  "kowloon",
  "new_territories",
  "island",
}
export enum PropertyDistrict {
  "central_west",
  "eastern",
  "southern",
  "wan_chai",
  "kowloon_city",
  "kwun_tong",
  "sham_shui_po",
  "wong_tai_sin",
  "yau_tsim_mong",
  "island",
  "kwai_tsing",
  "north",
  "sai_kung",
  "sha_tin",
  "tai_po",
  "tsuen_wan",
  "tuen_mun",
  "yuen_long",
}
export const propertyAreaEnumMsg = {
  message: `Please select the property's area`,
};
export const userTypeEnumMsg = {
  message: `Invalid user type`,
};
export const propertyDistrictEnumMsg = {
  message: `Please select the property's district`,
};

export type ClientPayload = {
  token: string;
  role: "admin" | "landlord" | "tenant" | null;
};

export type PaymentListOutput = {
  id: string;
  property_id: string;
  payer_id: number;
  status: "confirmed" | "pending";
  amount: number;
  billing_period_from: string;
  billing_period_to: string;
  attachments: string[];
  confirmed_at: string;
  first_name: string;
  last_name: string;
};

export type ChatRecord = {
  receiver_id: number;
  chatroom_id: number;
};

export type existingRecord = {
  room_id: number;
  otherUser: string;
  senderName: string;
  content: string;
};

export type PatchEventInput = {
  type: "resolve" | "reject" | "cancel";
  comment: string;
};

export enum PatchEventActionType {
  "resolve",
  "reject",
  "cancel",
}

export const patchEventActionTypeEnumMsg = {
  message: `Invalid action type`,
};
