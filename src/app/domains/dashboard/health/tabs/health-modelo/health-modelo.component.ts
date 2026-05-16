import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-modelo',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-modelo.component.html',
  styleUrls: ['./health-modelo.component.css']
})
export class HealthModeloComponent {
  cards = [
    {
      numKey: 'MODELO_CARD1_NUM',
      titleKey: 'MODELO_CARD1_TITLE',
      descKey: 'MODELO_CARD1_DESC',
      colorClass: 'card-cyan'
    },
    {
      numKey: 'MODELO_CARD2_NUM',
      titleKey: 'MODELO_CARD2_TITLE',
      descKey: 'MODELO_CARD2_DESC',
      colorClass: 'card-purple'
    },
    {
      numKey: 'MODELO_CARD3_NUM',
      titleKey: 'MODELO_CARD3_TITLE',
      descKey: 'MODELO_CARD3_DESC',
      colorClass: 'card-orange'
    },
    {
      numKey: 'MODELO_CARD4_NUM',
      titleKey: 'MODELO_CARD4_TITLE',
      descKey: 'MODELO_CARD4_DESC',
      colorClass: 'card-teal'
    },
    {
      numKey: 'MODELO_CARD5_NUM',
      titleKey: 'MODELO_CARD5_TITLE',
      descKey: 'MODELO_CARD5_DESC',
      colorClass: 'card-green'
    }
  ];
}
