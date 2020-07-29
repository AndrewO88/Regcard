import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {DocumentChangeAction} from '@angular/fire/firestore/interfaces';
import {User} from '../config/user.model';
import * as firebase from 'firebase';


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
    return this.firestore.collection('users').doc(user.id).set(user);
  }


  deleteUser(userId: string) {
    this.firestore.doc('users/' + userId).delete();
  }


  firebaseCrate(model) {
    firebase.auth().createUserWithEmailAndPassword(model.login + model.email, model.password).then(data => {
      model.id = data.user.uid;
      this.createUser(model);
    }).catch(function(error) {
      console.log('firebase signup error ', error);
    });
  }

  firebaseSignin(model) {
    return firebase.auth().signInWithEmailAndPassword(model.email, model.password);
  }

  firebaseSignout() {
    firebase.auth().signOut().then(function() {
      console.log(' user got signed out');
    }).catch(function(error) {
      console.log('sign out error ', error);
    });
  }

  deleteUserTest(user) {
    firebase.auth().signInWithEmailAndPassword(user.login + user.email, user.password)
      .then(function(info) {
        let user = firebase.auth().currentUser;
        console.log(user);
        user.delete();
      }).then(() => this.deleteUser(user.id));
  }
}
