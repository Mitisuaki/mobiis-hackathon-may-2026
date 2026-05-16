import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-ocorrencias',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-ocorrencias.component.html',
  styleUrls: ['./health-ocorrencias.component.css']
})
export class HealthOcorrenciasComponent {
  occurrences = [
    { key: 'OCC_INCIDENT', value: 269 },
    { key: 'OCC_INFO', value: 78 },
    { key: 'OCC_ACCESS', value: 40 },
    { key: 'OCC_INTERNAL', value: 37 },
    { key: 'OCC_SERVICE', value: 37 },
    { key: 'OCC_TASK', value: 36 },
    { key: 'OCC_OTHER', value: 35 },
    { key: 'OCC_CANCELLATION', value: 12 },
    { key: 'OCC_FINANCIAL', value: 11 },
    { key: 'OCC_COMPLAINT', value: 10 }
  ];
}
