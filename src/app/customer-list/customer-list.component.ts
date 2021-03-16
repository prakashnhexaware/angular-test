import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {CustomersService} from '../services/customers.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  customers : any[];
  constructor(private formBuilder: FormBuilder,
    public customersService: CustomersService) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ['1', Validators.required],
        tickets: new FormArray([])
    });
    const numberOfTickets = 1;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
    this.customers = [];
    this.customersService.getCustomers().then(resp =>{
        const data: any = resp;
        this.customers = data;
        for(var ind=0;ind<this.customers.length; ind++){
            this.customers[ind].isEditing = false;
        }
    });
  }
  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
  }

  doEdit(ind){
      console.log("Called Edit");
      this.customers[ind].isEditing = true;
  }

  doSave(ind) {
    console.log("Called Save");
    this.customers[ind].isEditing = false;
  }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.dynamicForm.invalid) {
          return;
      }

      console.log("Dynamic Form Value"+ this.dynamicForm.value);
      this.customers.push(this.dynamicForm.value.tickets[0]);
      this.customers[this.customers.length - 1].isEditing = false;
      // display form values on success
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
      //this.submitted = false;
      this.t.reset();
  }

  onReset() {
      // reset whole form back to initial state
      this.submitted = false;
      this.dynamicForm.reset();
      this.t.clear();
  }

  onClear() {
      // clear errors and reset ticket fields
      this.submitted = false;
      this.t.reset();
  }
}
