import { Component, OnInit, Input } from '@angular/core';
import {Stock} from "../../interfaces/stock";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {StockService} from "../../services/stock.service";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  @Input() stock? : Stock;

  constructor(private route: ActivatedRoute,
              private stockService: StockService,
              private location: Location) { }

  ngOnInit(): void {
    this.getStock();
  }

  getStock(): void {
    const currSymbol = String(this.route.snapshot.paramMap.get('symbol'));
    this.stockService.getStockBySymbol(currSymbol)
      .subscribe(stock => this.stock = stock);
  }

  goBack(): void {
    this.location.back();
  }
}
