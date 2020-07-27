import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {DocumentChangeAction} from '@angular/fire/firestore/interfaces';
import {User} from '../config/user.model';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(private firestore: AngularFirestore) {
  }

  getUser(): Observable<DocumentChangeAction<any>[]> {
    return this.firestore.collection('users').snapshotChanges();
  }

  createUser(user: User) {
    user.id = this.firestore.createId();
    console.log('createUser', user);
    return this.firestore.collection('users').doc(user.id).set(user);
  }

  updateUser(user: User) {
    delete user.id;
    this.firestore.doc('users/' + user.id).update(user);
  }

  deleteUser(userId: string) {
    this.firestore.doc('users/' + userId).delete();
  }

  createId() {
    return this.firestore.createId()
  }

}
