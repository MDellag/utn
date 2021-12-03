import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzasRoutingModule } from './pizzas-routing.module';
import { PizzasComponent } from './pizzas.component';
import { AltaPizzaComponent } from './alta-pizza/alta-pizza.component';
import { ModPizzaComponent } from './mod-pizza/mod-pizza.component';
import { DropPizzaComponent } from './drop-pizza/drop-pizza.component';
import { PizzasService } from 'src/app/services/pizzas.service';
import { RouterModule } from '@angular/router';
import { ListaPizzasComponent } from './lista-pizzas/lista-pizzas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PizzasComponent,
    AltaPizzaComponent,
    ModPizzaComponent,
    DropPizzaComponent,
    ListaPizzasComponent,
  ],
  imports: [CommonModule, PizzasRoutingModule, RouterModule, FormsModule],
  providers: [PizzasService, PizzasService],
})
export class PizzasModule {}
