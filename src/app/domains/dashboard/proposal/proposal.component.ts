import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalService } from '../../../core/services/proposal.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

interface Negotiation {
  id: number;
  client: string;
  date: string;
  product: string;
  status: string;
  accuracy: number;
  genTime: number;
  savings: number;
  scopeClarity: number;
  briefAdherence: number;
  priceAssertiveness: number;
  approvalRate: number;
  topics: string[];
  barData: { label: string; manual: number; ai: number }[];
  monthlyData: { month: string; count: number }[];
  filePath: string;
}

@Component({
  selector: 'app-proposal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent {
  constructor(private proposalService: ProposalService) {}

  negotiations: Negotiation[] = [
    {
      id: 1, client: 'Logística Express', date: '12/05/2026', product: 'WMS Avançado',
      status: 'Aprovada', accuracy: 96, genTime: 2, savings: 82, approvalRate: 91,
      scopeClarity: 95, briefAdherence: 90, priceAssertiveness: 84,
      topics: ['Gestão de estoque', 'Rastreabilidade', 'Integração ERP', 'KPIs operacionais', 'SLA de entrega', 'Curva ABC'],
      barData: [
        { label: 'Discovery', manual: 45, ai: 3 }, { label: 'WMS', manual: 38, ai: 2 },
        { label: 'TMS', manual: 42, ai: 4 }, { label: 'Expansão', manual: 30, ai: 2 }
      ],
      monthlyData: [
        { month: 'Jan', count: 12 }, { month: 'Fev', count: 18 }, { month: 'Mar', count: 22 },
        { month: 'Abr', count: 28 }, { month: 'Mai', count: 35 }, { month: 'Jun', count: 42 }
      ],
      filePath: 'logistica_express/proposta.docx'
    },
    {
      id: 2, client: 'TransBrasil S.A.', date: '08/05/2026', product: 'TMS + YMS',
      status: 'Em revisão', accuracy: 89, genTime: 4, savings: 75, approvalRate: 78,
      scopeClarity: 88, briefAdherence: 82, priceAssertiveness: 71,
      topics: ['Agendamento de docas', 'Roteirização', 'Controle de pátio', 'Gestão de motoristas'],
      barData: [
        { label: 'Discovery', manual: 50, ai: 5 }, { label: 'TMS', manual: 44, ai: 4 },
        { label: 'YMS', manual: 52, ai: 5 }, { label: 'Integração', manual: 35, ai: 3 }
      ],
      monthlyData: [
        { month: 'Jan', count: 8 }, { month: 'Fev', count: 11 }, { month: 'Mar', count: 15 },
        { month: 'Abr', count: 19 }, { month: 'Mai', count: 24 }, { month: 'Jun', count: 30 }
      ],
      filePath: 'transbrasil/proposta.docx'
    },
    {
      id: 3, client: 'Fretefy Corp', date: '02/05/2026', product: 'Suite Completa',
      status: 'Pendente', accuracy: 92, genTime: 3, savings: 80, approvalRate: 85,
      scopeClarity: 92, briefAdherence: 88, priceAssertiveness: 79,
      topics: ['WMS', 'TMS', 'YMS', 'Torre de controle', 'BI Logístico', 'Automação', 'API Gateway', 'White-label'],
      barData: [
        { label: 'Suite Full', manual: 58, ai: 5 }, { label: 'Módulos', manual: 40, ai: 3 },
        { label: 'Integração', manual: 48, ai: 4 }, { label: 'Go-live', manual: 35, ai: 3 }
      ],
      monthlyData: [
        { month: 'Jan', count: 15 }, { month: 'Fev', count: 20 }, { month: 'Mar', count: 25 },
        { month: 'Abr', count: 32 }, { month: 'Mai', count: 38 }, { month: 'Jun', count: 48 }
      ],
      filePath: 'fretefy_corp/proposta.docx'
    }
  ];

  selected: Negotiation = this.negotiations[0];

  get maxMonthly(): number {
    return Math.max(...this.selected.monthlyData.map(m => m.count));
  }

  selectNegotiation(event: Event) {
    const idx = +(event.target as HTMLSelectElement).value;
    this.selected = this.negotiations[idx];
  }

  downloadProposal() {
    const downloadName = `Proposta_${this.selected.client.replace(/\s/g, '_')}.docx`;
    this.proposalService.downloadProposal(this.selected.filePath, downloadName);
  }
}
