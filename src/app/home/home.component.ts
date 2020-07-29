import { Component, OnInit } from '@angular/core';
import {LogDataService} from '../services/log-data.service';
import {LocalStorageManagementService} from '../services/local-storage-management.service';
import {USER_INFO} from '../config/config';
import {FirebaseService} from '../services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private  dataService: LogDataService,
    private localStorage: LocalStorageManagementService,
    private fire: FirebaseService,
  ) {
  }

  ngOnInit(): void {
  }

  clearStorage() {
     this.localStorage.delete(USER_INFO)
    this.fire.firebaseSignout()
  }
}
