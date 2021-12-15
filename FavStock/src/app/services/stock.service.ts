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

  getStockBySymbol(currSymbol: String): Observable<Stock> {
    // For now, assume that a stock with the specified `symbol` always exists.
    // Error handling will be added in the next step of the tutorial.
    const currStock = STOCKS.find(s => s.symbol === currSymbol)!;
    this.messageService.add(`StockService: fetched stock - ${currSymbol}`);
    return of(currStock);
  }
}

