import { Component } from '@angular/core';
import * as $ from 'jquery';
//import 'jquery-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Glucose Control';

  constructor() {

      $(document).ready(function() {
          $(".datepicker").datepicker();
      });
  }
}
