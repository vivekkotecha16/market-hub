export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export type UserWithPassword = User & {
  password: string;
};
