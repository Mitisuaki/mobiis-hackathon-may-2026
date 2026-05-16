import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-roadmap',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-roadmap.component.html',
  styleUrls: ['./health-roadmap.component.css']
})
export class HealthRoadmapComponent {
  phases = [
    {
      timeKey: 'ROADMAP_CARD1_TIME',
      titleKey: 'ROADMAP_CARD1_TITLE',
      descKey: 'ROADMAP_CARD1_DESC',
      footerKey: 'ROADMAP_CARD1_FOOTER',
      colorClass: 'card-cyan',
      showDottedBorder: true // first card has a dotted box around the title in the mockup
    },
    {
      timeKey: 'ROADMAP_CARD2_TIME',
      titleKey: 'ROADMAP_CARD2_TITLE',
      descKey: 'ROADMAP_CARD2_DESC',
      footerKey: 'ROADMAP_CARD2_FOOTER',
      colorClass: 'card-orange',
      showDottedBorder: false
    },
    {
      timeKey: 'ROADMAP_CARD3_TIME',
      titleKey: 'ROADMAP_CARD3_TITLE',
      descKey: 'ROADMAP_CARD3_DESC',
      footerKey: 'ROADMAP_CARD3_FOOTER',
      colorClass: 'card-green',
      showDottedBorder: false
    }
  ];
}
