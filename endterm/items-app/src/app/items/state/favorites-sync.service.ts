import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { selectFavorites } from './favorites.selectors';
import { setFavorites } from './favorites.actions';
import { take } from 'rxjs';
import { Item } from '../../services/item.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesSyncService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private store: Store
  ) {}

  private favDoc(uid: string) {
    return doc(this.firestore, `users/${uid}`);
  }

  // Загрузка избранных из Firestore
  async loadFromFirestore(uid: string) {
    const snap = await getDoc(this.favDoc(uid));

    let items: Item[] = [];

    if (snap.exists()) {
      const data: any = snap.data();
      items = data.favorites || [];
    }

    // заменяем стор
    this.store.dispatch(setFavorites({ items }));

    // и localStorage
    localStorage.setItem('favorites', JSON.stringify(items));
  }

  // Сохранение избранных в Firestore
  async saveToFirestore(uid: string) {
    this.store.select(selectFavorites).pipe(take(1)).subscribe(async favs => {
      await setDoc(this.favDoc(uid), { favorites: favs }, { merge: true });
    });
  }

  // Слияние localStorage + Firestore при signup
  async mergeLocalAndServer(uid: string) {
    const local: Item[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    const snap = await getDoc(this.favDoc(uid));
    let server: Item[] =
      snap.exists() ? (snap.data() as any).favorites || [] : [];

    const merged = [...server, ...local].filter(
      (item, idx, arr) => arr.findIndex(i => i.id === item.id) === idx
    );

    await setDoc(this.favDoc(uid), { favorites: merged }, { merge: true });

    this.store.dispatch(setFavorites({ items: merged }));
    localStorage.setItem('favorites', JSON.stringify(merged));
  }
}