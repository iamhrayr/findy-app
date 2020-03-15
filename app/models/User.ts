export type User = {
  user: {
    pk: Id;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
    country: string;
  };
  refreshToken: string;
  accessToken: string;
};
