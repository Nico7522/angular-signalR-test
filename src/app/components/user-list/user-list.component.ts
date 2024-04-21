import { Component, WritableSignal, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { PointingService } from '../../services/pointing.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TranslateStatusPipe } from '../../pipes/translate-status.pipe';
import { TagModule } from 'primeng/tag';
import { TranslateStatusSeverityPipe } from '../../pipes/translate-status-severity.pipe';
import { PanelModule } from 'primeng/panel';
import { BrowserModule } from '@angular/platform-browser';
import { map, mergeMap, of, switchMap, take } from 'rxjs';
import { userList } from '../../fake-date';
import { SignalRService } from '../../services/signal-r.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    TableModule,
    TranslateStatusPipe,
    TranslateStatusSeverityPipe,
    TagModule,
    PanelModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  idToken = 1;
  absentUsers: WritableSignal<number | undefined> = signal(0);
  presentUsers: WritableSignal<number | undefined> = signal(0);
  anomalyUsers: WritableSignal<number | undefined> = signal(0);

  private _userService = inject(UserService);
  private _pointingService = inject(PointingService);
  private _sR = inject(SignalRService);

  userList$ = this._userService.userList$.pipe(
    map((users) => {
      let present = 0;
      let absent = 0;
      let anomaly = 0;
      users.map((u) => {
        if (u.status === 0) absent += 1;
        if (u.status === 1) present += 1;
        if (u.status === 2) anomaly += 1;
      });
      this.absentUsers.set(absent);
      this.presentUsers.set(present);
      this.anomalyUsers.set(anomaly);
      return users;
    })
  );
  setStatus(status: number) {
    this._pointingService.setStatus(status);
  }
}
