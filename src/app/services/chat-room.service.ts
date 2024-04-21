import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {
  alertMessage$: Subject<string> = new Subject<string>();
  constructor() {}

  onJoinedChatRoom(message: string) {
    this.alertMessage$.next(message);
  }
}
