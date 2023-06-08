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

export type UserType = 'landlord' | 'tenant';
