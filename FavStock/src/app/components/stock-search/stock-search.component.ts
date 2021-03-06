import { Component, OnInit } from '@angular/core';
import {Stock} from "../../interfaces/stock";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {StockService} from "../../services/stock.service";

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent implements OnInit {

  stocks$!: Observable<Stock[]>;
  private searchTerms = new Subject<string>();

  constructor(private stockService: StockService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.stocks$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.stockService.searchStocks(term)),
    );
  }
}
