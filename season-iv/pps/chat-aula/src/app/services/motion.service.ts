import { Injectable } from '@angular/core'
import {
    DeviceMotion,
    DeviceMotionAccelerationData,
} from '@ionic-native/device-motion/ngx'
import { AudioService } from './audio.service'
import { Haptics } from '@capacitor/haptics'
import { Flashlight } from '@ionic-native/flashlight/ngx'
// import * from 'capacitor-flashlight'

@Injectable({
    providedIn: 'root',
})
export class MotionService {
    public static subsc: any
    public static izq: boolean
    public static der: boolean
    public static vert: boolean

    constructor(
        private motion: DeviceMotion,
        private audio: AudioService,
        private flashlight: Flashlight
    ) {}

    getAcceleration() {
        this.motion
            .getCurrentAcceleration()
            .then((acceleration: DeviceMotionAccelerationData) => {
                console.log(acceleration)
            })
    }

    async watchAcceleration(watch: boolean) {
        if (watch) {
            MotionService.subsc = this.motion
                .watchAcceleration({ frequency: 1000 })
                .subscribe((acceleration: DeviceMotionAccelerationData) => {
                    console.log(acceleration)

                    if (
                        !MotionService.izq &&
                        //HORIZONTAL IZQ
                        acceleration.x > 6 &&
                        acceleration.x < 12 &&
                        acceleration.y > -2 &&
                        acceleration.y < 2 &&
                        acceleration.z > -1 &&
                        acceleration.z < 3
                    ) {
                        MotionService.izq = true
                        this.audio.play('mestanafanando')
                        Haptics.vibrate({ duration: 5000 })
                    } else if (
                        //VERTICAL
                        !MotionService.vert &&
                        acceleration.x > -1 &&
                        acceleration.x < 1 &&
                        acceleration.y > 8 &&
                        acceleration.y < 11 &&
                        acceleration.z > -1 &&
                        acceleration.z < 3
                    ) {
                        MotionService.vert = true
                        this.audio.play('alarma')
                        this.flashlight.switchOn()

                        setTimeout(() => {
                            this.flashlight.switchOff()
                        }, 5000)
                    } else if (
                        //HORIZONTAL DER
                        !MotionService.der &&
                        acceleration.x > -11 &&
                        acceleration.x < -8 &&
                        acceleration.y > -1 &&
                        acceleration.y < 2 &&
                        acceleration.z > -1 &&
                        acceleration.z < 3
                    ) {
                        MotionService.der = true
                        this.audio.play('questas')
                    } else {
                        MotionService.der = false
                        MotionService.izq = false
                        MotionService.vert = false
                        // this.flashlight.switchOff()
                    }
                })
        } else if (!watch) {
            MotionService.subsc.unsubscribe()
        }
    }
}
