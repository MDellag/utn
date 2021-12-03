import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'

export interface DialogData {
  header: string
  message: string
  type: 'success' | 'error' | 'warning'
  buttons?: boolean
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  header!: string
  message!: string
  type!: string
  buttons!: boolean

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private readonly dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.header = data.header
    this.message = data.message
    this.type = data.type
    this.buttons = data.buttons || false
  }

  closeDialog(resp: string) {
    this.dialogRef.close(resp)
  }

  ngOnInit(): void {}
}
