import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  pointing$: Subject<User> = new Subject<User>();
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7095/chat')
      .build();
  }

  connect() {
    if (this.hubConnection.state === 'Disconnected') {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connected');
        })
        .catch((err) => {
          console.log(err);
        });
    }

    this.hubConnection.on('PointingPresent', (user: User) => {
      this.pointing$.next(user);
    });
  }

  poiting(id: number) {
    this.hubConnection.invoke('PointingPresent', id);
  }
}
