import { Injectable } from '@angular/core';
import { Transaction } from './transaction.model'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

   // private users: User[] = [];
 private transactions: Transaction[] = [];
 private transactionUpdated = new Subject<{transactions: Transaction[], transactionCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }

  addTransaction(type:string,amount:string,description: string){
    
  
    const transactions: Transaction = {id:null,type: type,amount: amount,description: description};
  
      this.http.post<{message: string,transaction: Transaction}>('http://localhost:3000/api/transactions/create',transactions)
      .subscribe((responseData) => {
        this.router.navigate(["/"]);
  
      });
    }

    gettransactions(transactionPerPage: number,currentPage: number){
      const queryParam = `?pagesize=${transactionPerPage}&page=${currentPage}`;
      return this.http.get<{message: string,transactions: any,maxtransaction: number}>('http://localhost:3000/api/transactions' + queryParam)
      .pipe(map((transactionData) => {
        return {
          transaction: transactionData.transactions.map(transaction => {
            return {
              type: transaction.type,
              amount: transaction.amount,
              id: transaction._id,
              description: transaction.description 
            };
          }),
          maxPosts: transactionData.maxtransaction
        };
      }))
     .subscribe((transformedusers) => {
       console.log(transformedusers);
       this.transactions = transformedusers.transaction;
      this.transactionUpdated.next({transactions:[...this.transactions],transactionCount: transformedusers.maxPosts });
     });
    }
  
    gettransactionUpdatedListner(){
      return this.transactionUpdated.asObservable();
    }
}
