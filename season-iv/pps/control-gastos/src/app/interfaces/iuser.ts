export interface IUser {
    id: string
    mail: string
    password: string
    name: string
    type: TypeUser | ''
    genre: EGenre | ''
}

export enum EGenre {
    Male = 'Male',
    Female = 'Female',
}

export enum TypeUser {
    Admin = 'Admin',
    Invitado = 'Invitado',
    Usuario = 'Usuario',
    Anonimo = 'Anonimo',
    Tester = 'Tester',
}
