import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from '../app/customer-details/customer-details.component';
import { CustomerListComponent } from '../app/customer-list/customer-list.component';

const routes: Routes = [{
  path: '',
  component: CustomerListComponent,
},
{
  path: 'customer-details',
  component: CustomerDetailsComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
