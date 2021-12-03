import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { AudioService } from '../services/audio.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    toppings = new FormControl()
    temas = new FormControl()
    valor: any
    toppingList: string[] = ['Español', 'Ingles', 'Portugues']
    temaList: string[] = ['Colores', 'Numeros', 'Animales']

    languaje = 'Español'
    topic = 'Colores'

    btn1 = 'Uno'
    btn2 = 'Dos'
    btn3 = 'Tres'
    btn4 = 'Cuatro'
    btn5 = 'Cinco'

    data = {
        Español: { Colores: {}, Numeros: {}, Animales: {} },
        Ingles: { Colores: {}, Numeros: {}, Animales: {} },
        Portugues: { Colores: {}, Numeros: {}, Animales: {} },
    }

    nameButtons = {
        Colores: 'Rojo',
    }
    constructor(private audio: AudioService) {}

    playSound1() {
        switch (this.languaje) {
            case 'Español':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('rojo')
                        break
                    case 'Numeros':
                        this.audio.play('uno')
                        break
                    case 'Animales':
                        this.audio.play('leon')
                        break
                }
                break
            case 'Portugues':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('vermello')
                        break
                    case 'Numeros':
                        this.audio.play('um')
                        break
                    case 'Animales':
                        this.audio.play('leoun')
                        break
                }
                break
            case 'Ingles':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('red')
                        break
                    case 'Numeros':
                        this.audio.play('one')
                        break
                    case 'Animales':
                        this.audio.play('lion')
                        break
                }
                break
        }
    }

    playSound2() {
        switch (this.languaje) {
            case 'Español':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('violeta')
                        break
                    case 'Numeros':
                        this.audio.play('dos')
                        break
                    case 'Animales':
                        this.audio.play('perro')
                        break
                }
            case 'Portugues':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('violetta')
                        break
                    case 'Numeros':
                        this.audio.play('dois')
                        break
                    case 'Animales':
                        this.audio.play('cachorro')
                        break
                }
                break
            case 'Ingles':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('violet')
                        break
                    case 'Numeros':
                        this.audio.play('two')
                        break
                    case 'Animales':
                        this.audio.play('dog')
                        break
                }
                break
        }
    }

    playSound3() {
        switch (this.languaje) {
            case 'Español':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('verde')
                        break
                    case 'Numeros':
                        this.audio.play('tres')
                        break
                    case 'Animales':
                        this.audio.play('gato')
                        break
                }
                break
            case 'Portugues':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('veirde')
                        break
                    case 'Numeros':
                        this.audio.play('tris')
                        break
                    case 'Animales':
                        this.audio.play('gaato')
                        break
                }
                break
            case 'Ingles':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('green')
                        break
                    case 'Numeros':
                        this.audio.play('three')
                        break
                    case 'Animales':
                        this.audio.play('cat')
                        break
                }
                break
        }
    }

    playSound4() {
        switch (this.languaje) {
            case 'Español':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('naranja')
                        break
                    case 'Numeros':
                        this.audio.play('cuatro')
                        break
                    case 'Animales':
                        this.audio.play('pez')
                        break
                }
                break
            case 'Portugues':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('laranja')
                        break
                    case 'Numeros':
                        this.audio.play('quatro')
                        break
                    case 'Animales':
                        this.audio.play('peixe')
                        break
                }
                break
            case 'Ingles':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('orange')
                        break
                    case 'Numeros':
                        this.audio.play('four')
                        break
                    case 'Animales':
                        this.audio.play('fish')
                        break
                }
                break
        }
    }

    playSound5() {
        switch (this.languaje) {
            case 'Español':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('azul')
                        break
                    case 'Numeros':
                        this.audio.play('cinco')
                        break
                    case 'Animales':
                        this.audio.play('ave')
                        break
                }
                break
            case 'Portugues':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('azoul')
                        break
                    case 'Numeros':
                        this.audio.play('cimco')
                        break
                    case 'Animales':
                        this.audio.play('passaro')
                        break
                }
                break
            case 'Ingles':
                switch (this.topic) {
                    case 'Colores':
                        this.audio.play('blue')
                        break
                    case 'Numeros':
                        this.audio.play('five')
                        break
                    case 'Animales':
                        this.audio.play('bird')
                        break
                }
                break
        }
    }

    changeBtn(value) {
        console.log(value)
        switch (value) {
            case 'Colores':
                this.topic = 'Colores'
                switch (this.languaje) {
                    case 'Español':
                        this.btn1 = 'Rojo'
                        this.btn2 = 'Violeta'
                        this.btn3 = 'Verde'
                        this.btn4 = 'Naranja'
                        this.btn5 = 'Azul'
                        break
                    case 'Ingles':
                        this.btn1 = 'Red'
                        this.btn2 = 'Violet'
                        this.btn3 = 'Green'
                        this.btn4 = 'Orange'
                        this.btn5 = 'Blue'
                        break
                    case 'Portugues':
                        this.btn1 = 'Vermelho'
                        this.btn2 = 'Violeta'
                        this.btn3 = 'Verde'
                        this.btn4 = 'Laranja'
                        this.btn5 = 'Azul'
                        break
                }
                break
            case 'Numeros':
                this.topic = 'Numeros'
                switch (this.languaje) {
                    case 'Español':
                        this.btn1 = 'Uno'
                        this.btn2 = 'Dos'
                        this.btn3 = 'Tres'
                        this.btn4 = 'Cuatro'
                        this.btn5 = 'Cinco'
                        break
                    case 'Ingles':
                        this.btn1 = 'One'
                        this.btn2 = 'Two'
                        this.btn3 = 'Three'
                        this.btn4 = 'Four'
                        this.btn5 = 'Five'
                        break
                    case 'Portugues':
                        this.btn1 = 'Um'
                        this.btn2 = 'Dois'
                        this.btn3 = 'Três'
                        this.btn4 = 'Quatro'
                        this.btn5 = 'Cinco'
                        break
                }
                break
            case 'Animales':
                this.topic = 'Animales'
                switch (this.languaje) {
                    case 'Español':
                        this.btn1 = 'Leon'
                        this.btn2 = 'Perro'
                        this.btn3 = 'Gato'
                        this.btn4 = 'Pez'
                        this.btn5 = 'Ave'
                        break
                    case 'Ingles':
                        this.btn1 = 'Lion'
                        this.btn2 = 'Dog'
                        this.btn3 = 'Cat'
                        this.btn4 = 'Fish'
                        this.btn5 = 'Bird'
                        break
                    case 'Portugues':
                        this.btn1 = 'Leão'
                        this.btn2 = 'Cachorro'
                        this.btn3 = 'Gato'
                        this.btn4 = 'Peixe'
                        this.btn5 = 'Pássaro'
                        break
                }
                break
            case 'Español':
                this.languaje = 'Español'
                switch (this.topic) {
                    case 'Colores':
                        this.btn1 = 'Rojo'
                        this.btn2 = 'Violeta'
                        this.btn3 = 'Verde'
                        this.btn4 = 'Naranja'
                        this.btn5 = 'Azul'
                        break
                    case 'Numeros':
                        this.btn1 = 'Uno'
                        this.btn2 = 'Dos'
                        this.btn3 = 'Tres'
                        this.btn4 = 'Cuatro;'
                        this.btn5 = 'Cinco'
                        break
                    case 'Animales':
                        this.btn1 = 'Leon'
                        this.btn2 = 'Perro'
                        this.btn3 = 'Gato'
                        this.btn4 = 'Pez'
                        this.btn5 = 'Ave'
                        break
                }
                break

            case 'Ingles':
                this.languaje = 'Ingles'
                switch (this.topic) {
                    case 'Colores':
                        this.btn1 = 'Red'
                        this.btn2 = 'Violet'
                        this.btn3 = 'Green'
                        this.btn4 = 'Orange'
                        this.btn5 = 'Blue'
                        break
                    case 'Numeros':
                        this.btn1 = 'One'
                        this.btn2 = 'Two'
                        this.btn3 = 'Three'
                        this.btn4 = 'Four'
                        this.btn5 = 'Five'
                        break
                    case 'Animales':
                        this.btn1 = 'Lion'
                        this.btn2 = 'Dog'
                        this.btn3 = 'Cat'
                        this.btn4 = 'Fish'
                        this.btn5 = 'Bird'
                        break
                }
                break
            case 'Portugues':
                this.languaje = 'Portugues'
                switch (this.topic) {
                    case 'Colores':
                        this.btn1 = 'Vermelho'
                        this.btn2 = 'Roxo'
                        this.btn3 = 'Verde'
                        this.btn4 = 'Laranja'
                        this.btn5 = 'Azul'
                        break
                    case 'Numeros':
                        this.btn1 = 'Um'
                        this.btn2 = 'Dois'
                        this.btn3 = 'Três'
                        this.btn4 = 'Quatro'
                        this.btn5 = 'Cinco'
                        break
                    case 'Animales':
                        this.btn1 = 'Leão'
                        this.btn2 = 'Cachorro'
                        this.btn3 = 'Gato'
                        this.btn4 = 'Peixe'
                        this.btn5 = 'Pássaro'
                        break
                }
                break
        }
    }
}
