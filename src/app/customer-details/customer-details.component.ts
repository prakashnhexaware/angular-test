import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  customers : any[];
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dataService: DataService) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      numberOfCustomers: ['1', Validators.required],
        customers: new FormArray([])
    });
    const numberOfCustomers = 1;
    if (this.t.length < numberOfCustomers) {
        for (let i = this.t.length; i < numberOfCustomers; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfCustomers; i--) {
            this.t.removeAt(i);
        }
    }
    this.customers = [];
  }
  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.customers as FormArray; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.dynamicForm.invalid) {
          return;
      }

      console.log("Dynamic Form Value"+ this.dynamicForm.value);
      this.customers.push(this.dynamicForm.value.customers[0]);
      this.customers[this.customers.length - 1].isEditing = false;
      this.dataService.serviceData.push(this.customers[0]);
      this.router.navigate(['customer-list']);
      this.t.reset();
  }

  onClear() {
      // clear errors and reset customer fields
      this.submitted = false;
      this.t.reset();
  }
}
