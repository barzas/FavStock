import { Component, OnInit } from '@angular/core';
import {Stock} from "../../interfaces/stock";
import {StockService} from "../../services/stock.service";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks: Stock[] = [];

  constructor(private stockService : StockService) { }

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks(): void {
    this.stockService.getStocks().subscribe(stocks => this.stocks = stocks);
  }

  add(name: string, symbol: string): void {
    name = name.trim();
    symbol = symbol.trim().toUpperCase();
    if (!name && !symbol) { return; }
    this.stockService.addStock({ name, symbol } as Stock)
      .subscribe(s => {
        this.stocks.push(s);
      });
  }

  delete(stock: Stock): void {
    this.stocks = this.stocks.filter(s => s !== stock);
    this.stockService.deleteStock(stock.symbol).subscribe();
  }
}
