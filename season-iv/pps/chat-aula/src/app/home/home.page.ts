import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { ChatComponent } from '../components/chat/chat.component'
import { AuthService } from '../services/auth.service'
import { MotionService } from '../services/motion.service'
import { NotificationsService } from '../services/notifications.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(
        private auth: AuthService,
        private router: Router,
        private notif: NotificationsService,
        private motion: MotionService,
        private dialog: MatDialog
    ) {}

    async openDialog() {
        const dialogRef = this.dialog.open(TurnOffDialog)

        dialogRef.afterClosed().subscribe(async (result) => {})
    }

    logOut() {
        this.auth.logOut()
        this.router.navigate(['login'])
    }

    ir(wher: string) {
        ChatComponent.curso = ''
        if (wher === 'b') {
            ChatComponent.curso = '4toB'
            ChatComponent.style2 = 'background-color: var(--main-theme-4b)'
        } else {
            ChatComponent.curso = '4toA'
            ChatComponent.style2 = 'background-color: var(--main-theme-4a)'
        }
        this.router.navigate(['chat'])
    }
    ngOnInit() {}
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
