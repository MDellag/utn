export interface UserCredentials {
  username: string;
  password: string;
  email: string;
}

export interface IWallet {
  username: string;
  amount: number;
  qrs: string[];
  type: 'Admin' | 'User' | '';
}
