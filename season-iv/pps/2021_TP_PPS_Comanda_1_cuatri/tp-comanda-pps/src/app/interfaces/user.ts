export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  dni: string;
  profilePhoto: string;
  typeUser: TypeUser | '';
  aproved: boolean;
  date: number;
  path: string;
  mesa: string;
}

export interface IUserDataRegister {
  name: string;
  lastname: string;
  dni: number;
  email: string;
  password: string;
}

export interface IDniData {
  name: string;
  lastname: string;
  dni: number;
}

export interface IUserListaEspera {
  dni: string;
  email: string;
  estado: string;
  id: string;
  lastname: string;
  mesa: string;
  name: string;
  password: string;
  path: string;
  profilePhoto: string;
}

export enum TypeUser {
  Admin = 'Admin',
  Supervisor = 'Supervisor',
  Cocinero = 'Cocinero',
  Bartender = 'Bartender',
  Metre = 'Metre',
  Mozo = 'Mozo',
  Cliente = 'Cliente',
  Anonimo = 'Anonimo',
}
