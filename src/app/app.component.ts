import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _signalRService = inject(SignalRService);
  ngOnInit() {
    this._signalRService.connect();
  }

  setPresence() {
    this._signalRService.poiting(1);
  }
}
