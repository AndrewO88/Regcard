import { Component, OnInit } from '@angular/core';
import {LogDataService, ValidIds} from '../services/log-data.service';
import {LockalStorageManegmentService} from '../services/lockal-storage-manegment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataClient: ValidIds
  constructor(
    private  dataService: LogDataService,
    private localStorage: LockalStorageManegmentService
  ) {
  }

  ngOnInit(): void {
    this.dataClient =  this.dataService.userData
    console.log(this.dataClient);
  }

  clearStorage() {
    this.localStorage.delete('key')
  }
}
