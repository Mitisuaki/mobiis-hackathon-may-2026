# Plano: Dashboard "Indicadores" com Ticket Dashboard Models

## Contexto
O projeto Angular standalone MobiisCopilot já possui o model `ticket-dashboard.model.ts` criado na branch `feature/ticket-models`, com interfaces para todas as tabelas presentes na planilha `tickets_rows_Dashboards(Dashboard).csv`:
- `TicketDashboardSummary`
- `ClienteRiscoChurn`
- `TicketPorStatus`
- `TicketPorProprietario`
- `TicketPorCategoria`
- `TicketPorNivelServico`
- `ResumoRiscoChurn`

O usuário solicitou uma nova tela chamada **"Indicadores"** que implemente esses models e obtenha os dados "do n8n".

## Ponto de Atenção / Questão de Clareza
A documentação `N8N_INTEGRATION.md` descreve uma API que **exclusivamente fornece dados de reuniões e transcrições** (`/users/{id}/meetings`, `/transcripts`, `/content`). Ela **não expõe endpoints de tickets** (status, categorias, score de churn, etc.).

Portanto, é necessário decidir a fonte de dados para popular os models do ticket dashboard:

| Opção | Descrição |
|-------|-----------|
| A — Mock/CSV | O `TicketDashboardService` retorna dados estáticos extraídos do CSV `tickets_rows_Dashboards(Dashboard).csv` já presente no repositório. Rápido de implementar e permite validar a UI imediatamente. |
| B — JSON estático | Converter o CSV em um arquivo JSON dentro de `src/assets/data/`; o service faz `HttpClient.get` para esse arquivo. Simula uma chamada HTTP sem depender de backend externo. |
| C — Endpoint real | Se existe outro endpoint n8n (não documentado no `N8N_INTEGRATION.md`) que retorna dados de tickets, o service pode ser configurado para consumi-lo via `HttpClient`. |

**Recomendação**: Implementar a **Opção A** (mock estático baseado no CSV) para ter a tela funcional imediatamente, estruturando o service de forma que a fonte de dados possa ser trocada facilmente para uma chamada HTTP real futuramente.

---

## Passos de Implementação

### 1. Criar branch separada
```bash
git checkout main
git checkout -b feature/indicadores-dashboard
```

### 2. Criar TicketDashboardService
- Arquivo: `src/app/core/services/ticket-dashboard.service.ts`
- Métodos que retornam os dados das 7 entidades, inicialmente com valores extraídos do CSV:
  - `getSummary(): Observable<TicketDashboardSummary>`
  - `getClientesRiscoChurn(): Observable<ClienteRiscoChurn[]>`
  - `getTicketsPorStatus(): Observable<TicketPorStatus[]>`
  - `getTicketsPorProprietario(): Observable<TicketPorProprietario[]>`
  - `getTicketsPorCategoria(): Observable<TicketPorCategoria[]>`
  - `getTicketsPorNivelServico(): Observable<TicketPorNivelServico[]>`
  - `getResumoRiscoChurn(): Observable<ResumoRiscoChurn[]>`
- Cada método retorna `of(...)` (RxJS) com dados mockados do CSV, permitindo fácil substituição por `http.get` no futuro.

### 3. Criar IndicadoresComponent
- Arquivo: `src/app/domains/dashboard/indicadores/indicadores.component.ts`
- Standalone component, importando `CommonModule`, `FormsModule`, `TranslatePipe`.
- Layout estruturado em seções:
  1. **Cards de Resumo** (total tickets, solucionados, pendentes, taxa de resolução)
  2. **Tabela / Cards de Risco de Churn por Cliente** (cliente, total, pendentes, score, classificação ALTÍSSIMO/ALTO/MODERADO)
  3. **Grids de Distribuição**:
     - Tickets por Status (com barras visuais de %)
     - Tickets por Proprietário/Equipe
     - Tickets por Categoria
     - Tickets por Nível de Serviço
  4. **Resumo de Risco de Churn** (cards com total de clientes por classificação)
- Estado controlado via `signals` (`loading`, `error`, dados).
- Arquivos auxiliares: `indicadores.component.html`, `indicadores.component.css`.

### 4. Atualizar rotas
- Arquivo: `src/app/app.routes.ts`
- Adicionar import de `IndicadoresComponent`.
- Adicionar rota `{ path: 'indicadores', component: IndicadoresComponent }` dentro do `dashboard` children array.

### 5. Atualizar sidebar
- Arquivo: `src/app/domains/dashboard/layout/dashboard-layout.component.html`
- Adicionar novo item de navegação com número `8` após "Proposta IA", apontando para `/dashboard/indicadores`.

### 6. Adicionar traduções i18n
- Arquivos: `src/app/core/i18n/pt.ts`, `en.ts`, `es.ts`
- Adicionar chaves sob namespace `SIDEBAR`:
  - `INDICADORES: 'Indicadores'`
- Adicionar chaves sob namespace `INDICADORES`:
  - `TITLE`, `SUBTITLE`, `SUMMARY_TOTAL`, `SUMMARY_SOLUCIONADOS`, `SUMMARY_PENDENTES`, `SUMMARY_TAXA`, `CHURN_TITLE`, `COL_CLIENTE`, `COL_TOTAL`, `COL_PENDENTES`, `COL_SCORE`, `COL_CLASSIFICACAO`, `STATUS_TITLE`, `PROPRIETARIO_TITLE`, `CATEGORIA_TITLE`, `NIVEL_TITLE`, `RESUMO_RISCO_TITLE`, `LOADING`, `ERROR`

### 7. Estilos
- Criar `indicadores.component.css` seguindo o design system existente (variáveis CSS do `styles.css`: `--color-card-bg`, `--color-border`, `--color-text-primary`, `--color-accent-blue`, etc.).
- Responsivo: grid de cards com `grid-template-columns: repeat(auto-fit, minmax(...))` e `@media` para mobile.

### 8. Validação
- Rodar `npm run build` (ou `npx tsc --noEmit`) para verificar erros de compilação.
- Verificar se a rota carrega corretamente e os dados são exibidos.

---

## Arquivos afetados / criados
- `src/app/app.routes.ts` (modificado)
- `src/app/domains/dashboard/layout/dashboard-layout.component.html` (modificado)
- `src/app/core/services/ticket-dashboard.service.ts` (novo)
- `src/app/domains/dashboard/indicadores/indicadores.component.ts` (novo)
- `src/app/domains/dashboard/indicadores/indicadores.component.html` (novo)
- `src/app/domains/dashboard/indicadores/indicadores.component.css` (novo)
- `src/app/core/i18n/pt.ts`, `en.ts`, `es.ts` (modificados)

## Decisão de fonte de dados — RESOLVIDO
**Opção escolhida**: Mock estático extraído do CSV.

O `TicketDashboardService` retornará dados estáticos (via `of(...)`) extraídos diretamente da planilha `tickets_rows_Dashboards(Dashboard).csv` já presente no repositório. A UI ficará funcional imediatamente. O service será estruturado de forma que, no futuro, a fonte possa ser facilmente substituída por uma chamada HTTP real (`HttpClient.get`) sem alterar o componente consumidor.
