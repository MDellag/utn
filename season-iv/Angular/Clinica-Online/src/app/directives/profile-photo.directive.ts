import { AfterViewInit, Directive, ElementRef } from '@angular/core'
import { PerfilComponent } from '../pages/perfil/perfil.component'

@Directive({
  selector: '[appProfilePhoto]',
})
export class ProfilePhotoDirective implements AfterViewInit {
  nativEl = this.elementRef.nativeElement

  constructor(
    private readonly profile: PerfilComponent,
    private readonly elementRef: ElementRef
  ) {
    this.profile.photoSubject.subscribe((photo: string) => {
      this.nativEl.setAttribute('style', `background-image: url(${photo})`)
    })
  }

  ngAfterViewInit() {}
}
