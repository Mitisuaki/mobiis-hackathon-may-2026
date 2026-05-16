import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-overview',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-overview.component.html',
  styleUrls: ['./health-overview.component.css']
})
export class HealthOverviewComponent {}
