import { Component } from '@angular/core';
import {CustomersService} from './services/customers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-test';
  constructor (public customersService: CustomersService,){

  }
}
