import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { IUser } from 'src/app/interfaces/users'

@Component({
  selector: 'app-card-users',
  templateUrl: './card-users.component.html',
  styleUrls: ['./card-users.component.scss'],
})
export class CardUsersComponent implements OnInit, OnChanges {
  @Input('users') users!: IUser[]
  @Output('disableEnable') userDisable: EventEmitter<string> =
    new EventEmitter()
  @Output('clickedUser') selected: EventEmitter<IUser> = new EventEmitter()

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.users = changes.users.currentValue
  }

  handleEnableDisable(dni: string) {
    this.userDisable.emit(dni)
  }

  handleSelected(user: IUser) {
    this.selected.emit(user)
  }

  ngOnInit(): void {}
}
