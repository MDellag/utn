import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { MotionService } from '../services/motion.service'
import { NotificationsService } from '../services/notifications.service'
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    animations: [trigger('moveIMG', [state('moving', style({}))])],
})
export class HomePage implements OnInit {
    private turnOn: boolean = false
    buttonName = 'Activar'
    public static personaje = ''
    records: any[] = []
    show = false
    constructor(
        private auth: AuthService,
        private router: Router,
        private notif: NotificationsService,
        private motion: MotionService,
        private dialog: MatDialog
    ) {}

    get stateName() {
        return this.show ? 'show' : 'hide'
    }

    toggle() {
        this.show = !this.show
    }

    async openDialog() {
        const dialogRef = this.dialog.open(TurnOffDialog)

        dialogRef.afterClosed().subscribe(async (result) => {
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

    Character(charact: string) {
        if (charact === 'dc') {
            HomePage.personaje = 'assets/img/superman.png'
        } else if (charact === 'mv') {
            HomePage.personaje = 'assets/img/thor.png'
        }
        this.router.navigate(['game'])
    }
    ngOnInit() {
        this.auth.getGameData().subscribe((data: any) => {
            this.records = []
            data.forEach((score: any) => {
                if (!this.records.find((e) => e.id === score.id)) {
                    this.records.push(score)
                }
            })

            this.records = this.records.sort(function (a, b) {
                return ('' + b.record).localeCompare(a.record)
            })

            this.records = this.records.slice(0, 3)
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
