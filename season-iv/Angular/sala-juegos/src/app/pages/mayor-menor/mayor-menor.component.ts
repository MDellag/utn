import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from 'src/app/components/dialog/dialog.component'
import { TypeGame } from 'src/app/interfaces/game'
import { AuthService } from 'src/app/services/auth.service'
import { GameService } from 'src/app/services/game.service'

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss'],
})
export class MayorMenorComponent implements OnInit {
  displayedNumber!: number
  randomNumber!: number
  score: number = 0

  constructor(
    private readonly dialog: MatDialog,
    private readonly gameService: GameService
  ) {}

  generateNumber(): number {
    return Math.floor(Math.random() * (100 - 1)) + 1
  }

  displayDialog(type: string, number: number) {
    this.dialog.open(DialogComponent, {
      data: { header: 'Game Over!', message: `Number was: ${number}`, type },
      panelClass: type === 'error' ? 'gradientRed' : 'gradientGreen',
    })
  }

  bet(type: string): void {
    const num = this.generateNumber()
    if (
      (type === 'higher' && num > this.displayedNumber) ||
      (type === 'lower' && num < this.displayedNumber)
    ) {
      this.displayedNumber = num
      this.incrementScore()
    } else {
      this.displayDialog('error', num)
      this.gameService.updateScore({
        id: AuthService.user.id,
        score: this.score,
        game: TypeGame.HIGHER_LOWER,
        updatedAt: Date.now(),
      })
      this.reset()
    }
  }

  incrementScore(): void {
    this.score += 5
  }

  reset(): void {
    this.score = 0
  }

  ngOnInit(): void {
    this.displayedNumber = this.generateNumber()
  }
}
