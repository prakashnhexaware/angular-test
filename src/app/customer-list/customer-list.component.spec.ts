import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomerListComponent } from './customer-list.component';
import {CustomersService} from '../services/customers.service';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let httpMock: HttpTestingController;
  let testService: CustomersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ CustomersService ]
    })
    .compileComponents();
    testService = TestBed.inject(CustomersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCustomers() should http GET names and email address', () => {

    const customers = [{
      "name" : "Customer 1",
      "email": "testuser1@testmail.com" 
  },
  {
      "name" : "Customer 2",
      "email": "testuser2@testmail.com" 
  },
  {
      "name" : "Customer 3",
      "email": "testuser3@testmail.com" 
  },
  {
      "name" : "Customer 4",
      "email": "testuser4@testmail.com" 
  },
  {
      "name" : "Customer 5",
      "email": "testuser5@testmail.com" 
  }];

    testService.getCustomers().then((res) => {
      expect(res).toEqual(customers);
    });

    const req = httpMock.expectOne('/assets/customers-list.json');
    expect(req.request.method).toEqual("GET");
    req.flush(customers);

    httpMock.verify();
  });
});
