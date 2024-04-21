import { Injectable, inject } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { ChatRoomService } from './chat-room.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private _userService = inject(UserService);
  private _chatRoomService = inject(ChatRoomService);

  private hubConnection: signalR.HubConnection;
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
      this._userService.onPoiting(user);
    });

    this.hubConnection.on('JoinSpecificChatRoom', (alertMessage: string) => {
      this._chatRoomService.onJoinedChatRoom(alertMessage);
    });
  }

  poiting(id: number, status: number) {
    this.hubConnection.invoke('PointingPresent', id, status);
  }

  connectToRoom(name: string, roomNumber: string) {
    this.hubConnection.invoke('JoinSpecificChatRoom', name, roomNumber);
  }
}
