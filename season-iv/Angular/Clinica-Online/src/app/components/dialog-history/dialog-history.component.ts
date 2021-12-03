import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-history',
  templateUrl: './dialog-history.component.html',
  styleUrls: ['./dialog-history.component.scss'],
})
export class DialogHistoryComponent implements OnInit {
  dni!: string

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    private readonly dialogRef: MatDialogRef<DialogHistoryComponent>
  ) {
    this.dni = this.data
  }

  closeDialog() {
    this.dialogRef.close()
  }

  ngOnInit(): void {}
}
