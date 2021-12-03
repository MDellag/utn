import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Subject } from 'rxjs'
import { DialogComponent } from 'src/app/components/dialog/dialog.component'
import { TypeGame } from 'src/app/interfaces/game'
import { AuthService } from 'src/app/services/auth.service'
import { GameService } from 'src/app/services/game.service'

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent implements OnInit, AfterViewInit {
  @ViewChild('draw') draw!: ElementRef<HTMLCanvasElement>
  context!: CanvasRenderingContext2D
  resWord: string = ''
  word!: string[]
  encryptedWord: string[] = []
  tries: number = 6
  score: number = 0
  drawedGuy: any = {
    5: () => this.drawHead(),
    4: () => this.drawLeftArm(),
    3: () => this.drawRightArm(),
    2: () => this.drawBody(),
    1: () => this.drawLeftLeg(),
    0: () => this.drawRightLeg(),
  }
  private abc: any = {}

  teclado: string[] = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]

  palabras: string[] = [
    'casa',
    'heladera',
    'parrilla',
    'galpon',
    'computadora',
    'laptop',
    'silla',
    'escritorio',
    'puerta',
    'monitor',
    'pizza',
    'css',
    'whatsapp',
    'bitcoin',
  ]

  constructor(
    private readonly dialog: MatDialog,
    private readonly gameService: GameService
  ) {
    this.generateWord()
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.context = this.draw.nativeElement.getContext('2d')!
  }

  addLetter(letter: string) {
    if (this.tries > 0 && !this.abc[letter]) {
      this.abc[letter] = letter
      this.existsLetter(letter)
      this.score += 5
      if (this.checkForOne(this.word)) {
        this.displayDialog(
          'success',
          'You Win!',
          `Continue to increment your score! \n Score: ${this.score}`
        )
        this.reset()
      }
    }
  }

  checkForOne(arr: string[]) {
    return new Set(arr).size === 1
  }

  existsLetter(letter: string) {
    if (!this.word.find((e) => e === letter)) {
      this.tries--
      this.drawedGuy[this.tries]()

      if (this.tries === 0) {
        this.displayDialog(
          'error',
          "You've lost!",
          `The guy is already hanged! \n The word was: ${this.resWord.toUpperCase()}`
        )
        this.lost()
      }
      return
    }

    while (this.word.find((e) => e === letter)) {
      const idx = this.word.findIndex((e) => e === letter)
      this.encryptedWord[idx] = letter
      this.word[idx] = '!'
    }
  }

  lost() {
    this.reset()
    this.score = 0
  }

  reset() {
    this.gameService.updateScore({
      id: AuthService.user.id,
      score: this.score,
      game: TypeGame.AHORCADO,
      updatedAt: Date.now(),
    })
    this.tries = 6
    this.resWord = ''
    this.context.clearRect(
      0,
      0,
      this.draw.nativeElement.width,
      this.draw.nativeElement.height
    )

    this.abc = {}
    this.generateWord()
  }

  generateWord() {
    this.word =
      this.palabras[Math.floor(Math.random() * this.palabras.length)].split('')
    this.encryptedWord = []

    for (let i = 0; i < this.word.length; i++) {
      this.resWord += this.word[i]
      this.encryptedWord.push('_')
    }
  }

  displayDialog(type: string, header: string, message: string) {
    this.dialog.open(DialogComponent, {
      data: { header, message, type },
      panelClass: type === 'error' ? 'gradientRed' : 'gradientGreen',
    })
  }

  drawSmth() {
    this.drawHead()
    this.drawLeftArm()
    this.drawRightArm()
    this.drawBody()
    this.drawLeftLeg()
    this.drawRightLeg()
  }

  drawHead() {
    const radius = this.draw.nativeElement.height / 10
    this.context.beginPath()
    this.context.moveTo(150, 20)
    this.context.arc(150, 20, radius, 0, 2 * Math.PI, false)
    this.context.strokeStyle = 'white'
    this.context.lineWidth = 3
    this.context.stroke()
  }

  drawLeftArm() {
    this.context.beginPath()
    this.context.moveTo(150, 40)
    this.context.lineTo(225, 50)
    this.context.strokeStyle = 'white'
    this.context.lineWidth = 3
    this.context.stroke()
  }

  drawRightArm() {
    this.context.beginPath()
    this.context.moveTo(150, 40)
    this.context.lineTo(75, 50)
    this.context.strokeStyle = 'white'
    this.context.lineWidth = 3
    this.context.stroke()
  }

  drawBody() {
    this.context.beginPath()
    this.context.moveTo(150, 40)
    this.context.lineTo(150, 100)
    this.context.strokeStyle = 'white'
    this.context.lineWidth = 3
    this.context.stroke()
  }

  drawLeftLeg() {
    this.context.beginPath()
    this.context.moveTo(150, 100)
    this.context.lineTo(225, 150)
    this.context.strokeStyle = 'white'
    this.context.lineWidth = 3
    this.context.stroke()
  }

  drawRightLeg() {
    this.context.beginPath()
    this.context.moveTo(150, 100)
    this.context.lineTo(75, 150)
    this.context.strokeStyle = 'white'
    this.context.lineWidth = 3
    this.context.stroke()
  }
}
