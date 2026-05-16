import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MeetingService } from '../../../core/services/meeting.service';
import { ProposalService } from '../../../core/services/proposal.service';
import { Meeting, Transcript, TranscriptContent } from '../../../core/models/meeting.model';
import { ProposalSummary } from '../../../core/models/proposal.model';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-proposal',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent implements OnInit, OnDestroy {
  private meetingService = inject(MeetingService);
  private proposalService = inject(ProposalService);

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

  proposal = signal<ProposalSummary | null>(null);
  loadingProposal = signal(false);
  errorProposal = signal<string | null>(null);
  isFallback = signal(false);

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
    this.proposal.set(null);
    this.errorTranscripts.set(null);
    this.errorContent.set(null);
    this.errorProposal.set(null);
    this.loadTranscripts(meeting.id);
  }

  loadTranscripts(meetingId: string): void {
    this.loadingTranscripts.set(true);
    this.meetingService.getTranscripts(meetingId).subscribe({
      next: (data) => {
        this.transcripts.set(data);
        this.loadingTranscripts.set(false);
        if (data.length > 0) {
          this.selectTranscript(data[0]);
        }
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
    this.meetingService.getTranscriptContent(meeting.id, transcript.id, 'segments').subscribe({
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

  generateProposal(): void {
    const content = this.transcriptContent();
    if (!content?.segments || content.segments.length === 0) return;

    this.loadingProposal.set(true);
    this.errorProposal.set(null);
    this.proposal.set(null);

    this.proposalService.generateProposalFromTranscript(content.segments).subscribe({
      next: (data) => {
        this.proposal.set(data);
        this.isFallback.set(false);
        this.loadingProposal.set(false);
      },
      error: (err) => {
        this.errorProposal.set(err?.message || 'Erro ao gerar proposta');
        this.loadingProposal.set(false);
        this.loadFallbackProposal();
      }
    });
  }

  loadFallbackProposal(): void {
    this.proposalService.getFallbackProposal().subscribe({
      next: (data) => {
        this.proposal.set(data);
        this.isFallback.set(true);
      },
      error: () => {
        // Mantém a mensagem de erro original se o fallback também falhar
      }
    });
  }

  canGenerate(): boolean {
    return !!this.transcriptContent()?.segments && !this.loadingProposal() && !this.loadingContent();
  }

  downloadProposal(): void {
    const meeting = this.selectedMeeting();
    const client = meeting?.subject || 'Proposta';
    const downloadName = `Proposta_${client.replace(/\s/g, '_')}.docx`;
    this.proposalService.downloadProposal(client, downloadName);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleString('pt-BR');
  }
}
