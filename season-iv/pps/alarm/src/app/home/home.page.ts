import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { MotionService } from '../services/motion.service'
import { NotificationsService } from '../services/notifications.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    private turnOn: boolean = false
    buttonName = 'Activar'
    constructor(
        private auth: AuthService,
        private router: Router,
        private notif: NotificationsService,
        private motion: MotionService,
        private dialog: MatDialog
    ) {}

    alarm(): void {
        // this.turnOn ? (this.turnOn = false) : (this.turnOn = true)
        console.log('Activated: ', this.turnOn)

        if (!this.turnOn) {
            this.turnOn = true
            this.motion.watchAcceleration(this.turnOn)
            this.buttonName = 'Desactivar'
            this.notif.notificationSuccess('Alarma Encendida!')
        } else {
            this.openDialog()
        }
    }

    async openDialog() {
        const dialogRef = this.dialog.open(TurnOffDialog)

        dialogRef.afterClosed().subscribe(async (result) => {
            console.log(result)
            if (result === AuthService.user.password) {
                this.motion.watchAcceleration(false)
                this.turnOn = false
                this.buttonName = 'Activar'
                this.notif.notificationSuccess('Alarma Apagada!')
            } else {
                this.notif.notificationError('Clave Incorrecta!!')
            }
        })
    }

    logOut() {
        this.auth.logOut()
        this.router.navigate(['login'])
    }

    ngOnInit() {
        // this.motion.getAcceleration()
        // this.motion.watchAcceleration()
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
