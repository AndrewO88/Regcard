import { Component, OnInit } from '@angular/core';
import {LogDataService, ValidIds} from '../services/log-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataClient: ValidIds
  constructor(
    private  dataService: LogDataService
  ) {
  }

  ngOnInit(): void {
    this.dataClient =  this.dataService.userData
    console.log(this.dataClient);
  }

}
