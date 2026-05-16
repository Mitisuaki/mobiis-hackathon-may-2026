import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-churn',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-churn.component.html',
  styleUrls: ['./health-churn.component.css']
})
export class HealthChurnComponent {
  churnAccounts = [
    { client: 'Martins', value: 67284 },
    { client: 'Votorantim', value: 38000 },
    { client: 'Transportes Bertolini', value: 13051 },
    { client: 'Castropil', value: 4750 },
    { client: 'Frigol', value: 4406 },
    { client: 'Fr Distribuição', value: 3500 },
  ];

  formatCurrency(val: number): string {
    return val.toLocaleString('pt-BR');
  }
}
