import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-cockpit',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  currentSlide = 0;
  private touchStartX = 0;
  private touchEndX = 0;
  private isDragging = false;

  setSlide(index: number) {
    this.currentSlide = index;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.touchStartX = event.screenX;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    // We could add real-time drag here, but simple swipe on up is cleaner for now
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.touchEndX = event.screenX;
    this.handleSwipe();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    if (this.isDragging) {
      this.isDragging = false;
      this.touchEndX = event.screenX;
      this.handleSwipe();
    }
  }

  private handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to trigger swipe
    if (this.touchEndX < this.touchStartX - swipeThreshold) {
      // Swiped left (go next)
      if (this.currentSlide < 1) this.currentSlide++;
    }
    if (this.touchEndX > this.touchStartX + swipeThreshold) {
      // Swiped right (go prev)
      if (this.currentSlide > 0) this.currentSlide--;
    }
  }

  public downloadPresentation() {
    const link = document.createElement('a');
    link.href = '/Mobiis_Revenue_Copilot_Pitch.pptx';
    link.download = 'Mobiis_Revenue_Copilot_Pitch.pptx';
    link.click();
    link.remove();
  }
}
