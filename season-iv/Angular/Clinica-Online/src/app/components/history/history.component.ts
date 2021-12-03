import { Component, OnInit, Input } from '@angular/core'
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica'
import { IUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { ExportService } from 'src/app/services/export.service'
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  user!: IUser
  fetching: boolean = false
  historyList: HistoriaClinica[] = []

  @Input('dni')
  dni!: string
  objectkeys = Object.keys

  constructor(
    private readonly auth: AuthService,
    private readonly history: HistoriaClinicaService,
    private readonly exportS: ExportService
  ) {}

  async downloadPdf() {
    await this.exportS.downloadPDF(this.historyList, 'historial-paciente.pdf')
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.auth.getCredentials()

    this.history.findByDni(this.dni).subscribe((history: any) => {
      this.historyList = history
    })
  }
}
