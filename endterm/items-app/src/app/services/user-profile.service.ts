import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';

import { User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  avatarUrl: string;
  favorites: number[];
}

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private firestore: Firestore) {}

  private profileDoc(uid: string) {
    return doc(this.firestore, 'users', uid);
  }

  getProfile(uid: string): Observable<UserProfile | null> {
    return docData(this.profileDoc(uid)).pipe(
      map(data => data as UserProfile),
      catchError(() => of(null))
    );
  }

  async ensureUserProfile(user: User): Promise<void> {
    const ref = this.profileDoc(user.uid);

    const defaultProfile: UserProfile = {
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.email?.split('@')[0] ?? 'User',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      favorites: [],
    };

    await setDoc(ref, defaultProfile, { merge: true });
  }

  updateProfile(uid: string, patch: Partial<UserProfile>): Promise<void> {
    return updateDoc(this.profileDoc(uid), patch);
  }

  updateFavorites(uid: string, ids: number[]) {
    return updateDoc(this.profileDoc(uid), {
      favorites: ids,
    });
  }
}