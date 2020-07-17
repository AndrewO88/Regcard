import { Injectable } from '@angular/core';

const validIds =  [
  {login: 'Adolf', password: 'Hiellhitter', personData: {name: 'Австрийский художник', address: 'Berlin', email: 'fuhrer@3reih.com' } },
  {login: 'Бусичка', password: '123456', personData: {name: 'Елена Букова', address: 'Saint Petersburg', email: 'Maluseishina@mail.com' } },
  {login: 'Ganjubas88', password: 'Canabinol', personData: {name: 'Снуп Догг', address: 'Hidra', email: 'dudochka@goodstuff.com' } },
  {login: '123', password: '123123', personData: {name: 'Test', address: 'test123', email: '123@test.com' } },
  {login: 'Пупа', password: 'Лупа', personData: {name: 'Пупа', address: 'Лупа', email: 'Pupa@lupa.com' } },
  ]

@Injectable({
  providedIn: 'root'
})
export class LogDataService {

  checkId(model) {
    return validIds.find(i => i.login === model.login && i.password === model.password)

  }

  showData(model) {
    if (this.checkId(model)) {
     return  console.log(this.checkId(model).personData);
    }
  }

}
