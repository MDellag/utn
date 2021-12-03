import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  sidebar_opened: boolean = false
  chatOpened: boolean = false
  public static chatSubject: Subject<boolean> = new Subject<boolean>()
  loggedIn: boolean = false
  name: string = ''
  email: string = ''

  private games: { [key: string]: () => void } = {
    home: () => this.router.navigate(['home']),
    me: () => this.router.navigate(['me']),
  }

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  openSideBar() {
    this.sidebar_opened = !this.sidebar_opened
  }

  toggleChat() {
    SidenavComponent.chatSubject.next(!this.chatOpened)
    this.chatOpened = !this.chatOpened
  }

  logOut() {
    this.auth.logOut()
    this.games['me']()
  }

  redirect(url: string) {
    this.games[url]()
  }

  ngOnInit(): void {
    this.auth.subjectLoggedIn.subscribe((value) => {
      this.loggedIn = value
      this.name = AuthService.user.name
      this.email = AuthService.user.email
    })
  }
}
