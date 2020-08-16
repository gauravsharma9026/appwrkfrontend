import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtransactionComponent } from './transaction/transactionadd/addtransaction.component';
import { TransactionlistComponent } from './transaction/transactionlist/transactionlist.component';

const routes: Routes = [
  {path : 'create',component: AddtransactionComponent},
  {path : '', component: TransactionlistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
