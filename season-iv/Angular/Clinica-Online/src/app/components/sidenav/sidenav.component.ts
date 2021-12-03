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

  logOut() {
    this.auth.logOut()
    this.router.navigate(['/login'])
  }

  redirect(url: string) {
    this.games[url]()
  }

  isLogged() {
    const user = this.auth.getUserCred()
    this.name = user?.name || ''
    this.email = user?.email || ''
  }

  ngOnInit(): void {
    this.loggedIn = this.auth.isLoggedIn()
    this.isLogged()
    this.auth.subjectLoggedIn.subscribe((value) => {
      this.loggedIn = value
      this.isLogged()
    })
  }
}
