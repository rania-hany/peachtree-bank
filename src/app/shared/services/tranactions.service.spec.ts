import { TestBed } from '@angular/core/testing';
import {
  CreditDebitIndicator,
  TransactionType,
} from '../enums/transaction.enum';
import { Transaction } from '../models/transaction.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TranactionsService } from './tranactions.service';

describe('TranactionsService', () => {
  let service: TranactionsService;
  let httpController: HttpTestingController;

  const url =
    'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TranactionsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the transactions api and return a value ', () => {
    const response = [
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: 1600493600000,
        },
        transaction: {
          amountCurrency: {
            amount: 5000,
            currencyCode: 'EUR',
          },
          type: 'Salaries',
          creditDebitIndicator: 'CRDT',
        },
        merchant: {
          name: 'Backbase',
          accountNumber: 'SI64397745065188826',
        },
      },
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: 1600493600000,
        },
        transaction: {
          amountCurrency: {
            amount: '82.02',
            currencyCode: 'EUR',
          },
          type: 'Card Payment',
          creditDebitIndicator: 'DBIT',
        },
        merchant: {
          name: 'The Tea Lounge',
          accountNumber: 'SI64397745065188826',
        },
      },
    ];

    const transactions: Transaction[] = [
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: new Date(1600493600000),
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
          valueDate: new Date(1600493600000),
        },
        transaction: {
          amountCurrency: {
            amount: '-82.02',
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

    service.getTransactionHistory().subscribe((res) => {
      expect(res).toEqual(transactions);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: url,
    });

    req.flush(response);
  });

  it('should call the local json copy when transactions api fail and return a value ', () => {
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = 'Invalid request parameters';

    service.getTransactionHistory().subscribe((res) => {
      expect(res.length).toEqual(11);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: url,
    });

    req.flush(data, mockErrorResponse);
  });

  it('should add new transaction to transactions list', () => {
    const transactions: Transaction[] = [
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: new Date(1600493600000),
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
          valueDate: new Date(1600493600000),
        },
        transaction: {
          amountCurrency: {
            amount: '-82.02',
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

    const newTransactions: Transaction = {
      categoryCode: '#12a580',
      dates: {
        valueDate: new Date(1600493600000),
      },
      transaction: {
        amountCurrency: {
          amount: '3000',
          currencyCode: 'EUR',
        },
        type: TransactionType.salaries,
        creditDebitIndicator: CreditDebitIndicator.CRDT,
      },
      merchant: {
        name: 'Rania',
        accountNumber: 'SI64397745065188826',
      },
    };
    service.transactions = transactions;
    service.addTransaction(newTransactions);
    expect(service.transactions.length).toBe(3);
  });
});
