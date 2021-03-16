import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getCustomers() {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type':  'application/json',
      });
      this.http.get('http://localhost:4200/assets/customers-list.json', {
        headers
      }).subscribe(data => {
        resolve(data);
      },
      error => {
        console.log('rejecting error');
        reject(error);
      });
    });
  }
}
