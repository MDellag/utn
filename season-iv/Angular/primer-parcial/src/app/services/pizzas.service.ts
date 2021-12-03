import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Pizza } from '../interfaces/pizzas';

@Injectable({
  providedIn: 'root',
})
export class PizzasService {
  private pizzaRef: AngularFireList<Pizza>;

  constructor(private readonly db: AngularFireDatabase) {
    this.pizzaRef = this.db.list('pizzas');
  }

  async addPizza(pizza: Pizza) {
    await this.pizzaRef.set(pizza.id, pizza);
  }

  getPizzas() {
    return this.pizzaRef.valueChanges();
  }

  getPizzabyId(id: string) {
    return this.db
      .list('pizzas', (ref) => ref.orderByChild('id').equalTo(id))
      .valueChanges();
  }

  updatePizzaById(pizza: Pizza) {
    return this.db
      .list('pizzas', (ref) => ref.orderByChild('id').equalTo(pizza.id))
      .update(pizza.id, pizza);
  }

  dropPizza(id: string) {
    return this.db
      .list('pizzas', (ref) => ref.orderByChild('id').equalTo(id))
      .remove(id);
  }
}
