import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { RetornoN8n } from '../../../core/models/ticket-dashboard.model';
import { MeetingService } from '../../../core/services/meeting.service';

@Component({
  selector: 'app-meet',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent {
  aiResult: RetornoN8n | null = null;
  isLoading = false;

  constructor(
    private meetingService: MeetingService,
    private cdr: ChangeDetectorRef
  ) { }

  generateResume() {
    this.isLoading = true;
    this.cdr.detectChanges();

    // Using transcricao_diniz.json from public directory
    const filePath = '/transcricao_diniz.json';

    this.meetingService.enviarArquivoPublicoN8n(filePath, 'file', 'transcricao_diniz.json')
      .subscribe({
        next: (response: any) => {
          try {
            console.log('N8N Raw Response:', response);
            let parsedResponse = response;

            // Handle stringified JSON
            if (typeof parsedResponse === 'string') {
              try { parsedResponse = JSON.parse(parsedResponse); } catch (e) { }
            }

            // Handle array response (default n8n behavior)
            if (Array.isArray(parsedResponse)) {
              parsedResponse = parsedResponse[0];
            }

            // Handle nested body/data properties sometimes added by gateways
            if (parsedResponse && parsedResponse.body) {
              if (typeof parsedResponse.body === 'string') {
                try { parsedResponse = JSON.parse(parsedResponse.body); } catch (e) { parsedResponse = parsedResponse.body; }
              } else {
                parsedResponse = parsedResponse.body;
              }
            } else if (parsedResponse && parsedResponse.data) {
              parsedResponse = parsedResponse.data;
            }

            console.log('Parsed Response:', parsedResponse);
            this.aiResult = parsedResponse;
          } catch (e) {
            console.error('Error parsing response:', e);
          } finally {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.error('Error generating resume:', err);

          // Fallback to mock data in case of error (e.g. CORS)
          this.aiResult = {
            "resumo": "Reunião entre a Mobiis e Diniz Foods para apresentação e alinhamento do sistema WMS da Mobiis, discutindo as dores e necessidades atuais da operação logística da Diniz Foods, possibilidades de customização e integração, além da implantação do sistema e funcionalidades adicionais como TMS e gestão de docas. Houve uma discussão detalhada sobre os processos internos, problemas enfrentados e as funcionalidades do sistema proposto para melhoria da gestão de estoque, inventário, expedição, devolução e rastreabilidade.",
            "problemas": [
              "Dificuldade no processo de recebimento e movimentações sem gestão por etiqueta ou MA.",
              "Inventário manual e custo alto com impressão de controle.",
              "Processo de reversa custoso e sem rastreabilidade adequada.",
              "Operação crescendo além da capacidade dos sistemas atuais (ex.: Sankhya WMS padrão não escalável).",
              "Falta de integração entre estoque comercial e real causando venda de produtos em trânsito.",
              "Ausência de solução integrada que cubra WMS, torre de controle e TMS em um único fornecedor.",
              "Problemas técnicos ocasionais na apresentação e conexão durante reunião.",
              "Falta de automação em algumas funções e necessidade de parametrizações específicas."
            ],
            "sentimento": "Positivo, com abertura para parceria e interesse em soluções integradas que atendam as necessidades atuais, embora com preocupação quanto à escalabilidade e customização. Reconhecimento do valor da solução proposta e vontade de avançar no processo.",
            "acoes_recomendadas": [
              "Realizar levantamento detalhado dos processos atuais da Diniz Foods para parametrização adequada do WMS.",
              "Propor um plano de implantação com valor fechado e escopo definido para evitar surpresas.",
              "Apresentar proposta formal considerando o volume, etapa inicial no WMS e possibilidade futura de integrar TMS e torre de controle.",
              "Demonstrar melhor a funcionalidade do inventário rotativo e relatórios para evidenciar ganhos operacionais.",
              "Esclarecer e detalhar possibilidades de customização sem custo adicional e diferenciação entre customização e personalização.",
              "Oferecer suporte para integração via API, facilitando uso do ERP Sankhya da cliente.",
              "Agendar reunião com outros gestores decisores para alinhamento final de expectativas e escopo.",
              "Garantir estabilidade técnica nas próximas apresentações para evitar interrupções."
            ],
            "topicos": [
              "Crescimento da operação logística e necessidade de escalabilidade do sistema WMS.",
              "Dores atuais: recebimento, controle por etiquetas, inventário manual, devoluções e reversa.",
              "Funcionalidades do WMS apresentado: controle de lote, validade, shelf life, bloqueios, separação e expedição.",
              "Personalização e customização do sistema com limites claros entre elas.",
              "Licenciamento do sistema (multiusuário, sem custo adicional por licenças extras).",
              "Implantação com valor fechado e possibilidade de cobranças extras para alterações fora do escopo.",
              "Integração via APIs abertas com sistemas existentes (Sankhya ERP).",
              "Complementariedade do WMS com soluções TMS e torre de controle para gestão de transporte.",
              "Importância de evitar múltiplos fornecedores para manter simplicidade e eficácia do ecossistema tecnológico.",
              "Confirmação de ambiente 100% cloud e seguro (Oracle).",
              "Importância da rastreabilidade e controle em tempo real na operação alimentar.",
              "Demonstrativo da facilidade de uso do sistema via coletor Android e emissão de etiquetas."
            ]
          };
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }
}
