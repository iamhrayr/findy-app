export type User = {
  pk: Id;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  country?: string;
};

export type Auth = {
  user: User;
  refreshToken: string;
  accessToken: string;
};

export type Settings = {
  notificationMethod: 'sms' | 'app' | 'both';
  showPhoneNumber: boolean;
};
