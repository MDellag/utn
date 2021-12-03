import { Component, OnInit } from '@angular/core'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayChat: boolean = false
  loggedIn: boolean = false
  title = 'tp-i-labiv'

  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {
    SidenavComponent.chatSubject.subscribe(
      (value) => (this.displayChat = value)
    )

    this.auth.subjectLoggedIn.subscribe((value) => {
      this.loggedIn = value
    })
  }
}
