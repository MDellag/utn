import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from 'src/app/components/dialog/dialog.component'
import { TypeGame } from 'src/app/interfaces/game'
import { AuthService } from 'src/app/services/auth.service'
import { GameService } from 'src/app/services/game.service'

@Component({
  selector: 'app-owngame',
  templateUrl: './owngame.component.html',
  styleUrls: ['./owngame.component.scss'],
})
export class OwngameComponent implements OnInit {
  @ViewChild('enemy') enemy!: ElementRef<HTMLDivElement>
  @ViewChild('ninja') ninja!: ElementRef<HTMLDivElement>
  jumping: boolean = false
  isAlive: boolean = false
  gameRunning: boolean = false
  score: number = 0

  constructor(
    private readonly dialog: MatDialog,
    private readonly gameService: GameService
  ) {}

  displayDialog(type: string, header: string, message: string) {
    this.dialog.open(DialogComponent, {
      data: { header, message, type },
      panelClass: type === 'error' ? 'gradientRed' : 'gradientGreen',
    })
  }

  updateGameState(): void {
    this.gameService.updateScore({
      id: AuthService.user.id,
      score: this.score,
      game: TypeGame.OWN_GAME,
      updatedAt: Date.now(),
    })
  }

  @HostListener('window:keydown', ['$event'])
  jump(event: any) {
    if (this.gameRunning && event.keyCode === 32 && !this.jumping) {
      this.jumping = true

      setTimeout(() => {
        this.jumping = false

        if (this.gameRunning) {
          this.score++
        }
      }, 300)
    } else if (event.keyCode === 80) {
      this.gameRunning = true
    }
  }

  ngOnInit(): void {
    setInterval(() => {
      const difference = 20
      const { x: enemyX, y: enemyY } =
        this.enemy.nativeElement.getBoundingClientRect()
      const { x: ninjaX, y: ninjaY } =
        this.ninja.nativeElement.getBoundingClientRect()

      this.enemy.nativeElement.offsetLeft
      if (
        enemyX - difference >= ninjaX - 2 &&
        enemyX - difference <= ninjaX + 3 &&
        ninjaY >= 189
      ) {
        this.gameRunning = false
        this.updateGameState()
        this.displayDialog(
          'error',
          'Game Over!',
          `Your Score was: ${this.score}`
        )
        this.score = 0
      }
    }, 10)
  }
}
