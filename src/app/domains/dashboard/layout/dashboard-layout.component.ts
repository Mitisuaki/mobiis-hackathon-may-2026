import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { TranslationService, Language } from '../../../core/services/translation.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ThemeService, Theme } from '../../../core/services/theme.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  private translationService = inject(TranslationService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public themeService = inject(ThemeService);
  public isSidebarCollapsed = false;

  get currentLang(): Language {
    return this.translationService.currentLanguage();
  }

  setLanguage(lang: Language) {
    this.translationService.setLanguage(lang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
