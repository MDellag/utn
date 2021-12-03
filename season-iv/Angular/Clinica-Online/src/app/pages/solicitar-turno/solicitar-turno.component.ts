import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Turno, TurnoStatus } from 'src/app/interfaces/turno'
import { IUser, TypeUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationService } from 'src/app/services/notification.service'
import { TurnosService } from 'src/app/services/turnos.service'
import * as moment from 'moment'
import { Disponibilidad } from 'src/app/interfaces/disponibilidad'

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss'],
  host: { style: 'width:100%' },
})
export class SolicitarTurnoComponent implements OnInit {
  fetching: boolean = false
  especialista!: IUser
  paciente: IUser = {
    approved: true,
    dni: '',
    email: '',
    lastname: '',
    name: '',
    photo: [],
    password: '',
    type: TypeUser.PATIENT,
  }
  dayList: any = []
  user!: IUser

  turnData: any = {
    speciality: '',
    specialist: '',
    date: '',
  }

  constructor(
    private _formBuilder: FormBuilder,
    private readonly auth: AuthService,
    private readonly turnService: TurnosService,
    private readonly notif: NotificationService
  ) {}

  turnList: any = []
  patientList: IUser[] = []
  especialistaList: IUser[] = []
  especialidadesList: any = []
  filteredHourList: any = []
  horariosList: string[] = []

  updateSpecialistList(name: string) {
    this.turnData.speciality = name
    this.especialistaList = this.especialistaList.filter((spec: IUser) =>
      spec.especialidad!.includes(name)
    )
  }

  updateSpecialityList(esp: IUser) {
    this.especialista = esp
    this.turnData.specialist = esp.name + ' ' + esp.lastname
    const especialista = this.especialistaList.filter(
      (spec: IUser) => spec.dni === esp.dni
    )
    const ls: string[] | undefined = especialista[0].especialidad

    if (ls!.length === 1) {
      this.turnData.speciality = ls![0]
      this.especialidadesList = ls
    } else {
      this.turnData.speciality = ''
      this.especialidadesList = ls
    }
  }

  updateSpeciality(ls: string) {
    this.turnData.speciality = ls
  }

  getTurnList(dni: any) {
    const disp = this.turnService.getDispsById(dni)
    disp.subscribe((val: any) => {
      // this.formatTime(val[0].from, val[0].to)
    })
    const specTemp = this.especialistaList.filter((s: any) => s.dni === dni)

    this.turnData.specialist = `Dr. ${specTemp[0].lastname} ${specTemp[0].name}`
    this.turnService.findByIdEspecialista(dni).subscribe((spec: any) => {
      this.turnList = spec
    })
  }

  updateSelectedPatient(patient: IUser) {
    this.paciente = patient
  }

  setHour(hour: string) {
    this.turnData.hour = hour
  }

  updatePatient(dni: string) {
    this.paciente = this.patientList.filter((e: any) => e.dni === dni)[0]
  }

  async getSpecialistsList() {
    this.especialistaList = await this.auth.getAllSpecialists()

    const specialities = this.especialistaList.reduce((a: any, b: any) => {
      return a.concat(b.especialidad)
    }, [])
  }

  handleDateTurn(date: string) {
    this.turnData.date = date
  }

  async addTurn() {
    this.fetching = !this.fetching

    const turn: Turno = {
      id: Date.now().toString(),
      id_paciente: this.paciente.dni,
      id_especialista: this.especialista.dni,
      name_especialista: `${this.especialista.name} ${this.especialista.lastname}`,
      name_paciente: `${this.paciente.name} ${this.paciente.lastname}`,
      especialidad: this.turnData.speciality,
      date: this.turnData.date,
      accepted: false,
      status: TurnoStatus.PENDIENTE,
    }

    this.turnService.addTurno(turn)
    this.fetching = !this.fetching
    this.turnData = {
      speciality: '',
      specialist: '',
      date: '',
    }
    this.notif.success('Turno agendado!', 5000)
  }

  async ngOnInit(): Promise<void> {
    await this.getSpecialistsList()
    const pac = await this.auth.getCredentials()
    this.user = pac
    if (pac.type === 'PATIENT') {
      this.paciente = pac
    } else if (pac.type === 'ADMIN') {
      this.patientList = await this.auth.getAllPatients()
    }
  }
}
