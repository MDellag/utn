import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'unixToDay',
})
export class UnixToDayPipe implements PipeTransform {
  private readonly MONTHS: any = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  }

  transform(value: any, ...args: unknown[]): unknown {
    const timestamp = parseInt(value)
    const date = new Date(timestamp)
    return `${date.getDate()} - ${this.MONTHS[date.getMonth() + 1]}`
  }
}
