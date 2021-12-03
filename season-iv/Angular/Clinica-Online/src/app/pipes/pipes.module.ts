import { NgModule } from '@angular/core'
import { UnixToHourPipe } from './unix-to-hour.pipe'
import { UnixToDayPipe } from './unix-to-day.pipe'
import { ToLowerFirstUpperPipe } from './to-lower-first-upper.pipe'

const pipes = [UnixToHourPipe, UnixToDayPipe, ToLowerFirstUpperPipe]
@NgModule({
  declarations: [pipes],
  imports: [],
  providers: [],
  exports: [pipes],
})
export class PipesModule {}
