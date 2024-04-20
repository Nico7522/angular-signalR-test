import { Injectable, inject } from '@angular/core';
import { userList } from '../fake-date';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _signalRService = inject(SignalRService);
  constructor() {
    this._signalRService.pointing$.subscribe((user) => {
      userList.map((u) => {
        if (u.id === user.id) {
          u.status = 1;
        }
      });
      console.log(userList);
    });
  }
  private _idFormToken = 1;

  getAll(): Observable<User[]> {
    return of(userList);
  }

  pointing() {
    this._signalRService.poiting(this._idFormToken);
  }

  setPresence() {}
}
