import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'unixToHour',
})
export class UnixToHourPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): any {
    return moment
      .utc(parseInt(value))
      .zone(+3)
      .format('LT')
  }
}
