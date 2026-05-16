import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-risco',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-risco.component.html',
  styleUrls: ['./health-risco.component.css']
})
export class HealthRiscoComponent {
  riskAccounts = [
    { client: 'PATHFIND', statusKey: 'RISCO_STATUS_CRITICO', tickets: 34, statusClass: 'critico' },
    { client: 'Votorantim', statusKey: 'RISCO_STATUS_ATENCAO', tickets: 12, statusClass: 'atencao' },
    { client: 'Triunfante', statusKey: 'RISCO_STATUS_ATENCAO', tickets: 8, statusClass: 'atencao' },
    { client: 'TBM Textil', statusKey: 'RISCO_STATUS_OBSERVACAO', tickets: 3, statusClass: 'observacao' },
    { client: 'Control', statusKey: 'RISCO_STATUS_OBSERVACAO', tickets: 2, statusClass: 'observacao' }
  ];
}
