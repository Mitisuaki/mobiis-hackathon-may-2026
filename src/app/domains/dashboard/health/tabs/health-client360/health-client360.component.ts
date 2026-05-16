import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-health-client360',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './health-client360.component.html',
  styleUrls: ['./health-client360.component.css']
})
export class HealthClient360Component {
  clients360 = [
    {
      cliente: 'Transportes Bertolini',
      risco: 'HEALTH.RISK_LEVEL_ALTISSIMO',
      riscoClass: 'risk-altissimo',
      produto: 'Roteirizador + Torre',
      causa: '90% dos problemas que a Bertolini enfrentou, pós go-live, foram relacionados a integração d...',
      comando: 'Squad de integração com dono técnico e prazo fechado',
      prazo: 'D+7',
      prazoClass: 'text-pink'
    },
    {
      cliente: 'Frigol',
      risco: 'HEALTH.RISK_LEVEL_ALTISSIMO',
      riscoClass: 'risk-altissimo',
      produto: 'Roteirizador',
      causa: 'Problemas de vale pedágio. Liberação do blocker (solução de bloqueio de trecho) em produção.',
      comando: 'Correção em produção e validação operacional',
      prazo: 'D+7',
      prazoClass: 'text-pink'
    },
    {
      cliente: 'Fr Distribuição',
      risco: 'HEALTH.RISK_LEVEL_ALTISSIMO',
      riscoClass: 'risk-altissimo',
      produto: 'Roteirizador',
      causa: 'Integração do Sankhya com o Roteirizador',
      comando: 'Squad de integração com dono técnico e prazo fechado',
      prazo: 'D+7',
      prazoClass: 'text-pink'
    },
    {
      cliente: 'TBM Textil',
      risco: 'HEALTH.RISK_LEVEL_ALTISSIMO',
      riscoClass: 'risk-altissimo',
      produto: 'Roteirizador + Torre',
      causa: 'Integração do Sankhya com o Roteirizador',
      comando: 'Squad de integração com dono técnico e prazo fechado',
      prazo: 'D+7',
      prazoClass: 'text-pink'
    },
    {
      cliente: 'Mais Distribuidora',
      risco: 'HEALTH.RISK_LEVEL_ALTISSIMO',
      riscoClass: 'risk-altissimo',
      produto: 'Roteirizador + Torre',
      causa: 'Falta de processos internos no cliente. Esse caso inclusive já se efetivou o cancelamento, ...',
      comando: 'Plano de maturidade operacional com sponsor',
      prazo: 'D+15',
      prazoClass: 'text-orange'
    },
    {
      cliente: 'Analog CP',
      risco: 'HEALTH.RISK_LEVEL_ALTISSIMO',
      riscoClass: 'risk-altissimo',
      produto: 'Roteirizador + Torre',
      causa: 'Problemas na utilização do aplicativo e melhorias que são essenciais para a operação.',
      comando: 'Correção do aplicativo e adoção assistida',
      prazo: 'D+15',
      prazoClass: 'text-orange'
    },
    {
      cliente: 'Castropil',
      risco: 'HEALTH.RISK_LEVEL_ALTO',
      riscoClass: 'risk-alto',
      produto: 'Roteirizador + Torre',
      causa: 'Integração do Protheus com o Roteirizador',
      comando: 'Revalidação executiva de valor e plano de uso',
      prazo: 'D+15',
      prazoClass: 'text-orange'
    },
    {
      cliente: 'Normatel',
      risco: 'HEALTH.RISK_LEVEL_ALTO',
      riscoClass: 'risk-alto',
      produto: 'Roteirizador + Torre',
      causa: 'Integração do Protheus com o Roteirizador',
      comando: 'Squad de integração com dono técnico e prazo fechado',
      prazo: 'D+15',
      prazoClass: 'text-orange'
    }
  ];
}
