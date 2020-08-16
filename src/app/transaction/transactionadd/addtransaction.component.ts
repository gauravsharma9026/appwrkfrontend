import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transaction } from '../transaction.model'
import { TransactionService } from '../transaction.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-addtransaction',
  templateUrl: './addtransaction.component.html',
  styleUrls: ['./addtransaction.component.css']
})
export class AddtransactionComponent implements OnInit {
  enteredTitle= '';
  enteredContent = '';
  transaction: Transaction;
  isLoading = false;
  form: FormGroup;
  private transactionId : string; 
   cardtypes = [
    {value: 'debit', viewValue: 'Debit'},
    {value: 'credit', viewValue: 'Credit'}
  ];

  //@Output() postCreated = new EventEmitter<Post>();

  constructor(public transactionService: TransactionService,) { 
  }

  ngOnInit(): void {

    this.form =new FormGroup({
      'type': new FormControl(null,{validators: [Validators.required,Validators.minLength(3)]}),
      'amount': new FormControl(null,{validators: [Validators.required]}),
      'description': new FormControl(null,{validators: [Validators.required]})
    });
  }

  onSavePost() {
    if(this.form.invalid){
        return;
    }

    this.isLoading = true;
      this.transactionService.addTransaction(this.form.value.type,this.form.value.amount,this.form.value.description);
      this.form.reset();
  }
}
