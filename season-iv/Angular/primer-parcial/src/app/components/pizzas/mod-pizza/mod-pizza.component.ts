import { Component, Input, OnInit } from '@angular/core';
import { Pizza } from 'src/app/interfaces/pizzas';
import { NotificationService } from 'src/app/services/notification.service';
import { PizzasService } from 'src/app/services/pizzas.service';

@Component({
  selector: 'app-mod-pizza',
  templateUrl: './mod-pizza.component.html',
  styleUrls: ['./mod-pizza.component.scss'],
})
export class ModPizzaComponent implements OnInit {
  @Input('pizza') pizza!: Pizza;

  constructor(
    private readonly pizzaS: PizzasService,
    private notif: NotificationService
  ) {}

  updatePizza() {
    if (!this.pizza.id) {
      this.notif.warn('Debe seleccionar una pizza para modificar');
    } else {
      this.pizzaS.updatePizzaById(this.pizza);
      this.notif.success('Pizza modificada!', 4000);
    }
  }

  ngOnInit(): void {}
}
