import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core'
import * as moment from 'moment'

@Directive({
  selector: '[formatHour]',
})
export class FormatHourDirective implements AfterViewInit {
  nativEl = this.elementRef.nativeElement

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterViewInit() {
    const timestamp = this.nativEl.textContent
    this.nativEl.textContent = moment
      .utc(parseInt(timestamp))
      .zone(+3)
      .format('LT')
  }
}
