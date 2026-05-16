import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-cancelamentos',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-cancelamentos.component.html',
  styleUrls: ['./health-cancelamentos.component.css']
})
export class HealthCancelamentosComponent {
  cancelamentos = [
    {
      cliente: 'Donizete Barbalha',
      produto: 'Roteirizador + Torre',
      receita: 'R$ 1.557',
      evento: 'HEALTH.EVENT_CHURN',
      eventoClass: 'badge-churn',
      motivo: 'Mudança de gestão e ferramenta.',
      prevencao: 'Disparar plano de resgate quando houver troca de gestão ou spon...'
    },
    {
      cliente: 'Donizete Fortaleza',
      produto: 'Roteirizador + Torre',
      receita: 'R$ 3.214',
      evento: 'HEALTH.EVENT_DOWNSELL',
      eventoClass: 'badge-downsell',
      motivo: 'Mudança de gestão e ferramenta.',
      prevencao: 'Disparar plano de resgate quando houver troca de gestão ou spon...'
    },
    {
      cliente: 'JSG Distribuidora',
      produto: 'Planner de Vendas',
      receita: 'Variável',
      evento: 'HEALTH.EVENT_CHURN',
      eventoClass: 'badge-churn',
      motivo: 'Não utilização da ferramenta. Contração de cons...',
      prevencao: 'Criar prova de valor, uso assistido e reunião executiva de adoç...'
    },
    {
      cliente: 'Mais Distribuidora',
      produto: 'Roteirizador + Torre',
      receita: 'R$ 3.003',
      evento: 'HEALTH.EVENT_CHURN',
      eventoClass: 'badge-churn',
      motivo: 'Falta de aderência do produto à operação.',
      prevencao: 'Validar fit operacional antes da proposta e transformar gaps em...'
    },
    {
      cliente: 'Toninho Bananas',
      produto: 'Roteirizador + Torre',
      receita: 'R$ 2.500',
      evento: 'HEALTH.EVENT_CHURN',
      eventoClass: 'badge-churn',
      motivo: 'Não utilização da plataforma. Déficit de implan...',
      prevencao: 'Criar prova de valor, uso assistido e reunião executiva de adoç...'
    },
    {
      cliente: 'DiteLog',
      produto: 'Roteirizador + Torre',
      receita: 'R$ 2.015',
      evento: 'HEALTH.EVENT_CHURN',
      eventoClass: 'badge-churn',
      motivo: 'Falta de aderência do produto à operação.',
      prevencao: 'Validar fit operacional antes da proposta e transformar gaps em...'
    },
    {
      cliente: 'São Rafael',
      produto: 'Planner de Vendas',
      receita: 'R$ 1.681',
      evento: 'HEALTH.EVENT_DOWNSELL',
      eventoClass: 'badge-downsell',
      motivo: 'Não utilização da ferramenta. Contração de cons...',
      prevencao: 'Criar prova de valor, uso assistido e reunião executiva de adoç...'
    },
    {
      cliente: 'PJCarnes',
      produto: 'Roteirizador + Torre',
      receita: 'R$ 2.898',
      evento: 'HEALTH.EVENT_CHURN',
      eventoClass: 'badge-churn',
      motivo: 'Mudança de gestão e ferramenta.',
      prevencao: 'Disparar plano de resgate quando houver troca de gestão ou spon...'
    },
    {
      cliente: 'Cardeal Distribuidora',
      produto: 'Planner de Vendas',
      receita: 'R$ 11.042',
      evento: 'HEALTH.EVENT_CHURN',
      eventoClass: 'badge-churn',
      motivo: 'Falta de aderência do produto à operação.',
      prevencao: 'Validar fit operacional antes da proposta e transformar gaps em...'
    }
  ];
}
