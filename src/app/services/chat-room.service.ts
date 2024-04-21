import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {
  alertMessage$: Subject<string> = new Subject<string>();
  messagesList$: Subject<{ name: string; message: string }> = new Subject<{
    name: string;
    message: string;
  }>();
  messageList: { name: string; message: string }[] = [];

  constructor() {}

  onJoinedChatRoom(message: string) {
    this.alertMessage$.next(message);
  }

  alertNewMessage(name: string, message: string) {
    this.messagesList$.next({ name, message });
  }
}
