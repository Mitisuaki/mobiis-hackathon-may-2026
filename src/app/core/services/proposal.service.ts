import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  // TODO: Replace with Supabase integration later
  // private supabaseUrl = 'https://YOUR_PROJECT.supabase.co';
  // private supabaseKey = 'YOUR_ANON_KEY';
  // private bucket = 'proposals';

  /**
   * Downloads a proposal .docx file.
   * Currently generates a placeholder file on the frontend.
   * Will be replaced with Supabase Storage download later.
   */
  async downloadProposal(filePath: string, downloadName: string): Promise<void> {
    // Frontend-only: create a simple .docx placeholder blob
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
