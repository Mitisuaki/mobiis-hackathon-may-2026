import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { TicketDashboardService } from '../../../core/services/ticket-dashboard.service';
import {
  TicketDashboardSummary,
  ClienteRiscoChurn,
  TicketPorStatus,
  TicketPorProprietario,
  TicketPorCategoria,
  TicketPorNivelServico,
  ResumoRiscoChurn
} from '../../../core/models/ticket-dashboard.model';

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
  private ticketDashboardService = inject(TicketDashboardService);

  summary = signal<TicketDashboardSummary | null>(null);
  clientesRisco = signal<ClienteRiscoChurn[]>([]);
  ticketsStatus = signal<TicketPorStatus[]>([]);
  ticketsProprietario = signal<TicketPorProprietario[]>([]);
  ticketsCategoria = signal<TicketPorCategoria[]>([]);
  ticketsNivel = signal<TicketPorNivelServico[]>([]);
  resumoRisco = signal<ResumoRiscoChurn[]>([]);

  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.ticketDashboardService.getSummary().subscribe({
      next: (data) => this.summary.set(data),
      error: (err) => this.error.set(err?.message || 'Erro ao carregar resumo')
    });

    this.ticketDashboardService.getClientesRiscoChurn().subscribe({
      next: (data) => this.clientesRisco.set(data),
      error: (err) => this.error.set(err?.message || 'Erro ao carregar risco de churn')
    });

    this.ticketDashboardService.getTicketsPorStatus().subscribe({
      next: (data) => this.ticketsStatus.set(data),
      error: (err) => this.error.set(err?.message || 'Erro ao carregar status')
    });

    this.ticketDashboardService.getTicketsPorProprietario().subscribe({
      next: (data) => this.ticketsProprietario.set(data),
      error: (err) => this.error.set(err?.message || 'Erro ao carregar proprietários')
    });

    this.ticketDashboardService.getTicketsPorCategoria().subscribe({
      next: (data) => this.ticketsCategoria.set(data),
      error: (err) => this.error.set(err?.message || 'Erro ao carregar categorias')
    });

    this.ticketDashboardService.getTicketsPorNivelServico().subscribe({
      next: (data) => this.ticketsNivel.set(data),
      error: (err) => this.error.set(err?.message || 'Erro ao carregar níveis de serviço')
    });

    this.ticketDashboardService.getResumoRiscoChurn().subscribe({
      next: (data) => {
        this.resumoRisco.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message || 'Erro ao carregar resumo de risco');
        this.loading.set(false);
      }
    });
  }

  classificacaoClass(classificacao: string): string {
    switch (classificacao) {
      case 'ALTÍSSIMO': return 'altissimo';
      case 'ALTO': return 'alto';
      case 'MODERADO': return 'moderado';
      default: return '';
    }
  }
}
