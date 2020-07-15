import { Injectable } from '@angular/core';

const validIds =  [
  {login: 'Adolf', password: 'Hiellhitter' },
  {login: 'Бусичка', password: '123456' },
  {login: 'Ganjubas88', password: 'Canabinol' },
  {login: '123', password: '123123' },
  {login: 'Пупа', password: 'Лупа' },
  ]

@Injectable({
  providedIn: 'root'
})
export class LogDataService {

  checkId(model) {
    return validIds.find(i => i.login === model.login && i.password === model.password)

  }

}
