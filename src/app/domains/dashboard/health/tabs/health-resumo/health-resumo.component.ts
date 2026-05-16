import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-resumo',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-resumo.component.html',
  styleUrls: ['./health-resumo.component.css']
})
export class HealthResumoComponent {
  decisions = [
    {
      titleKey: 'RESUMO_CARD1_TITLE',
      descKey: 'RESUMO_CARD1_DESC',
      colorClass: 'card-cyan'
    },
    {
      titleKey: 'RESUMO_CARD2_TITLE',
      descKey: 'RESUMO_CARD2_DESC',
      colorClass: 'card-orange'
    },
    {
      titleKey: 'RESUMO_CARD3_TITLE',
      descKey: 'RESUMO_CARD3_DESC',
      colorClass: 'card-pink'
    },
    {
      titleKey: 'RESUMO_CARD4_TITLE',
      descKey: 'RESUMO_CARD4_DESC',
      colorClass: 'card-green'
    }
  ];
}
