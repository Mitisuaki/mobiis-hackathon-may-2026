import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-desk',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './desk.component.html',
  styleUrl: './desk.component.css',
})
export class DeskComponent {}
