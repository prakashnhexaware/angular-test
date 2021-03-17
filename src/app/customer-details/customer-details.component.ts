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

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.dynamicForm.invalid) {
          return;
      }

      console.log("Dynamic Form Value"+ this.dynamicForm.value);
      this.customers.push(this.dynamicForm.value.tickets[0]);
      this.customers[this.customers.length - 1].isEditing = false;
      this.dataService.serviceData.push(this.customers[0]);
      this.router.navigate(['customer-list']);
      this.t.reset();
  }

  onClear() {
      // clear errors and reset ticket fields
      this.submitted = false;
      this.t.reset();
  }
}
