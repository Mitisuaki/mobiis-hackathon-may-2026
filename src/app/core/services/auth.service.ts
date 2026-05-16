import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal<boolean>(false);
  private readonly SESSION_KEY = 'auth_last_active';
  private readonly TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
  private lastUpdate = 0;

  constructor() {
    this.checkSession();
    this.setupActivityListeners();
  }

  public get isAuthenticated() {
    return this.isAuthenticatedSignal.asReadonly();
  }

  private checkSession() {
    if (typeof localStorage === 'undefined') return;
    
    const lastActiveStr = localStorage.getItem(this.SESSION_KEY);
    if (lastActiveStr) {
      const lastActive = parseInt(lastActiveStr, 10);
      const now = Date.now();
      
      if (now - lastActive < this.TIMEOUT_MS) {
        // Session is still valid
        this.isAuthenticatedSignal.set(true);
        this.updateActivity();
      } else {
        // Session expired
        this.logout();
      }
    }
  }

  private setupActivityListeners() {
    if (typeof window === 'undefined') return;

    const activityHandler = () => {
      if (this.isAuthenticatedSignal()) {
        const now = Date.now();
        // Throttle localStorage updates to once per minute to save performance
        if (now - this.lastUpdate > 60000) {
          this.updateActivity();
        }
      }
    };

    window.addEventListener('click', activityHandler, { passive: true });
    window.addEventListener('keypress', activityHandler, { passive: true });
    window.addEventListener('scroll', activityHandler, { passive: true });
  }

  private updateActivity() {
    if (typeof localStorage !== 'undefined') {
      const now = Date.now();
      localStorage.setItem(this.SESSION_KEY, now.toString());
      this.lastUpdate = now;
    }
  }

  public login(username?: string, password?: string): boolean {
    if (!username || !password) return false;
    
    // Case insensitive username match
    const isValidUser = username.toLowerCase() === 'silas.olanda';
    const isValidPass = password === 'admin';

    if (isValidUser && isValidPass) {
      this.isAuthenticatedSignal.set(true);
      this.updateActivity();
      return true;
    }
    return false;
  }

  public logout(): void {
    this.isAuthenticatedSignal.set(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.SESSION_KEY);
    }
  }
}
