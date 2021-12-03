export interface Turno {
  id: string
  id_paciente: string
  id_especialista: string
  name_especialista: string
  name_paciente: string
  especialidad: string
  date: string
  status: TurnoStatus
  accepted: boolean
  resena?: string
  cancel_comment?: string
}

export interface Date {
  month: number
  day: number
  hour: string
}

export enum TurnoStatus {
  PENDIENTE = 'PENDIENTE',
  CANCELADO = 'CANCELADO',
  REALIZADO = 'REALIZADO',
  RECHAZADO = 'RECHAZADO',
}
