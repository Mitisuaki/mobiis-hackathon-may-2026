import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card">
      <div class="header">
        <span class="icon">{{ icon }}</span>
        <span class="title">{{ title }}</span>
      </div>
      <div class="value">{{ value }}</div>
      <div class="trend" *ngIf="trend" [class.positive]="trend > 0" [class.negative]="trend < 0">
        {{ trend > 0 ? '+' : '' }}{{ trend }}%
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      background-color: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }
    .value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text-primary);
    }
    .trend {
      font-size: 0.875rem;
      font-weight: 500;
    }
    .trend.positive { color: var(--color-success); }
    .trend.negative { color: var(--color-danger); }
  `]
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() icon = '';
  @Input() trend?: number;
}
