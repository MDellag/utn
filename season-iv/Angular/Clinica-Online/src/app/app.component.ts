import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { fader } from './route-animations'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader],
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false
  title = 'clinica-online'

  constructor(private readonly auth: AuthService) {
    this.auth.isLoggedIn()
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }

  ngOnInit(): void {
    this.auth.subjectLoggedIn.subscribe((value) => {
      this.loggedIn = value
    })
  }
}
