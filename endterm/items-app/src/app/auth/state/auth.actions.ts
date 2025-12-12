import { createAction, props } from '@ngrx/store';
import { User } from '@angular/fire/auth';

export const authLogin = createAction(
  '[Auth] Login',
  props<{ user: User }>()
);

export const authLogout = createAction('[Auth] Logout');