import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Transaction  } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactionlist',
  templateUrl: './transactionlist.component.html',
  styleUrls: ['./transactionlist.component.css']
})
export class TransactionlistComponent implements OnInit {

  transaction: Transaction[]  = [];
  totaltransactions = 0;
  transactionPerPage = 2;
  currentPage= 1;
  pageSizeOptions = [1, 2, 5, 10];

  displayedColumns: string[] = ['type', 'amount', 'description'];
  
  private transactionSub: Subscription;
  constructor(public transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.gettransactions(this.transactionPerPage,this.currentPage);
    this.transactionSub = this.transactionService.gettransactionUpdatedListner()
    .subscribe((transactionData: {transactions: Transaction[],transactionCount: number}) =>{
      console.log(transactionData);
      this.transaction = transactionData.transactions;
      this.totaltransactions = transactionData.transactionCount;
    });
  }

  onChangePage(pageData: PageEvent){
  
    this.currentPage = pageData.pageIndex + 1;
    this.transactionPerPage = pageData.pageSize;
    this.transactionService.gettransactions(this.transactionPerPage,this.currentPage);
  }
}
