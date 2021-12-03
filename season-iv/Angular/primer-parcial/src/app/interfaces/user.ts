export interface Repartidor {
  dni: number;
  nombre: string;
  edad: number;
  capacidad: number;
  paisOrigen: string;
  unidadPropia: boolean;
  paisProducto: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  type: string;
}

export interface Credentials {
  email: string;
  password: string;
}
