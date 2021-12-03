import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pizza } from 'src/app/interfaces/pizzas';
import { PizzasService } from 'src/app/services/pizzas.service';

@Component({
  selector: 'app-lista-pizzas',
  templateUrl: './lista-pizzas.component.html',
  styleUrls: ['./lista-pizzas.component.scss'],
})
export class ListaPizzasComponent implements OnInit {
  pizzaList: Pizza[] = [];
  @Output('pizza') pizzaOut: EventEmitter<Pizza> = new EventEmitter();

  constructor(private pizzaS: PizzasService) {}

  onClickRow(pizza: Pizza) {
    this.pizzaOut.emit(pizza);
  }

  ngOnInit(): void {
    this.pizzaS.getPizzas().subscribe((pizzas) => {
      this.pizzaList = pizzas;
    });
  }
}
