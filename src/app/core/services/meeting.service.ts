import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Meeting, Transcript, TranscriptContent } from '../models/meeting.model';
import { RetornoN8n } from '../models/ticket-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private readonly API_BASE_URL = 'http://204.216.160.72:3000';
  private readonly USER_ID = '41f7de1a-afda-4b5e-8116-4a051ab14e5e';

  constructor(private http: HttpClient) { }

  getMeetings(subject?: string, startDate?: string): Observable<Meeting[]> {
    let url = `${this.API_BASE_URL}/users/${this.USER_ID}/meetings`;
    const params: string[] = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (startDate) params.push(`startDate=${encodeURIComponent(startDate)}`);
    if (params.length) url += `?${params.join('&')}`;
    return this.http.get<Meeting[]>(url);
  }

  getTranscripts(meetingId: string): Observable<Transcript[]> {
    const url = `${this.API_BASE_URL}/users/${this.USER_ID}/meetings/${meetingId}/transcripts`;
    return this.http.get<Transcript[]>(url);
  }

  getTranscriptContent(
    meetingId: string,
    transcriptId: string,
    format: 'plain' | 'segments' | 'full' = 'plain'
  ): Observable<TranscriptContent> {
    const url = `${this.API_BASE_URL}/users/${this.USER_ID}/meetings/${meetingId}/transcripts/${transcriptId}/content?format=${format}`;
    return this.http.get<TranscriptContent>(url);
  }


  enviarArquivoPublicoN8n(caminhoArquivo: string, nomeCampoForm: string, nomeArquivo: string): Observable<RetornoN8n> {
    return this.http.get(caminhoArquivo, { responseType: 'blob' }).pipe(
      switchMap((blob: Blob) => {
        const formData = new FormData();
        formData.append(nomeCampoForm, blob, nomeArquivo);

        return this.http.post<RetornoN8n>('https://danielsilva86.app.n8n.cloud/webhook/v1/gerar-resumo-reuniao', formData);
      })
    );
  }
}
