import { Component, Input, OnInit } from '@angular/core';
import { Pizza } from 'src/app/interfaces/pizzas';
import { NotificationService } from 'src/app/services/notification.service';
import { PizzasService } from 'src/app/services/pizzas.service';

@Component({
  selector: 'app-drop-pizza',
  templateUrl: './drop-pizza.component.html',
  styleUrls: ['./drop-pizza.component.scss'],
})
export class DropPizzaComponent implements OnInit {
  @Input('pizza') pizza!: Pizza;

  constructor(
    private pizzaS: PizzasService,
    private readonly notif: NotificationService
  ) {}

  deletePizza() {
    if (!this.pizza.id) {
      this.notif.warn('Debe seleccionar una Pizza para eliminarla');
    } else {
      this.pizzaS.dropPizza(this.pizza.id);
      this.notif.success('Pizza eliminada');
    }
  }

  ngOnInit(): void {}
}
