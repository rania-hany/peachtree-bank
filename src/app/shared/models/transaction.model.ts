import {
  TransactionType,
  CreditDebitIndicator,
} from '../enums/transaction.enum';

export interface Transaction {
  readonly categoryCode: string;
  dates: {
    readonly valueDate: Date;
  };
  readonly transaction: {
    amountCurrency: {
      readonly amount: string;
      readonly currencyCode: string;
    };
    readonly type: TransactionType;
    readonly creditDebitIndicator: CreditDebitIndicator;
  };
  merchant: {
    readonly name: string;
    readonly accountNumber: string;
  };
}
