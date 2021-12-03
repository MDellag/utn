import { Injectable } from '@angular/core'
import { NativeAudio } from '@ionic-native/native-audio/ngx'

interface Sound {
    key: string
    asset: string
}

@Injectable({
    providedIn: 'root',
})
export class AudioService {
    private sounds: Sound[] = []
    private audioPlayer: HTMLAudioElement = new Audio()
    private forceWebAudio = false

    constructor(private nativeAudio: NativeAudio) {
        this.preload('azul', 'assets/sounds/spanish/colors/azul.ogg')
        this.preload('naranja', 'assets/sounds/spanish/colors/naranja.ogg')
        this.preload('rojo', 'assets/sounds/spanish/colors/rojo.ogg')
        this.preload('verde', 'assets/sounds/spanish/colors/verde.ogg')
        this.preload('violeta', 'assets/sounds/spanish/colors/violeta.ogg')

        this.preload('uno', 'assets/sounds/spanish/numbers/uno.ogg')
        this.preload('dos', 'assets/sounds/spanish/numbers/dos.ogg')
        this.preload('tres', 'assets/sounds/spanish/numbers/tres.ogg')
        this.preload('cuatro', 'assets/sounds/spanish/numbers/cuatro.ogg')
        this.preload('cinco', 'assets/sounds/spanish/numbers/cinco.ogg')

        this.preload('ave', 'assets/sounds/spanish/animals/ave.ogg')
        this.preload('gato', 'assets/sounds/spanish/animals/gato.ogg')
        this.preload('leon', 'assets/sounds/spanish/animals/leon.ogg')
        this.preload('perro', 'assets/sounds/spanish/animals/perro.ogg')
        this.preload('pez', 'assets/sounds/spanish/animals/pez.ogg')

        this.preload('blue', 'assets/sounds/english/colors/blue.ogg')
        this.preload('red', 'assets/sounds/english/colors/red.ogg')
        this.preload('violet', 'assets/sounds/english/colors/violet.ogg')
        this.preload('orange', 'assets/sounds/english/colors/orange.ogg')
        this.preload('green', 'assets/sounds/english/colors/green.ogg')

        this.preload('one', 'assets/sounds/english/numbers/one.ogg')
        this.preload('two', 'assets/sounds/english/numbers/two.ogg')
        this.preload('three', 'assets/sounds/english/numbers/three.ogg')
        this.preload('four', 'assets/sounds/english/numbers/four.ogg')
        this.preload('five', 'assets/sounds/english/numbers/five.ogg')

        this.preload('lion', 'assets/sounds/english/animals/lion.ogg')
        this.preload('dog', 'assets/sounds/english/animals/dog.ogg')
        this.preload('cat', 'assets/sounds/english/animals/cat.ogg')
        this.preload('fish', 'assets/sounds/english/animals/fish.ogg')
        this.preload('bird', 'assets/sounds/english/animals/bird.ogg')

        this.preload('leoun', 'assets/sounds/portuguese/animals/leoun.ogg')
        this.preload(
            'cachorro',
            'assets/sounds/portuguese/animals/cachorro.ogg'
        )
        this.preload('gaato', 'assets/sounds/portuguese/animals/gaato.ogg')
        this.preload('passaro', 'assets/sounds/portuguese/animals/passaro.ogg')
        this.preload('peixe', 'assets/sounds/portuguese/animals/peixe.ogg')

        this.preload('azoul', 'assets/sounds/portuguese/colors/azul.ogg')
        this.preload('laranja', 'assets/sounds/portuguese/colors/laranja.ogg')
        this.preload('veirde', 'assets/sounds/portuguese/colors/verde.ogg')
        this.preload('vermello', 'assets/sounds/portuguese/colors/vermello.ogg')
        this.preload('violetta', 'assets/sounds/portuguese/colors/violeta.ogg')

        this.preload('um', 'assets/sounds/portuguese/numbers/um.ogg')
        this.preload('dois', 'assets/sounds/portuguese/numbers/dois.ogg')
        this.preload('tris', 'assets/sounds/portuguese/numbers/tris.ogg')
        this.preload('quatro', 'assets/sounds/portuguese/numbers/quatro.ogg')
        this.preload('cimco', 'assets/sounds/portuguese/numbers/cimco.ogg')
    }

    preload(key: string, asset: string): void {
        if (!this.sounds.filter((sound) => sound.key === key).length) {
            if (!this.forceWebAudio) {
                this.nativeAudio.preloadSimple(key, asset)
                this.sounds.push({
                    key: key,
                    asset: asset,
                })
            } else {
                const audio = new Audio()
                audio.src = asset
                this.sounds.push({
                    key: key,
                    asset: asset,
                })
            }
        }
        console.log(this.sounds)
    }

    play(key: string): boolean {
        const soundToPlay: Sound = this.sounds.find(
            (sound) => sound.key === key
        )

        if (soundToPlay) {
            this.audioPlayer.src = soundToPlay.asset
            this.audioPlayer.play().catch(() => {})
            return true
        } else {
            return false
        }
    }
}
