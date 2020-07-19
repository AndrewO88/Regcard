import { Component, OnInit } from '@angular/core';
import {LogDataService, ValidIds} from '../services/log-data.service';
import {LockalStorageManegmentService} from '../services/lockal-storage-manegment.service';
import {USER_INFO} from '../config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataClient: ValidIds
  paramList: any[]

  constructor(
    private  dataService: LogDataService,
    private localStorage: LockalStorageManegmentService
  ) {
  }

  ngOnInit(): void {
    this.dataClient =  this.dataService.userData
    this.paramList =  Object.entries(this.dataClient.personData)
  }

  clearStorage() {
    this.localStorage.delete(USER_INFO)
  }
}
