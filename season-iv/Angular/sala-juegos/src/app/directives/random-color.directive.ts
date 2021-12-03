import { AfterViewInit, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[appRandomColor]',
})
export class RandomColorDirective implements AfterViewInit {
  nativEl = this.elementRef.nativeElement

  constructor(private readonly elementRef: ElementRef) {}

  getRandomColor() {
    return 'hsl(' + Math.random() * 360 + ', 100%, 75%)'
  }

  ngAfterViewInit() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    this.nativEl.setAttribute('style', `background: ${this.getRandomColor()}`)
  }
}
