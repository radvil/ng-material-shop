import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() { }

  public setItem(key: string, value: any): void {
    localStorage.setItem(`${env.appPrefix}-${key}`, JSON.stringify(value));
  }

  public getItem(key: string) {
    const item = localStorage.getItem(`${env.appPrefix}-${key}`)
    if (item) {
      return JSON.parse(item);
    }
  }

  public removeItem(key: string): void {
    localStorage.removeItem(`${env.appPrefix}-${key}`);
  }
}
