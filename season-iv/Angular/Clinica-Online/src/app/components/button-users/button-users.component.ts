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
  selector: 'app-button-users',
  templateUrl: './button-users.component.html',
  styleUrls: ['./button-users.component.scss'],
})
export class ButtonUsersComponent implements OnInit, OnChanges {
  @Input('users') users!: IUser[]
  @Input('roundButton') rounded: boolean = false
  @Output('user') userOutput: EventEmitter<IUser> = new EventEmitter()

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {}

  emitSelectedUser(user: IUser) {
    this.userOutput.emit(user)
  }

  ngOnInit(): void {}
}
