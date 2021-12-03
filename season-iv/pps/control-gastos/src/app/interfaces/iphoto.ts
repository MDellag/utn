export interface IPhoto {
    likes: number
    pplLiked: string[]
    author: string
    photo: string
    date: number | Date | string
    type: ETypePhoto
    id: string
}

export interface IUserPhotos {
    id: string
    name: string
    photos: IPhoto[]
}

export enum ETypePhoto {
    Lindo = 'Lindo',
    Feo = 'Feo',
}
