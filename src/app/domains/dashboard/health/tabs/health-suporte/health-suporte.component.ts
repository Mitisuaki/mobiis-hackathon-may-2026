import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-suporte',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-suporte.component.html',
  styleUrls: ['./health-suporte.component.css']
})
export class HealthSuporteComponent {
  categories = [
    { key: 'CAT_LOG_ROUTING', value: 305 },
    { key: 'CAT_INTERNAL_TECH', value: 100 },
    { key: 'CAT_LOG_PLANNING', value: 40 },
    { key: 'CAT_EVENT_MGMT', value: 37 },
    { key: 'CAT_SUPPORT', value: 21 },
    { key: 'CAT_UNFILLED', value: 24 },
    { key: 'CAT_LOG_CONTROL', value: 24 }
  ];

  signals = [
    { key: 'TICKET_VOLUME' },
    { key: 'CRITICAL_CATEGORY' },
    { key: 'REVENUE_AT_RISK' },
    { key: 'INCIDENT_TYPE' }
  ];
}
