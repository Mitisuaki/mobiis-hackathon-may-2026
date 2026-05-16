import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-clientes',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-clientes.component.html',
  styleUrls: ['./health-clientes.component.css']
})
export class HealthClientesComponent {
  clientes = [
    { label: 'Mobiis', key: null, value: 116 },
    { label: 'PATHFIND', key: null, value: 67 },
    { label: 'Votorantim', key: null, value: 47 },
    { label: 'NÃO ASSOCIADO A UM CLIENTE', key: 'CLIENTES_UNASSOCIATED', value: 29 },
    { label: 'TRIUNFANTE', key: null, value: 25 },
    { label: 'TBM Textil', key: null, value: 18 },
    { label: 'Transportes Bertolini (TBL)', key: null, value: 17 },
    { label: 'FR Distribuição', key: null, value: 16 },
    { label: 'Martins BH - Belo Horizonte Mg', key: null, value: 10 },
    { label: 'Control', key: null, value: 10 },
    { label: 'Publicidade', key: null, value: 9 },
    { label: 'Distribuidora Arroba', key: null, value: 8 },
    { label: 'Carrefour', key: null, value: 8 },
    { label: 'Volvo Transportes', key: null, value: 7 }
  ];
}
