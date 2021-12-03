import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector'
import { Component, DoCheck, ElementRef, OnInit } from '@angular/core'
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from 'src/app/components/dialog/dialog.component'
import { Difficulty, QuestionType, TypeGame } from 'src/app/interfaces/game'
import { AuthService } from 'src/app/services/auth.service'
import { GameService } from 'src/app/services/game.service'
import { NotificationService } from 'src/app/services/notification.service'

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
})
export class PreguntadosComponent implements OnInit {
  questions: any
  question: any
  answers: any = []
  score: number = 0
  gameStarted: boolean = false
  questionSubmited: boolean = false
  /* ----------------------- */
  difficulty: string = ''
  gameType: string = ''
  amountQuestions = ''

  public formControl = new FormControl('', [Validators.required])

  matcher = new MyErrorStateMatcher()

  /* -------------------------- */
  constructor(
    private readonly gameService: GameService,
    private readonly notif: NotificationService,
    private readonly dialog: MatDialog
  ) {}

  getNextQuestion() {
    this.question = this.questions.pop()
    this.answers = []
    this.answers = this.answers.concat(this.question.incorrect_answers)
    this.answers.push(this.question.correct_answer)
    this.randomizeArray(this.answers)
  }

  randomizeArray(arr: []): void {
    arr = arr.sort(() => 0.5 - Math.random())
  }

  newGame() {
    const difficulty: any = {
      easy: Difficulty.EASY,
      medium: Difficulty.MEDIUM,
      hard: Difficulty.HARD,
    }
    if (this.difficulty && this.gameType && this.amountQuestions) {
      this.gameService
        .getTrivialData({
          type:
            this.gameType === 'multiple_choise'
              ? QuestionType.MULTIPLE_CHOISE
              : QuestionType.TRUE_FALSE,
          difficulty: difficulty[this.difficulty],
          amount: this.amountQuestions,
        })
        .subscribe((data: any) => {
          this.questions = data.results

          this.getNextQuestion()
        })
      this.gameStarted = true
    }
  }

  submitAnswer(option: string) {
    this.questionSubmited = true
    if (option === this.question.correct_answer) {
      this.score++
    }

    if (this.questions.length === 0) {
      this.displayDialog(
        'success',
        `You answered a total of: ${this.score} questions!`
      )
    }
  }

  answer(answ: string): string {
    if (this.questionSubmited && answ === this.question.correct_answer) {
      return 'correctAnswer'
    } else if (this.questionSubmited) {
      return 'failAnswer'
    }
    return ''
  }

  goNextQuestion() {
    if (this.questionSubmited) {
      this.questionSubmited = false
      this.getNextQuestion()
    } else this.notif.error('You must answer this question first!', 4000)
  }

  displayDialog(type: string, message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        header: 'Game Over!',
        message,
        panelClass: type === 'error' ? 'gradientRed' : 'gradientGreen',
        buttons: true,
      },
    })

    dialogRef.afterClosed().subscribe((value) => {
      this.questionSubmited = false
      if (value === 'continue') {
        this.newGame()
      } else {
        this.score = 0
        this.gameStarted = false
      }
      this.gameService.updateScore({
        id: AuthService.user.id,
        score: this.score,
        game: TypeGame.PREGUNTADOS,
        updatedAt: Date.now(),
      })
    })
  }

  ngOnInit(): void {}
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}
