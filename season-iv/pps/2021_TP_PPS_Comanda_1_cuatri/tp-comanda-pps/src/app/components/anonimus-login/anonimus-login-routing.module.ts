import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonimusLoginComponent } from './anonimus-login.component';

const routes: Routes = [
  {
    path: '',
    component: AnonimusLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnonimusLoginRoutingModule {}
