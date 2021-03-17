import { Component, OnInit } from '@angular/core';
import {CustomersService} from '../services/customers.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers : any[];
  constructor(public customersService: CustomersService,
    public dataService: DataService) { }

  ngOnInit(): void {
    let isPushed = false;
    console.log("Service Data", this.dataService.serviceData);
    this.customers = [];
    this.customersService.getCustomers().then(resp =>{
        const data: any = resp;
        this.customers = data;
        for(var ind=0;ind<this.customers.length; ind++){
            this.customers[ind].isEditing = false;
        }
        isPushed = true;
        if(this.dataService.serviceData.length > 0){
            this.customers.push(this.dataService.serviceData[0]);
        }
    });
    if(!isPushed) {
        if(this.dataService.serviceData.length > 0){
            this.customers.push(this.dataService.serviceData[0]);
        }
    }
  }
 
  doEdit(ind){
      this.customers[ind].isEditing = true;
  }

  doSave(ind) {
    this.customers[ind].isEditing = false;
  }
}
