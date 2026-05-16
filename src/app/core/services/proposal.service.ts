import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProposalSummary } from '../models/proposal.model';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private readonly WEBHOOK_URL = 'https://danielsilva86.app.n8n.cloud/webhook-test/v1/gerar-resumo-reuniao';

  constructor(private http: HttpClient) {}

  generateProposalFromTranscript(segments: Array<{ speaker: string; text: string }>): Observable<ProposalSummary> {
    const jsonContent = JSON.stringify({ segments }, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const file = new File([blob], 'transcricao.json', { type: 'application/json' });

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ProposalSummary>(this.WEBHOOK_URL, formData).pipe(
      catchError((err) => {
        const message = err?.error?.message || err?.message || 'Erro ao gerar proposta no n8n';
        return throwError(() => new Error(message));
      })
    );
  }

  getFallbackProposal(): Observable<ProposalSummary> {
    return this.http.get<ProposalSummary>('assets/data/proposta-fallback.json');
  }

  async downloadProposal(filePath: string, downloadName: string): Promise<void> {
    const content = `Proposta Comercial - ${downloadName}\n\nEste documento foi gerado automaticamente pelo Mobiis Revenue Copilot.\nArquivo: ${filePath}`;
    const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadName;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
