import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SignalRService } from '../../services/signal-r.service';
import { ChatRoomService } from '../../services/chat-room.service';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  roomNumber: FormControl = new FormControl('');
  name: FormControl = new FormControl('');
  message: FormControl = new FormControl('');

  connectedAlertMessages: string[] = [];
  messages: { name: string; message: string }[] = [];
  private _chatRoomService = inject(ChatRoomService);
  constructor() {
    this._chatRoomService.alertMessage$.subscribe((alertMessage) => {
      this.connectedAlertMessages.push(alertMessage);
    });

    this._chatRoomService.messagesList$.subscribe((messages) => {
      this.messages.push(messages);
    });
  }
  private _signalRService = inject(SignalRService);
  handleSubmit() {
    this._signalRService.connectToRoom(this.name.value, this.roomNumber.value);
  }

  sendMessage() {
    this._signalRService.sendMessage(this.message.value, this.roomNumber.value);
  }
}
