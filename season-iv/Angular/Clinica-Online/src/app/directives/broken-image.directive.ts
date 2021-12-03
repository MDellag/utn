import { Directive, ElementRef, HostListener, OnInit } from '@angular/core'

@Directive({
  selector: '[appBrokenImage]',
})
export class BrokenImageDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const img = this.elementRef.nativeElement
  }

  @HostListener('error')
  loadImageByDefault() {
    const element = this.elementRef.nativeElement
    element.src =
      'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
  }
}
