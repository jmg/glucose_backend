import { Component, OnInit } from '@angular/core';
import { Glucose } from '../glucose';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-glucose',
  templateUrl: './glucose.component.html',
  styleUrls: ['./glucose.component.css']
})
export class GlucoseComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  glucose = new Glucose(new Date(), 100);
  submitted = false;

  onSubmit() {
      this.submitted = true;
      this.http.post("http://localhost:5000" + '/auth/login', {"email": "test@gmail.com", "password": "123456"}).subscribe(response => {

        let httpHeaders = new HttpHeaders().set('Authorization', "Bearer " + response.auth_token);
        let options = {
            headers: httpHeaders
        };

        this.http.post("http://localhost:5000" + '/glucose/measure', {"value": this.glucose.value, "date": this.glucose.date}, options).subscribe(response => {
          console.log(response)
        });
      });
  }

  ngOnInit() {
  }

}
