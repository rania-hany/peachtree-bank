import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { TranactionsService } from '../shared/services/tranactions.service';

import { TransferComponent } from './transfer.component';
import { SharedModule } from '../shared/shared.module';
import { Transaction } from '../shared/models/transaction.model';
import {
  CreditDebitIndicator,
  TransactionType,
} from '../shared/enums/transaction.enum';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, ReactiveFormsModule],
      declarations: [TransferComponent],
      providers: [TranactionsService, AppService, FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.transferForm.valid).toBeFalsy();
  });

  it('amount field validity', () => {
    let errors: any = {};
    let amount = component.transferForm.controls['amount'];
    expect(amount.valid).toBeFalsy();
    amount.setValue('test');
    errors = amount.errors || {};
    expect(errors['msg']).toBe('Numbers only allowed');
    amount.setValue('-10');
    errors = amount.errors || {};
    expect(errors['msg']).toBe('Negative numbers are not allowed');
    amount.setValue('400');
    errors = amount.errors || {};
    expect(errors['msg']).toBe('amount below €500 not allowed');
  });

  it('toAccount field validity', () => {
    let errors: any = {};
    let transferForm = component.transferForm.controls['toAccount'];
    errors = transferForm.errors || {};
    expect(errors.required).toBeTruthy();
  });

  it('submitting a form to create new transaction', () => {
    const newTransaction: Transaction = {
      categoryCode: '#c12020',
      dates: {
        valueDate: new Date(),
      },
      merchant: {
        accountNumber: '123456',
        name: 'BackBase',
      },
      transaction: {
        amountCurrency: {
          amount: '1000',
          currencyCode: '€',
        },
        creditDebitIndicator: CreditDebitIndicator.DBIT,
        type: TransactionType.onlineTransfer,
      },
    };
    const service = fixture.debugElement.injector.get(TranactionsService);
    spyOn(component, 'closeModal').and.callFake(
      () => (component.showModal = false)
    );

    expect(component.transferForm.valid).toBeFalsy();
    component.transferForm.controls['fromAccount'].setValue('test@test.com');
    component.transferForm.controls['toAccount'].setValue('BackBase@test.com');
    component.transferForm.controls['amount'].setValue('1000');
    expect(component.transferForm.valid).toBeTruthy();

    component.onSubmit();
    expect(component.showModal).toBeTruthy();
    component.confirm();
    expect(service.transactions[service.transactions.length - 1].merchant.name).toBe('BackBase@test.com');
    expect(component.closeModal).toHaveBeenCalled();
    expect(component.showModal).toBeFalsy();
  });
  
  it('should call closeModal', () => {
    component.closeModal();
    expect(component.showModal).toBeFalsy();
  });
});
