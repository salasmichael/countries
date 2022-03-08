import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> = 
                   new BehaviorSubject<any>('close');
  
  infoCountry = new ReplaySubject<any>();


  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  open() {
    this.display.next('open');
  }

  close() {
    this.display.next('close');
  }
}