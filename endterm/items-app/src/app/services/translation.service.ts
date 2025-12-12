import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Lang = 'en' | 'ru' | 'kz';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private langSubject = new BehaviorSubject<Lang>('en');
  lang$ = this.langSubject.asObservable();

  private translations: Record<Lang, Record<string, string>> = {
    en: { items:'Items', favorites:'Favorites', login:'Login', logout:'Logout', signup:'Sign up', profile:'Profile',
          addToFavorites:'Add to Favorites', removeFromFavorites:'Remove from Favorites', backToItems:'Back to items' },
    ru: { items:'Товары', favorites:'Избранное', login:'Войти', logout:'Выйти', signup:'Регистрация', profile:'Профиль',
          addToFavorites:'Добавить в избранное', removeFromFavorites:'Убрать из избранного', backToItems:'Назад к товарам' },
    kz: { items:'Тауарлар', favorites:'Таңдаулылар', login:'Кіру', logout:'Шығу', signup:'Тіркелу', profile:'Профиль',
          addToFavorites:'Таңдаулыларға қосу', removeFromFavorites:'Таңдаулылардан жою', backToItems:'Тауарларға оралу' },
  };

  initLang() {
    const saved = localStorage.getItem('lang') as Lang | null;
    const lang: Lang = saved && ['en','ru','kz'].includes(saved) ? saved : 'en';
    this.langSubject.next(lang);
  }

  setLang(lang: Lang) {
    this.langSubject.next(lang);
    localStorage.setItem('lang', lang);
  }

  t(key: string): string {
    const lang = this.langSubject.value;
    return this.translations[lang]?.[key] ?? key;
  }

  get lang(): Lang {
    return this.langSubject.value;
  }
}