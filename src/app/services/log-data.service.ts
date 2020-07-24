import { Injectable } from '@angular/core';
export interface PersonData {
  name: string,
  address: string,
  email: string,
  status?: string,
  [key:  string]: any
}
export interface ValidIds {
  id: string,
  login: string,
  password: string,
  passwordConfirm: string,
  personData: PersonData

}
const validIds: ValidIds[] =  [
  { id: '', login: 'Adolf', password: 'Hiellhitter', passwordConfirm: 'Hiellhitter', personData: {name: 'Австрийский художник', address: 'Berlin', email: 'fuhrer@3reih.com' } },
  { id: '', login: 'Бусичка', password: '123456', passwordConfirm: '123456', personData: {name: 'Елена Букова', address: 'Saint Petersburg', email: 'Maluseishina@mail.com' } },
  { id: '', login: 'Ganjubas88', password: 'Canabinol', passwordConfirm: 'Canabinol', personData: {name: 'Снуп Догг', address: 'Hidra', email: 'dudochka@goodstuff.com' } },
  { id: '', login: '123', password: '123123', passwordConfirm: '123123', personData: {name: 'Test', address: 'test123', email: '123@test.com', status: 'vip' } },
  { id: '', login: 'Пупа', password: 'Лупа88', passwordConfirm: 'Лупа88', personData: {name: 'Пупа', address: 'Лупа', email: 'Pupa@lupa.com',  } },
  ]

@Injectable({
  providedIn: 'root'
})
export class LogDataService {
  userData:  ValidIds
  checkId(model) {
    this.userData = validIds.find(i => i.login === model.login && i.password === model.password)
    return  this.userData

  }

  // showData(model) {
  //   if (this.checkId(model)) {
  //    return  console.log(this.checkId(model).personData);
  //   }
  // }

}
