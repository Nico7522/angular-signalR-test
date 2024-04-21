import { Injectable, inject } from '@angular/core';
import { userList } from '../fake-date';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  userList$ = this._userList$.asObservable();
  constructor() {
    this.getAll();
  }

  onPoiting(user: User) {
    userList.map((u) => {
      if (u.id === user.id) {
        u.status = user.status;
      }
    });
    this._userList$.next(userList);
  }
  getAll() {
    this._userList$.next(userList);
  }
}
