import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  TicketDashboardSummary,
  ClienteRiscoChurn,
  TicketPorStatus,
  TicketPorProprietario,
  TicketPorCategoria,
  TicketPorNivelServico,
  ResumoRiscoChurn
} from '../models/ticket-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class TicketDashboardService {
  getSummary(): Observable<TicketDashboardSummary> {
    return of({
      totalTickets: 1987,
      solucionados: 1148,
      pendentes: 761,
      taxaResolucao: 57.8
    });
  }

  getClientesRiscoChurn(): Observable<ClienteRiscoChurn[]> {
    return of([
      { cliente: 'Riachuelo', total: 359, pendentes: 84, problemas: 50, urgentes: 8, percentualPendentes: 23.4, score: 114.4, classificacao: 'ALTÍSSIMO' },
      { cliente: 'Triunfante', total: 14, pendentes: 12, problemas: 1, urgentes: 13, percentualPendentes: 85.7, score: 113.2, classificacao: 'ALTÍSSIMO' },
      { cliente: 'KAPAZI', total: 8, pendentes: 7, problemas: 0, urgentes: 8, percentualPendentes: 87.5, score: 103.5, classificacao: 'ALTÍSSIMO' },
      { cliente: 'Aurea', total: 31, pendentes: 6, problemas: 17, urgentes: 22, percentualPendentes: 19.4, score: 88.9, classificacao: 'ALTÍSSIMO' },
      { cliente: 'Fretefy', total: 388, pendentes: 105, problemas: 13, urgentes: 19, percentualPendentes: 27.1, score: 84.6, classificacao: 'ALTÍSSIMO' },
      { cliente: 'CBA', total: 14, pendentes: 8, problemas: 5, urgentes: 8, percentualPendentes: 57.1, score: 80.6, classificacao: 'ALTÍSSIMO' },
      { cliente: 'SUNO', total: 3, pendentes: 2, problemas: 1, urgentes: 3, percentualPendentes: 66.7, score: 74.2, classificacao: 'ALTO' },
      { cliente: 'AAK', total: 88, pendentes: 21, problemas: 30, urgentes: 2, percentualPendentes: 23.9, score: 72.9, classificacao: 'ALTO' },
      { cliente: 'Araguaia', total: 26, pendentes: 15, problemas: 9, urgentes: 0, percentualPendentes: 57.7, score: 71.2, classificacao: 'ALTO' },
      { cliente: 'Kiformaggio', total: 3, pendentes: 2, problemas: 0, urgentes: 2, percentualPendentes: 66.7, score: 70.7, classificacao: 'ALTO' },
      { cliente: 'NULOG', total: 15, pendentes: 8, problemas: 3, urgentes: 3, percentualPendentes: 53.3, score: 63.8, classificacao: 'ALTO' },
      { cliente: 'Elite Trade', total: 12, pendentes: 4, problemas: 5, urgentes: 10, percentualPendentes: 33.3, score: 60.8, classificacao: 'ALTO' },
      { cliente: 'Fujifilm', total: 5, pendentes: 2, problemas: 4, urgentes: 5, percentualPendentes: 40.0, score: 56.0, classificacao: 'ALTO' },
      { cliente: 'Teadit', total: 5, pendentes: 2, problemas: 3, urgentes: 5, percentualPendentes: 40.0, score: 54.5, classificacao: 'ALTO' },
      { cliente: 'RIVELLI', total: 19, pendentes: 3, problemas: 10, urgentes: 11, percentualPendentes: 15.8, score: 52.8, classificacao: 'ALTO' },
      { cliente: 'Neolider', total: 4, pendentes: 2, problemas: 0, urgentes: 1, percentualPendentes: 50.0, score: 52.0, classificacao: 'ALTO' },
      { cliente: 'Valgroup', total: 58, pendentes: 16, problemas: 5, urgentes: 7, percentualPendentes: 27.6, score: 49.1, classificacao: 'ALTO' },
      { cliente: 'PORMADE', total: 5, pendentes: 2, problemas: 2, urgentes: 2, percentualPendentes: 40.0, score: 47.0, classificacao: 'ALTO' },
      { cliente: 'Packem', total: 8, pendentes: 3, problemas: 2, urgentes: 1, percentualPendentes: 37.5, score: 42.5, classificacao: 'ALTO' },
      { cliente: 'Semina', total: 8, pendentes: 2, problemas: 2, urgentes: 7, percentualPendentes: 25.0, score: 42.0, classificacao: 'ALTO' },
      { cliente: 'Neosense', total: 5, pendentes: 2, problemas: 0, urgentes: 0, percentualPendentes: 40.0, score: 40.0, classificacao: 'ALTO' },
      { cliente: 'Valeouro', total: 13, pendentes: 5, problemas: 0, urgentes: 0, percentualPendentes: 38.5, score: 38.5, classificacao: 'MODERADO' },
      { cliente: 'Soin', total: 7, pendentes: 2, problemas: 5, urgentes: 0, percentualPendentes: 28.6, score: 36.1, classificacao: 'MODERADO' },
      { cliente: 'Salus', total: 4, pendentes: 1, problemas: 2, urgentes: 3, percentualPendentes: 25.0, score: 34.0, classificacao: 'MODERADO' },
      { cliente: 'Fockink', total: 5, pendentes: 1, problemas: 1, urgentes: 1, percentualPendentes: 20.0, score: 23.5, classificacao: 'MODERADO' },
      { cliente: 'DHL', total: 21, pendentes: 2, problemas: 3, urgentes: 3, percentualPendentes: 9.5, score: 20.0, classificacao: 'MODERADO' },
      { cliente: 'ISOFILME', total: 5, pendentes: 0, problemas: 0, urgentes: 4, percentualPendentes: 0.0, score: 8.0, classificacao: 'MODERADO' },
      { cliente: 'Placibras', total: 3, pendentes: 0, problemas: 0, urgentes: 2, percentualPendentes: 0.0, score: 4.0, classificacao: 'MODERADO' },
    ]);
  }

  getTicketsPorStatus(): Observable<TicketPorStatus[]> {
    return of([
      { status: 'Fechado', quantidade: 1143, percentual: 57.5 },
      { status: 'Novo', quantidade: 711, percentual: 35.8 },
      { status: 'Concluído', quantidade: 0, percentual: 0.0 },
      { status: 'Em Análise', quantidade: 0, percentual: 0.0 },
      { status: 'Em Atendimento', quantidade: 13, percentual: 0.7 },
      { status: 'Em Desenvolvimento', quantidade: 9, percentual: 0.5 },
      { status: 'Backlog', quantidade: 14, percentual: 0.7 },
      { status: 'Cancelado', quantidade: 10, percentual: 0.5 },
      { status: 'Resolvido', quantidade: 5, percentual: 0.3 },
      { status: 'Aguardando', quantidade: 12, percentual: 0.6 },
      { status: 'Orçamento', quantidade: 0, percentual: 0.0 },
    ]);
  }

  getTicketsPorProprietario(): Observable<TicketPorProprietario[]> {
    return of([
      { equipeProprietaria: 'Customer Success - Atendimento', quantidade: 1394, percentual: 70.2 },
      { equipeProprietaria: 'Customer Success - Adoption/Ongoing', quantidade: 137, percentual: 6.9 },
      { equipeProprietaria: 'Produto - Análise', quantidade: 0, percentual: 0.0 },
      { equipeProprietaria: 'Customer Success - Onboarding', quantidade: 63, percentual: 3.2 },
      { equipeProprietaria: 'Professional Services', quantidade: 12, percentual: 0.6 },
      { equipeProprietaria: 'Administrador', quantidade: 8, percentual: 0.4 },
      { equipeProprietaria: 'Produto - Desenvolvimento', quantidade: 3, percentual: 0.2 },
      { equipeProprietaria: 'Comercial', quantidade: 4, percentual: 0.2 },
      { equipeProprietaria: '(Sem Proprietário)', quantidade: 230, percentual: 11.6 },
    ]);
  }

  getTicketsPorCategoria(): Observable<TicketPorCategoria[]> {
    return of([
      { categoria: 'Atendimento', quantidade: 1154, percentual: 58.1 },
      { categoria: 'Problema', quantidade: 252, percentual: 12.7 },
      { categoria: 'Solicitação', quantidade: 0, percentual: 0.0 },
      { categoria: 'Manutenção de Integrações', quantidade: 0, percentual: 0.0 },
      { categoria: 'Novas Integrações', quantidade: 0, percentual: 0.0 },
      { categoria: 'Serviço', quantidade: 0, percentual: 0.0 },
      { categoria: '(Sem Categoria)', quantidade: 323, percentual: 16.3 },
    ]);
  }

  getTicketsPorNivelServico(): Observable<TicketPorNivelServico[]> {
    return of([
      { nivel: '1º Nível', quantidade: 1751, percentual: 88.1 },
      { nivel: '2º Nível', quantidade: 1671, percentual: 84.1 },
      { nivel: '3º Nível', quantidade: 70, percentual: 3.5 },
    ]);
  }

  getResumoRiscoChurn(): Observable<ResumoRiscoChurn[]> {
    return of([
      { classificacao: 'Risco Altíssimo', clientes: 6, percentual: 21.4 },
      { classificacao: 'Risco Alto', clientes: 15, percentual: 53.6 },
      { classificacao: 'Risco Moderado', clientes: 7, percentual: 25.0 },
    ]);
  }
}
