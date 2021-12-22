import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Stock} from "../interfaces/stock";

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stocks = [
      {id: 1, name: 's&p 500', symbol: 'SPY', price: 470.7},
      {id: 2, name: 'nasdaq 100', symbol: 'QQQ', price: 16331.98},
      {id: 3, name: 'tesla', symbol: 'TSLA', price: 1017.03},
      {id: 4, name: 'microsoft', symbol: 'MSFT', price: 342.54},
      {id: 5, name: 'alphabet', symbol: 'GOOG', price: 2973.50},
      {id: 6, name: 'nvidia', symbol: 'NVDA', price: 301.98},
      {id: 7, name: 'apple', symbol: 'APPL', price: 179.45}
    ];
    return {stocks};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(stocks: Stock[]): Number {
    return stocks.length > 0 ? Math.max(...stocks.map(stock => stock.id)) + 1 : 11;
  }
}
