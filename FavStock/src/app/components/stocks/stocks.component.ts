import { Component, OnInit } from '@angular/core';
import {Stock} from "../../interfaces/stock";
import {StockService} from "../../services/stock.service";
import {MessageService} from "../../services/messages.service";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks: Stock[] = [];
  selectedStock?: Stock;

  constructor(private stockService : StockService,
              private messageService : MessageService) { }

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks(): void {
    this.stockService.getStocks().subscribe(stocks => this.stocks = stocks);
  }

  onSelect(stock : Stock): void {
    this.selectedStock = stock;
    this.messageService.add(`StocksComponent: Selected stock symbol=${stock.symbol}`);
  }

}
