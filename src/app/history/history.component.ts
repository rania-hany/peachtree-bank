import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../shared/models/transaction.model';
import { TranactionsService } from '../shared/services/tranactions.service';

@Component({
  selector: 'transaction-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  transactions$!: Observable<Transaction[]>;
  public searchFilter: any = '';

  constructor(private tranactionsService: TranactionsService) {}

  ngOnInit(): void {
    this.transactions$ = this.tranactionsService.getTransactionHistory();
  }

  filterResult(value: any){
    this.searchFilter = value;
  }
}
