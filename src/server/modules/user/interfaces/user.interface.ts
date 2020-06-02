// TODO: Add variations of usermodal (userForRegistor, userForLogin, ...)
export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  twoFactorAuthenticationCode?: string;
  isTwoFactorAuthenticationEnabled?: boolean;
  address?: Address;
}

interface Address {
  street: string;
  city: string;
  country: string;
}
