import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import * as transactionsData from '../../bb-ui/mock-data/transactions.json';
import {
  CreditDebitIndicator,
  TransactionType,
} from '../enums/transaction.enum';
import { Transaction } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { routes } from '../constants/routes';

@Injectable({
  providedIn: 'root',
})
export class TranactionsService {
  constructor(private http: HttpClient) {}
  transactions: Array<Transaction> = [];

  // return of(transactionsData).pipe(
  //   map((response) => {
  //     return (this.transactions = [...this.mapData(response.data)]);
  //   })
  // );

  getTransactionHistory() {
   return this.http
      .get(routes.transactions)
      .pipe(
        map((response) => {
          return (this.transactions = [...this.mapData(response as any[])]);
        })
      )
      .pipe(
        catchError((_) => {
          return of(transactionsData).pipe(
            map((response) => {
              return (this.transactions = [...this.mapData(response.data)]);
            })
          );
        })
      );
  }

  mapData(data: any[]) {
    let listTransactions: Array<Transaction> = [];
    data.forEach((item) => {
      let transaction: Transaction = {
        categoryCode: item.categoryCode,
        dates: {
          valueDate: new Date(item.dates.valueDate),
        },
        merchant: item.merchant,
        transaction: {
          type: item.transaction.type as TransactionType,
          creditDebitIndicator: item.transaction
            .creditDebitIndicator as CreditDebitIndicator,
          amountCurrency: {
            amount: (item.transaction.creditDebitIndicator == 'CRDT'? '':'-') + item.transaction.amountCurrency.amount.toString(),
            currencyCode: item.transaction.amountCurrency.currencyCode,
          },
        },
      };
      listTransactions.push(transaction);
    });
    return listTransactions;
  }
  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }
}
