import { Routes } from '@angular/router';
import { LoginComponent } from './domains/auth/login/login.component';
import { DashboardLayoutComponent } from './domains/dashboard/layout/dashboard-layout.component';
import { CockpitComponent } from './domains/dashboard/cockpit/cockpit.component';
import { HomeComponent } from './domains/dashboard/home/home.component';
import { PlaceholderComponent } from './domains/dashboard/placeholder/placeholder.component';
import { ProposalComponent } from './domains/dashboard/proposal/proposal.component';
import { HealthComponent } from './domains/dashboard/health/health.component';
import { MeetComponent } from './domains/dashboard/meet/meet.component';
import { CrmComponent } from './domains/dashboard/crm/crm.component';
import { DeskComponent } from './domains/dashboard/desk/desk.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cockpit', component: CockpitComponent },
      { path: 'meet', component: MeetComponent },
      { path: 'crm', component: CrmComponent },
      { path: 'health', component: HealthComponent },
      { path: 'desk', component: DeskComponent },
      { path: 'roi', component: PlaceholderComponent },
      { path: 'proposal', component: ProposalComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
