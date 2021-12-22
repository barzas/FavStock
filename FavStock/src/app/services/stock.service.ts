import { Injectable } from '@angular/core';
import { Stock } from "../interfaces/stock";
import { Observable, of } from 'rxjs';
import { MessageService } from "./messages.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

/* The StockService class is going to provide an injectable service,
   and it can also have its own injected dependencies.
   The StockService could get hero data from anywhere—a web service,
   local storage, or a mock data source.
 */
@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stocksUrl = 'api/stocks';  // URL to web api

  constructor(private http : HttpClient,
              private messageService : MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** Log a StockService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StockService: ${message}`);
  }

  /** GET stocks from the server */
  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stocksUrl).
      pipe(
        tap(_ => this.log('fetched stocks')),
        catchError(this.handleError<Stock[]>('getStocks', []))
    );
  }

  // /** GET stock by symbol. Will 404 if symbol not found */
  // getStockBySymbol(currSymbol: String): Observable<Stock> {
  //   const url = `${this.stocksUrl}/${currSymbol}`;
  //   return this.http.get<Stock>(url).pipe(
  //     tap(_ => this.log(`fetched stock ${currSymbol}`)),
  //     catchError(this.handleError<Stock>(`getStock ${currSymbol}`))
  //   );
  // }

  /** GET hero by id. Return `undefined` when id not found */
  getStockBySymbol(currSymbol: string): Observable<Stock> {
    const url = `${this.stocksUrl}/?symbol=${currSymbol}`;
    return this.http.get<Stock[]>(url)
      .pipe(
        map(stocks => stocks[0]), // returns a {0|1} element array
        tap(s => {
          const outcome = s ? `fetched` : `did not find`;
          this.log(`${outcome} stock ${currSymbol}`);
        }),
        catchError(this.handleError<Stock>(`getStock ${currSymbol}`))
      );
  }

  /** GET Stocks whose name contains search term */
  searchStocks(term: string): Observable<Stock[]> {
    if (!term.trim()) {
      // if not search term, return empty stock array.
      return of([]);
    }
    return this.http.get<Stock[]>(`${this.stocksUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found stocks matching "${term}"`) :
        this.log(`no stocks matching "${term}"`)),
      catchError(this.handleError<Stock[]>('searchStocks', []))
    );
  }

  /** /////// Save methods ///////// */


  /** PUT: update the stock on the server */
  updateStock(stock : Stock): Observable<any> {
    return this.http.put(this.stocksUrl, stock, this.httpOptions).pipe(
      tap(_ => this.log(`updated stock ${stock.symbol}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  /** TODO - need to fix add() and delete() function to work also on the data */

  /** POST: add a new stock to the server */
  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.stocksUrl, stock, this.httpOptions).pipe(
      tap((newStock: Stock) => this.log(`added stock w/ id=${newStock.id}`)),
      catchError(this.handleError<Stock>('addStock'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteStock(currSymbol : string): Observable<Stock> {
    const url = `${this.stocksUrl}/${currSymbol}`;

    return this.http.delete<Stock>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted stock ${currSymbol}`)),
      catchError(this.handleError<Stock>('deleteStock'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

