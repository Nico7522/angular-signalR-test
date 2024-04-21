import { Injectable, inject } from '@angular/core';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class PointingService {
  private _signalRService = inject(SignalRService);
  constructor() {}
  private _id = 1;
  setStatus(status: number) {
    this._signalRService.poiting(this._id, status);
  }
}
