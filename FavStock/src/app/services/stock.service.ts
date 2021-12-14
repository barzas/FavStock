import { Injectable } from '@angular/core';
import {Stock} from "../interfaces/stock";
import {STOCKS} from "../interfaces/mock-stocks";
import { Observable, of } from 'rxjs';
import {MessageService} from "./messages.service";

/* The StockService class is going to provide an injectable service,
   and it can also have its own injected dependencies.
   The StockService could get hero data from anywhere—a web service,
   local storage, or a mock data source.
 */
@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private messageService : MessageService) { }

  // Need to see http toturail
  getStocks(): Observable<Stock[]> {
    const stocks = of(STOCKS);
    this.messageService.add('StockService: fetch stocks');
    return stocks;
  }
}

