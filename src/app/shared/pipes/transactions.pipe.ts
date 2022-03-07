import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Pipe({
  name: 'transactions',
})
export class TransactionsPipe implements PipeTransform {
  transform(value?: Transaction[] | null, args?: any): any {
    if (!value) return value;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (data: Transaction) {
      return JSON.stringify(data.merchant.name).toLowerCase().includes(args);
    });
  }
}
