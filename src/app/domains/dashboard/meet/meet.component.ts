import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MeetingService } from '../../../core/services/meeting.service';
import { Meeting, Transcript, TranscriptContent } from '../../../core/models/meeting.model';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-meet',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit, OnDestroy {
  private meetingService = inject(MeetingService);

  meetings = signal<Meeting[]>([]);
  loadingMeetings = signal(false);
  errorMeetings = signal<string | null>(null);

  selectedMeeting = signal<Meeting | null>(null);
  transcripts = signal<Transcript[]>([]);
  loadingTranscripts = signal(false);
  errorTranscripts = signal<string | null>(null);

  selectedTranscript = signal<Transcript | null>(null);
  transcriptContent = signal<TranscriptContent | null>(null);
  loadingContent = signal(false);
  errorContent = signal<string | null>(null);

  searchSubject = new Subject<string>();
  searchValue = '';
  private searchSub!: Subscription;

  ngOnInit(): void {
    this.searchSub = this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((subject) => {
        this.loadMeetings(subject);
      });
    this.loadMeetings();
  }

  ngOnDestroy(): void {
    if (this.searchSub) this.searchSub.unsubscribe();
  }

  onSearchChange(value: string): void {
    this.searchValue = value;
    this.searchSubject.next(value);
  }

  loadMeetings(subject?: string): void {
    this.loadingMeetings.set(true);
    this.errorMeetings.set(null);
    this.meetingService.getMeetings(subject || undefined).subscribe({
      next: (data) => {
        this.meetings.set(data);
        this.loadingMeetings.set(false);
      },
      error: (err) => {
        this.errorMeetings.set(err?.message || 'Erro ao carregar reuniões');
        this.loadingMeetings.set(false);
      }
    });
  }

  selectMeeting(meeting: Meeting): void {
    this.selectedMeeting.set(meeting);
    this.transcripts.set([]);
    this.selectedTranscript.set(null);
    this.transcriptContent.set(null);
    this.errorTranscripts.set(null);
    this.errorContent.set(null);
    this.loadTranscripts(meeting.id);
  }

  loadTranscripts(meetingId: string): void {
    this.loadingTranscripts.set(true);
    this.meetingService.getTranscripts(meetingId).subscribe({
      next: (data) => {
        this.transcripts.set(data);
        this.loadingTranscripts.set(false);
      },
      error: (err) => {
        this.errorTranscripts.set(err?.message || 'Erro ao carregar transcrições');
        this.loadingTranscripts.set(false);
      }
    });
  }

  selectTranscript(transcript: Transcript): void {
    this.selectedTranscript.set(transcript);
    this.transcriptContent.set(null);
    this.errorContent.set(null);
    const meeting = this.selectedMeeting();
    if (!meeting) return;
    this.loadingContent.set(true);
    this.meetingService.getTranscriptContent(meeting.id, transcript.id, 'plain').subscribe({
      next: (data) => {
        this.transcriptContent.set(data);
        this.loadingContent.set(false);
      },
      error: (err) => {
        this.errorContent.set(err?.message || 'Erro ao carregar conteúdo');
        this.loadingContent.set(false);
      }
    });
  }

  clearSelection(): void {
    this.selectedMeeting.set(null);
    this.transcripts.set([]);
    this.selectedTranscript.set(null);
    this.transcriptContent.set(null);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleString('pt-BR');
  }
}
