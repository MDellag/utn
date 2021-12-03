import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/interfaces/pizzas';
import { NotificationService } from 'src/app/services/notification.service';
import { PizzasService } from 'src/app/services/pizzas.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})
export class PizzasComponent implements OnInit {
  pizza: Pizza = {
    id: '',
    nombre: '',
    ingredientes: '',
    precio: 0,
    peso: 0,
  };

  constructor(
    private readonly pizzaS: PizzasService,
    private readonly notif: NotificationService
  ) {}

  async agregarPizza(pizza: Pizza) {
    await this.pizzaS.addPizza(pizza);
    this.notif.success('Pizza agregada!', 4000);
  }

  onRow(pizza: Pizza) {
    this.pizza = pizza;
  }

  ngOnInit(): void {}
}
