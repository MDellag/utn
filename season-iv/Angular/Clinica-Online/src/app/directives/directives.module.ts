import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfilePhotoDirective } from './profile-photo.directive'
import { BrokenImageDirective } from './broken-image.directive'
import { RandomColorDirective } from './random-color.directive'

const directives = [
  ProfilePhotoDirective,
  BrokenImageDirective,
  RandomColorDirective,
]
@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives],
})
export class DirectivesModule {}
