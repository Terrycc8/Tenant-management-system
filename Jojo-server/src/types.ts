export type JWTPayload = {
  id: number;
  role: 'admin' | 'landlord' | 'tenant';
};

export type FetchError = {
  status: number;
  data: { message: string };
};

export type LoginInput = {
  email: string | null | undefined;
  password: string | null | undefined;
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
  rental_start_at: Date;
  rental_end_at: Date;
  attachments: string[];
  tenant_id: number;
};

export type UserType = 'landlord' | 'tenant';
export const uploadDir = './upload';
export const userRole = { landlord: 'landlord', tenant: 'tenant' };

<<<<<<< HEAD
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
  ['central_west', 'Central west'],
  ['eastern', 'Eastern'],
  ['southern', 'Southern'],
  ['wan_chai', 'Wan Chai'],
  ['kowloon_city', 'Kowloon City'],
  ['kwun_tong', 'Kwun Tong'],
  ['sham_shui_po', 'Sham Shui Po'],
  ['wong_tai_sin', 'Wong Tai Sin'],
  ['yau_tsim_mong', 'Yau Tsim Mong'],
  ['island', 'Island'],
  ['kwai_tsing', 'Kwai Tsing'],
  ['north', 'North'],
  ['sai_kung', 'Sai Kung'],
  ['sha_tin', 'Sha Tin'],
  ['tai_po', 'Tai Po'],
  ['tsuen_wan', 'Tsuen Wan'],
  ['tuen_mun', 'Tuen Mun'],
  ['yuen_long', 'Yuen Long'],
];

export const area: string[][] = [
  ['hong_kong', 'Hong Kong'],
  ['kowloon', 'Kowloon'],
  ['new_territories', 'New Territories'],
  ['island', 'Island'],
];

export const event_type: string[][] = [
  ['maintenance', 'Maintenance'],
  ['notices', 'Notices'],
  ['reimbursement', 'Reimbursement'],
  ['complaint', 'Complaint'],
];

export const event_priority: string[][] = [
  ['high', 'High'],
  ['medium', 'Medium'],
  ['low', 'Low'],
];
export const event_status: string[][] = [
  ['resolved', 'Resolved'],
  ['pending', 'Pending'],
  ['rejected', 'Rejected'],
];
=======
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
>>>>>>> ee4fcbf20f5ac3bb2626bc00edf7614a2a197b08
