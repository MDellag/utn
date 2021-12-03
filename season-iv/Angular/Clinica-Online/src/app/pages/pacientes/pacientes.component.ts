import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { DialogHistoryComponent } from 'src/app/components/dialog-history/dialog-history.component'
import { DialogComponent } from 'src/app/components/dialog/dialog.component'
import { Turno } from 'src/app/interfaces/turno'
import { IUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service'
import { TurnosService } from 'src/app/services/turnos.service'

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  host: { style: 'width:100%' },
})
export class PacientesComponent implements OnInit {
  id!: number
  user!: IUser
  fetching: boolean = false
  patientList: any = []
  selectedPatientList!: any
  filtro: string = ''
  private lista!: any
  historialForPatientSelected: any = []

  constructor(
    private readonly hist: HistoriaClinicaService,
    private readonly auth: AuthService,
    private readonly turn: TurnosService,
    private readonly matDiag: MatDialog
  ) {
    /*    this.route.params.subscribe((params) => {
      this.id = params['id']
    }) */
  }

  statusClass: any = {
    PENDIENTE: 'pending',
    RECHAZADO: 'rejected',
    CANCELADO: 'rejected',
    REALIZADO: 'done',
  }

  displayedColumns: string[] = ['especialidad', 'status', 'date', 'options']

  handleSelectedPatient(patient: IUser) {
    this.turn
      .getAllTurnsByPatientAndSpecialist(patient.dni, this.user.dni)
      .subscribe((turnos) => {
        this.selectedPatientList = turnos
        this.getHistorialForDny(patient.dni)
      })
  }

  getHistorialForDny(dni: string) {
    this.hist.findByDni(dni).subscribe((hist) => {
      this.historialForPatientSelected = hist
    })
  }

  displayDialog(dni: string) {
    this.matDiag.open(DialogHistoryComponent, { data: dni })
  }

  displayMessageDialog(turno: Turno) {
    const dialogRef = this.matDiag.open(DialogComponent, {
      data: {
        header: '',
        message: turno,
        input: false,
      },
    })

    return dialogRef.afterClosed()
  }

  onFilterSpeciality() {
    const reg = new RegExp(this.filtro.toLowerCase())
    const wholePatientObj: any = []

    const matched = this.lista.filter(
      (u: IUser) =>
        reg.test(u.dni.toLowerCase()) ||
        reg.test(u.email.toLowerCase()) ||
        reg.test(u.name.toLowerCase()) ||
        reg.test(u.lastname.toLowerCase()) ||
        reg.test(u.obraSocial!.toLowerCase())
    )

    this.patientList = matched
  }

  getList() {
    this.turn
      .findByIdEspecialista(this.user.dni)
      .subscribe(async (turnos: any) => {
        this.fetching = true
        const patientList = await this.auth.getAllPatients()

        const tableList: IUser[] = []
        for (const turno of turnos) {
          if (
            turno.status === 'REALIZADO' &&
            !this.patientList.find((a: any) => a.dni === turno.id_paciente)
          ) {
            const lista = patientList.filter(
              (r: IUser) => r.dni === turno.id_paciente
            )

            tableList.push(...lista)
          }
        }
        this.patientList = tableList
        this.lista = tableList
        this.fetching = false
      })
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.auth.getCredentials()

    this.getList()
  }
}
