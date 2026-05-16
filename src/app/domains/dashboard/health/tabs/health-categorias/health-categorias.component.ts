import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-categorias',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-categorias.component.html',
  styleUrls: ['./health-categorias.component.css']
})
export class HealthCategoriasComponent {
  tableData = [
    { key: 'CAT_FULL_LOG_ROUTING', tickets: 305, base: 49.3, highlight: true },
    { key: 'CAT_FULL_INTERNAL_TECH', tickets: 100, base: 16.2, highlight: false },
    { key: 'CAT_FULL_LOG_PLANNER', tickets: 40, base: 6.5, highlight: false },
    { key: 'CAT_FULL_EVENT_MGMT', tickets: 37, base: 6.0, highlight: false },
    { key: 'CAT_FULL_SUPPORT', tickets: 31, base: 5.0, highlight: false },
    { key: 'CAT_FULL_UNFILLED', tickets: 24, base: 3.9, highlight: false },
    { key: 'CAT_FULL_LOG_TOWER', tickets: 24, base: 3.9, highlight: false },
    { key: 'CAT_FULL_MAP_EDIT', tickets: 8, base: 1.3, highlight: false },
    { key: 'CAT_FULL_DATA_INTEGRATION', tickets: 8, base: 1.3, highlight: false },
    { key: 'CAT_FULL_DOUBTS', tickets: 7, base: 1.1, highlight: false }
  ];
}
