export type FetchError = {
  status: number;
  data: { message: string };
};

export type LoginInput = {
  email: string | null | undefined;
  password: string | null | undefined;
};
export type SignUpInput = {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
  confirmedPassword: string | null | undefined;
  userType: string | null | undefined;
};
