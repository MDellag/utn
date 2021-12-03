import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormatHourDirective } from './format-hour.directive'
import { RandomColorDirective } from './random-color.directive'

@NgModule({
  declarations: [FormatHourDirective, RandomColorDirective],
  imports: [CommonModule],
  exports: [FormatHourDirective, RandomColorDirective],
})
export class DirectivesModule {}
