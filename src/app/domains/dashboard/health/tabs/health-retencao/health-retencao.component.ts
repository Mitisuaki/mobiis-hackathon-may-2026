import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-retencao',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-retencao.component.html',
  styleUrls: ['./health-retencao.component.css']
})
export class HealthRetencaoComponent {
  causas = [
    { key: 'RETENCAO_BAR1', value: 5 },
    { key: 'RETENCAO_BAR2', value: 4 },
    { key: 'RETENCAO_BAR3', value: 3 },
    { key: 'RETENCAO_BAR4', value: 3 }
  ];
}
