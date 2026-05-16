import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { HealthOverviewComponent } from './tabs/health-overview/health-overview.component';
import { HealthCategoriasComponent } from './tabs/health-categorias/health-categorias.component';
import { HealthOcorrenciasComponent } from './tabs/health-ocorrencias/health-ocorrencias.component';
import { HealthClientesComponent } from './tabs/health-clientes/health-clientes.component';
import { HealthSuporteComponent } from './tabs/health-suporte/health-suporte.component';
import { HealthChurnComponent } from './tabs/health-churn/health-churn.component';
import { HealthRiscoComponent } from './tabs/health-risco/health-risco.component';
import { HealthRetencaoComponent } from './tabs/health-retencao/health-retencao.component';
import { HealthClient360Component } from './tabs/health-client360/health-client360.component';
import { HealthCancelamentosComponent } from './tabs/health-cancelamentos/health-cancelamentos.component';
import { HealthModeloComponent } from './tabs/health-modelo/health-modelo.component';
import { HealthRoadmapComponent } from './tabs/health-roadmap/health-roadmap.component';
import { HealthResumoComponent } from './tabs/health-resumo/health-resumo.component';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    HealthOverviewComponent,
    HealthCategoriasComponent,
    HealthOcorrenciasComponent,
    HealthClientesComponent,
    HealthSuporteComponent,
    HealthChurnComponent,
    HealthRiscoComponent,
    HealthRetencaoComponent,
    HealthClient360Component,
    HealthCancelamentosComponent,
    HealthModeloComponent,
    HealthRoadmapComponent,
    HealthResumoComponent
  ],
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent {
  activeTab: string = 'overview';
}
