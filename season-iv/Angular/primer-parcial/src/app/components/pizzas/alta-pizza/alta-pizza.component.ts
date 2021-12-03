import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pizza } from 'src/app/interfaces/pizzas';
import { NotificationService } from 'src/app/services/notification.service';
import { PizzasService } from 'src/app/services/pizzas.service';

@Component({
  selector: 'app-alta-pizza',
  templateUrl: './alta-pizza.component.html',
  styleUrls: ['./alta-pizza.component.scss'],
})
export class AltaPizzaComponent implements OnInit {
  @Output('pizza') pizzaOut: EventEmitter<Pizza> = new EventEmitter();
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

  async addPizza() {
    if (
      !this.pizza.nombre ||
      !this.pizza.ingredientes ||
      this.pizza.peso <= 0 ||
      this.pizza.precio <= 0
    ) {
      this.notif.error('Debe completar apropiadamente los campos');
    } else {
      this.pizza.id = Date.now().toString();
      this.pizzaOut.emit(this.pizza);
      this.resetData();
    }
  }

  resetData() {
    this.pizza = {
      id: '',
      nombre: '',
      ingredientes: '',
      precio: 0,
      peso: 0,
    };
  }

  ngOnInit(): void {}
}
