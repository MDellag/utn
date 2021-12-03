export interface IUser {
  id?: string
  email: string
  password: string
  name: string
  type: TypeUser | ''
}

export interface UserCredentials {
  email: string
  password: string
}

export enum EGenre {
  Male = 'Male',
  Female = 'Female',
}

export enum TypeUser {
  Admin = 'Admin',
  User = 'User',
}
