import { Injectable, signal } from '@angular/core';
import { en } from '../i18n/en';
import { pt } from '../i18n/pt';
import { es } from '../i18n/es';

export type Language = 'en' | 'pt' | 'es';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = signal<Language>('pt');

  private translations: Record<Language, any> = {
    en,
    pt,
    es
  };

  public get currentLanguage() {
    return this.currentLang.asReadonly();
  }

  public setLanguage(lang: Language) {
    this.currentLang.set(lang);
  }

  public translate(key: string): string {
    const keys = key.split('.');
    let value = this.translations[this.currentLang()];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // return key if not found
      }
    }

    return value as string;
  }
}
