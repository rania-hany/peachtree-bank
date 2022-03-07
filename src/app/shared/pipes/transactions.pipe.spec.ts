import {
  CreditDebitIndicator,
  TransactionType,
} from '../enums/transaction.enum';
import { Transaction } from '../models/transaction.model';
import { TransactionsPipe } from './transactions.pipe';

describe('TransactionsPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionsPipe();
    expect(pipe).toBeTruthy();
  });

  it('shoulf filter transactions array and return the correct value"', () => {
    const pipe = new TransactionsPipe();
    const transactions: Transaction[] = [
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: new Date('12/12/1992'),
        },
        transaction: {
          amountCurrency: {
            amount: '5000',
            currencyCode: 'EUR',
          },
          type: TransactionType.salaries,
          creditDebitIndicator: CreditDebitIndicator.CRDT,
        },
        merchant: {
          name: 'Backbase',
          accountNumber: 'SI64397745065188826',
        },
      },
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: new Date('12/12/1992'),
        },
        transaction: {
          amountCurrency: {
            amount: '82.02',
            currencyCode: 'EUR',
          },
          type: TransactionType.cardPayment,
          creditDebitIndicator: CreditDebitIndicator.DBIT,
        },
        merchant: {
          name: 'The Tea Lounge',
          accountNumber: 'SI64397745065188826',
        },
      },
    ];

    const result = pipe.transform(transactions, 'Backbase');
    expect(result.length).toBe(1);
    expect(result[0].merchant.name).toBe('Backbase');
  });
  
});
