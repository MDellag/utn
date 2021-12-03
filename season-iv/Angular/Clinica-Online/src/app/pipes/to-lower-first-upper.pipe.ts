import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'toLowerFirstUpper',
})
export class ToLowerFirstUpperPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): any {
    const toLower: string = value.toLowerCase()
    const firstToUpper = toLower[0].toUpperCase() + toLower.slice(1)
    return firstToUpper
  }
}
