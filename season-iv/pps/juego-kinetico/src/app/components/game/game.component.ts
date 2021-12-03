import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    Renderer2,
} from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'
import {
    DeviceMotion,
    DeviceMotionAccelerationData,
} from '@ionic-native/device-motion/ngx'

import { find, reverse } from 'lodash'
import { Router } from '@angular/router'
import { HomePage } from 'src/app/home/home.page'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    animations: [trigger('moveIZQ', [state('movingIzq', style({}))])],
})
export class GameComponent implements OnInit {
    character = ''
    public static subsc: any
    isUp: boolean = false
    isDown: boolean = true
    isLeft: boolean = false
    isRight: boolean = false

    gameStarted: boolean = false
    countdown: string = '00:00:00'
    countdown2: number = 0
    countDownInterval: any
    @ViewChild('canvas') canvas: ElementRef
    @ViewChild('personaje') personaje: ElementRef

    constructor(
        private renderer: Renderer2,
        private motion: DeviceMotion,
        private router: Router,
        private auth: AuthService
    ) {
        this.character = HomePage.personaje
    }

    position() {
        console.log(
            'PERSONAJE',
            this.personaje.nativeElement.getBoundingClientRect()
        )
    }

    moveDown() {
        const { x, y } = this.personaje.nativeElement.getBoundingClientRect()
        const moveY = `top: ${y + 2}px; left: ${x}px;`
        this.renderer.setAttribute(this.personaje.nativeElement, 'style', moveY)
    }
    moveUp() {
        const { x, y } = this.personaje.nativeElement.getBoundingClientRect()
        const moveY = `top: ${y - 2}px; left: ${x}px;`
        this.renderer.setAttribute(this.personaje.nativeElement, 'style', moveY)
    }

    moveLeft() {
        const { x, y } = this.personaje.nativeElement.getBoundingClientRect()
        const moveY = `left: ${x + 2}px;  top: ${y}px;`
        this.renderer.setAttribute(this.personaje.nativeElement, 'style', moveY)
    }
    moveRight() {
        const { x, y } = this.personaje.nativeElement.getBoundingClientRect()
        const moveY = `left: ${x - 2}px; top: ${y}px;`
        this.renderer.setAttribute(this.personaje.nativeElement, 'style', moveY)
    }

    /**
     * @VerticalUp x: 0, y: 7, z: 5
     * @VerticalDown x: 0, y: 9, z: 5
     * @HorizontalLeft x: 3, y: 9, z: 5
     * @HorizontalRight x: -3, y: 9, z: 5
     */
    async watchAcceleration() {
        this.startCountdown()
        GameComponent.subsc = this.motion
            .watchAcceleration({ frequency: 5 })
            .subscribe((acceleration: DeviceMotionAccelerationData) => {
                const data =
                    this.personaje.nativeElement.getBoundingClientRect()
                const { x, y, z } = acceleration
                if (y < 9) {
                    this.moveUp()
                } else if (y > 9) {
                    this.moveDown()
                }
                if (x < 0) {
                    this.moveLeft()
                } else if (x > 0) {
                    this.moveRight()
                }
                if (data.x < -1 || data.x > 350 || data.y < 1 || data.y > 712) {
                    GameComponent.subsc.unsubscribe()
                    this.gameStarted = false
                    this.stopGame()
                }
            })
    }

    startGame() {
        this.countdown = '00:00:00'
        this.countdown2 = 0
        const moveY = `left: 45%; top: 45%;`
        this.renderer.setAttribute(this.personaje.nativeElement, 'style', moveY)
        this.watchAcceleration()
        this.gameStarted = true
    }

    stopGame() {
        clearInterval(this.countDownInterval)
        this.auth.saveGameData(this.countdown)
    }

    logOut() {
        HomePage.personaje = ''
        this.router.navigate(['home'])
    }

    startCountdown() {
        this.countDownInterval = setInterval(() => {
            this.countdown2 += 1

            const [um = '0', dm = '0', us = '0', ds = '0'] = reverse(
                this.countdown2.toString().split('')
            )

            this.countdown = `00:${ds}${us}:${dm}${um}`
        }, 10)
    }

    ngOnInit() {
        // this.startCountdown()
    }
}
