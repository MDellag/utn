import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { TypeUser } from '../interfaces/iuser'
import { AuthService } from '../services/auth.service'
import { MotionService } from '../services/motion.service'
import { NotificationsService } from '../services/notifications.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    usuarios: any = []
    isAdmin: boolean
    constructor(
        private auth: AuthService,
        private router: Router,
        private notif: NotificationsService,
        private motion: MotionService,
        private dialog: MatDialog
    ) {
        console.log(AuthService.user)
        console.log(AuthService.user.type === TypeUser.Admin)
        this.isAdmin = AuthService.user.type === TypeUser.Admin
    }

    async openDialog() {
        const dialogRef = this.dialog.open(TurnOffDialog)

        dialogRef.afterClosed().subscribe(async (result) => {})
    }

    logOut() {
        this.auth.logOut()
        this.router.navigate(['login'])
    }

    ir() {
        this.router.navigate(['altas'])
    }
    ngOnInit() {
        this.auth.getUsersObv().subscribe((users: any) => {
            this.usuarios = []
            users.forEach((user: any) => {
                if (!this.usuarios.find((e) => e.id === user.id)) {
                    this.usuarios.push(user)
                }
            })

            console.log(this.usuarios)
        })
    }
}

@Component({
    selector: 'turn-off-dialog',
    templateUrl: 'turn-off-dialog.html',
})
export class TurnOffDialog {
    public password = ''
    constructor(
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<TurnOffDialog>
    ) {}

    submitPassword() {
        console.log(this.password)
        this.dialogRef.close(this.password)
    }
}
