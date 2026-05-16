import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-roi',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './roi.component.html',
  styleUrl: './roi.component.css',
})
export class RoiComponent {}
