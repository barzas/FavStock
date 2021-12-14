import { Component, OnInit, Input } from '@angular/core';
import {Stock} from "../../interfaces/stock";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  @Input() stock? : Stock;

  constructor() { }

  ngOnInit(): void {
  }

}
