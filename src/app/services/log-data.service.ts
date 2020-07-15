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

  checkId() {
    const startData = localStorage.getItem('key');
    const testId= validIds.map(i =>{return i.login}).map(i =>{return i});
    const testPass= validIds.map(i =>{return i.password}).map(i =>{return i})
    if (testId.find(i => i === JSON.parse(startData).login) && (testPass.find(i => i === JSON.parse(startData).password))) {
      console.log('Этого гуся мы знаем');
    } else {
      console.log('Залетный фраер');
    }
  }

}
