import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BusyService {

  private busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() {}
  
  setBusy(status: boolean) {
    this.busy.next(status);
  }
  
  getBusy(): Observable<boolean> {
    return this.busy.asObservable();
  }
  
}
