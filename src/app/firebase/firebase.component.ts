import {Component, OnInit} from '@angular/core';
import {User} from '../config/user.model';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.scss']
})


export class FirebaseComponent implements OnInit {
  users: User[];


  constructor(
    private firebaseService: FirebaseService,
  ) {
  }

  ngOnInit(): void {
    this.firebaseService.getUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
    });
  }

  delete(user) {
    this.firebaseService.deleteUserTest(user);
  }


}
