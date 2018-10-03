import {Component, OnInit} from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {


  constructor(  private toasterService: ToasterService) {

  }

  ngOnInit() {

  }
}
