import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'pointing',
    component: UserListComponent,
  },

  {
    path: 'chat',
    component: ChatComponent,
  },
];
