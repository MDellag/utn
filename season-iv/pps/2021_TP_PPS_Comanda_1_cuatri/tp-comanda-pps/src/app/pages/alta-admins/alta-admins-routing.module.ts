import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaAdminsComponent } from './alta-admins.component';

const routes: Routes = [
  {
    path: '',
    component: AltaAdminsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaAdminsRoutingModule {}
