export interface TicketDashboardSummary {
  totalTickets: number;
  solucionados: number;
  pendentes: number;
  taxaResolucao: number;
}

export interface ClienteRiscoChurn {
  cliente: string;
  total: number;
  pendentes: number;
  problemas: number;
  urgentes: number;
  percentualPendentes: number;
  score: number;
  classificacao: 'ALTÍSSIMO' | 'ALTO' | 'MODERADO';
}

export interface TicketPorStatus {
  status: string;
  quantidade: number;
  percentual: number;
}

export interface TicketPorProprietario {
  equipeProprietaria: string;
  quantidade: number;
  percentual: number;
}

export interface TicketPorCategoria {
  categoria: string;
  quantidade: number;
  percentual: number;
}

export interface TicketPorNivelServico {
  nivel: string;
  quantidade: number;
  percentual: number;
}

export interface ResumoRiscoChurn {
  classificacao: string;
  clientes: number;
  percentual: number;
}

export interface RetornoN8n {
  resumo: string,
  problemas: string[],
  sentimento: string,
  acoes_recomendadas: string[],
  topicos: string[]
}
