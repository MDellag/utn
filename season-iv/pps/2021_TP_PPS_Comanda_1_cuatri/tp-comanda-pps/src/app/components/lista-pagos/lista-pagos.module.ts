import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPagosComponent } from './lista-pagos.component';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [ListaPagosComponent],
  imports: [CommonModule, FormsModule, SpinnerModule],
  providers: [RouterModule, AuthService],
  exports: [ListaPagosComponent],
})
export class ListaPagosModule {}
