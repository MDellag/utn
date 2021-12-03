import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import * as moment from 'moment'
import { Turno, TurnoStatus } from 'src/app/interfaces/turno'
import { AuthService } from 'src/app/services/auth.service'
import { TurnosService } from 'src/app/services/turnos.service'
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
})
export class HorariosComponent implements OnInit, OnChanges {
  @Input('dni') dni!: string
  @Output('diaHorario') timeOutput: EventEmitter<any> = new EventEmitter()
  horariosList: string[] = []
  dayList: any = []
  finalDateList: any = []

  dateChoosen!: string

  listToDisplay: { index: number; list: string[] } = { index: 0, list: [] }

  constructor(private turnService: TurnosService, private auth: AuthService) {}

  formatTime(from: string, to: string) {
    const splitedStart = from.split(':')
    const splitedTo = to.split(':')
    const isHalfStart = splitedStart[1].slice(0, 2).charAt(0) === '3'
    const isHalfFinish = splitedTo[1].slice(0, 2).charAt(0) === '3'

    this.generateHours(
      parseInt(splitedStart[0]),
      parseInt(splitedTo[0]),
      isHalfStart,
      isHalfFinish
    )
  }

  isWeekend(timestamp: Date): boolean {
    if (timestamp.getDay() == 6 || timestamp.getDay() == 0) {
      return true
    }
    return false
  }

  getNextFifteenDays() {
    this.dayList = []
    for (let i = 1; i <= 15; i++) {
      const dt = new Date()

      dt.setDate(dt.getDate() + i)
      if (!this.isWeekend(dt)) {
        this.dayList.push(dt.valueOf())
      }
    }
  }

  generateHours(
    start: number,
    end: number,
    isHalfStart: boolean,
    isHalfFinish: boolean
  ) {
    const hours = []

    if (isHalfStart) {
      hours.push(
        moment({
          hour: start,
          minute: 30,
        })
          .format('HH:mm')
          .concat('h')
      )
    }

    for (let hour = isHalfStart ? start + 1 : start; hour < end; hour++) {
      hours.push(moment({ hour }).format('HH:mm').concat('h'))
      hours.push(
        moment({
          hour,
          minute: 30,
        })
          .format('HH:mm')
          .concat('h')
      )
    }

    if (isHalfFinish) {
      hours.push(
        moment({
          hour: end,
        })
          .format('HH:mm')
          .concat('h')
      )
    }

    this.horariosList = hours
  }

  async getTurnList(dni: any) {
    const disp = this.turnService.getDispsById(dni) // obtiene disponibilidad por dni
    this.finalDateList = [] // limpia el array
    disp.subscribe((val: any) => {
      if (val.length === 0) {
        // si el doc no tiene disp seteada se le predefine una
        this.turnService.addDisponibilidad({
          id: this.dni,
          from: '09:00',
          to: '18:00',
        })
      } else {
        this.formatTime(val[0].from, val[0].to) // se crea la lista formateada

        for (let day of this.dayList) {
          const date = new Date(parseInt(day))
          const dayF = `${date.getDate()}-${date.getMonth() + 1}`
          const listA: string[] = this.horariosList.map((hora: string) => {
            return `${dayF} ${hora}`
          })

          // const dayObj: any = {}
          // dayObj[dayF] = listA
          this.finalDateList.push(listA)
        }
        this.filterTakenTurns()
      }
    })
  }

  filterTakenTurns() {
    this.turnService.getAllTurnsByDni(this.dni).subscribe((turnos: any) => {
      for (const turno of turnos) {
        for (let i = 0; i < this.finalDateList.length; i++) {
          if (
            this.finalDateList[i].includes(turno.date) &&
            turno.status === TurnoStatus.PENDIENTE
          ) {
            this.finalDateList[i] = this.finalDateList[i].filter(
              (r: string) => r !== turno.date
            )
          }
        }
      }
      this.listToDisplay.list = this.finalDateList[0]
    })
  }

  handleDateChosen(date: string) {
    this.timeOutput.emit(date)
  }

  goToDay(num: number) {
    this.listToDisplay.index = num
    this.listToDisplay.list = this.finalDateList[this.listToDisplay.index]
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getTurnList(changes.dni.currentValue)
  }

  async ngOnInit(): Promise<void> {
    this.getNextFifteenDays()
    // this.getTurnList(this.dni)
  }
}
