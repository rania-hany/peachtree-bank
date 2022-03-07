import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TranactionsService } from '../shared/services/tranactions.service';
import { TransactionsPipe } from '../shared/pipes/transactions.pipe';
import * as Rx from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { Transaction } from '../shared/models/transaction.model';
import {
  CreditDebitIndicator,
  TransactionType,
} from '../shared/enums/transaction.enum';
import { By } from '@angular/platform-browser';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let httpController: HttpTestingController;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      declarations: [HistoryComponent, TransactionsPipe],
      providers: [TranactionsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit an get empty transactions', fakeAsync(() => {
    const fixture = TestBed.createComponent(HistoryComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TranactionsService);
    spyOn(service, 'getTransactionHistory').and.callFake(() => {
      return Rx.of([]);
    });
    component.ngOnInit();
    expect(service.getTransactionHistory).toHaveBeenCalled();
    component.transactions$.subscribe((val: any[]) => {
      expect(val).toEqual([]);
    });
  }));

  it('should call ngOnInit an get transactions', fakeAsync(() => {
    const fixture = TestBed.createComponent(HistoryComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TranactionsService);
    spyOn(service, 'getTransactionHistory').and.callFake(() => {
      return Rx.of(transactions);
    });
    component.ngOnInit();
    expect(service.getTransactionHistory).toHaveBeenCalled();
    component.transactions$.subscribe((val: Transaction[]) => {
      expect(val[0].merchant.name).toEqual(transactions[0].merchant.name);
      fixture.detectChanges();
      const transactionItems = fixture.debugElement.queryAll(
        By.css('.history-wrapper')
      );
      expect(transactionItems.length).toBe(2);
    });
  }));


  it('should call filterResult an get filtered transactions', fakeAsync(() => {
    const fixture = TestBed.createComponent(HistoryComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TranactionsService);
    spyOn(service, 'getTransactionHistory').and.callFake(() => {
      return Rx.of(transactions);
    });
    component.ngOnInit();
    expect(service.getTransactionHistory).toHaveBeenCalled();
    component.transactions$.subscribe();

    fixture.detectChanges();

    component.filterResult('Ba');
    fixture.detectChanges();
    const transactionItems = fixture.debugElement.queryAll(
      By.css('.history-wrapper')
    );
    expect(transactionItems.length).toBe(1);

  }));

});
