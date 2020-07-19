import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LockalStorageManegmentService {

  save(model: any, key: string): void {
    localStorage.setItem(key, JSON.stringify(model));
  }

  load(key: string):  any {
   return localStorage.getItem(key)
  }

  delete(key: string): void {
    localStorage.removeItem(key)
  }
  constructor() { }
}
