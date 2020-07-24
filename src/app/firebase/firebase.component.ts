import {Component, OnInit} from '@angular/core';
import {User} from '../config/user.model';
import {FirebaseService} from '../services/firebase.service';
import {LogDataService} from '../services/log-data.service';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.scss']
})

// значит так !
// хуй\пойми как реализовать вложенность внутри базы данных!
// хуй\пойми как в базе данных присваивать айди ..ибо !
//  было установленно опытным путем что удаляет эта паскуда тока
// те посты у которых айди соответсвует айди на сайте
// соответвенно так и не смог вьебать как оживить ГЕТ и АПДЕЙТ..
//   и еще ахуенный вопросик- а как присваивать айди динамически.
//   ставка что это просто и владилен 3аэто базарил.. но чото я запамятовал..
// а искать это сейчас чото дюже впадлу
// 4:13..запиздовал спать..казалось-бы мог бы в игруху гонятьночь на пролет..
//   но желание подготовиться к буткемпу уверенно одержало верх

export class FirebaseComponent implements OnInit {
  users: User[];
  userData = this.dataService.userData;
  user: User = {
    id: undefined,
    login: this.userData.login,
    password: this.userData.password,
    personData: {name: this.userData.personData.name , address: this.userData.personData.address, email: this.userData.personData.email}
  };

  constructor(private firebaseService: FirebaseService,
              private  dataService: LogDataService,
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

  create(user: User): void {
    this.firebaseService.createUser(user);
  }

  update(user: User): void {
    this.firebaseService.updateUser(user);
  }

  delete(id: string): void {
    this.firebaseService.deleteUser(id);
  }

  getUser() {
    this.firebaseService.getUser();
  }
}
