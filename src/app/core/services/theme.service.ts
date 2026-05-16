import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = signal<Theme>('light');
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const cached = localStorage.getItem('theme') as Theme;
      if (cached === 'light' || cached === 'dark') {
        this.currentTheme.set(cached);
      }
    }

    effect(() => {
      const theme = this.currentTheme();
      if (isPlatformBrowser(this.platformId)) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
    });
  }

  public get theme() {
    return this.currentTheme.asReadonly();
  }

  public toggleTheme() {
    this.currentTheme.set(this.currentTheme() === 'light' ? 'dark' : 'light');
  }

  public setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }
}
