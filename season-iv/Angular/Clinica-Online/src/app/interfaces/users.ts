export interface IUser {
  dni: string
  email: string
  name: string
  lastname: string
  password: string
  type: TypeUser
  photo: string[]
  especialidad?: string[]
  obraSocial?: ObraSocial | ''
  approved: boolean
}

export interface UserCredentials {
  email: string
  password: string
}

export enum Genre {
  Male = 'Male',
  Female = 'Female',
}

export enum TypeUser {
  ADMIN = 'ADMIN',
  SPECIALIST = 'SPECIALIST',
  PATIENT = 'PATIENT',
}

export enum ObraSocial {
  OSDE = 'OSDE',
  PAMI = 'PAMI',
  IOMA = 'IOMA',
  GALENO = 'GALENO',
  NONE = 'NONE',
}
