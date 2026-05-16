import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent {
  selectedItemId = signal<string>('ITEM_1');

  items = [
    { id: 'ITEM_1', nameKey: 'CRM.ITEM_1.NAME' },
    { id: 'ITEM_2', nameKey: 'CRM.ITEM_2.NAME' },
    { id: 'ITEM_3', nameKey: 'CRM.ITEM_3.NAME' }
  ];

  onSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedItemId.set(select.value);
  }
}
