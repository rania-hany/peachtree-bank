import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import {
  CreditDebitIndicator,
  TransactionType,
} from '../shared/enums/transaction.enum';
import { Transaction } from '../shared/models/transaction.model';
import { TranactionsService } from '../shared/services/tranactions.service';
import { amount } from '../shared/validators/amount.validator';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],

})
export class TransferComponent implements OnInit {
  public transferForm: FormGroup;
  public showModal: boolean = false;
  public newTransaction: Transaction;
  constructor(
    private fb: FormBuilder,
    private tranactionsService: TranactionsService,
    private appService: AppService
  ) {
    this.transferForm = fb.group({
      fromAccount: [{value: this.appService.myAccount.name, disabled: true}],
      toAccount: ['', Validators.required],
      amount: ['', [Validators.required, amount()]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.transferForm.valid) {
      this.newTransaction = {
        categoryCode: '#c12020',
        dates: {
          valueDate: new Date(),
        },
        merchant: {
          accountNumber: '123456',
          name: this.transferForm.value['toAccount'],
        },
        transaction: {
          amountCurrency: {
            amount: this.transferForm.value['amount'],
            currencyCode: '€',
          },
          creditDebitIndicator: CreditDebitIndicator.DBIT,
          type: TransactionType.onlineTransfer,
        },
      };
      this.showModal = true;
    }
  }

  confirm(){
    this.tranactionsService.addTransaction(this.newTransaction);
    this.transferForm.reset();
    this.newTransaction = {} as Transaction;
    this.showModal = false;
  }
  closeModal() {
    this.showModal = false;
  }
}
