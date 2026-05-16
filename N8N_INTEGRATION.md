# Integração n8n

Guia prático para consumir a API no n8n.

---

## Base URL

```
http://204.216.160.72:3000
```

---

## Node 1: Listar Reuniões

**Node:** HTTP Request

| Campo | Valor |
|-------|-------|
| Method | `GET` |
| URL | `http://204.216.160.72:3000/users/41f7de1a-afda-4b5e-8116-4a051ab14e5e/meetings` |
| Authentication | `None` |

### Filtros opcionais (Query Parameters)

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| `subject` | Filtrar por palavra no assunto | `?subject=WMS` |
| `startDate` | Filtrar a partir de uma data (ISO 8601) | `?startDate=2026-05-01T00:00:00Z` |

### Exemplo de URL com filtros

```
http://204.216.160.72:3000/users/41f7de1a-afda-4b5e-8116-4a051ab14e5e/meetings?subject=WMS&startDate=2026-05-01T00:00:00Z
```

### Resposta esperada

```json
[
  {
    "id": "MSowMTc4MTgwOS1lMzgyLTRlYzItYThiYS01MjIyNzM0MTQyZDgqMCoqMTk6bWVldGluZ19ObVl4TXpsaE5qQXRaamhsTVMwMFltSTRMV0UwTldZdE16bGpORFpsWldaaE5HTXhAdGhyZWFkLnYy",
    "subject": "Grupo DIA x Mobiis Log",
    "startDateTime": "2026-05-26T18:00:00.0000000",
    "endDateTime": "2026-05-26T19:00:00.0000000"
  }
]
```

---

## Node 2: Listar Transcrições

**Node:** HTTP Request

| Campo | Valor |
|-------|-------|
| Method | `GET` |
| URL | `http://204.216.160.72:3000/users/41f7de1a-afda-4b5e-8116-4a051ab14e5e/meetings/{{ $json.id }}/transcripts` |
| Authentication | `None` |

> `{{ $json.id }}` é o ID da reunião retornado pelo Node 1.

### Resposta esperada

```json
[
  {
    "id": "ktVizInGAAAAi_B6lATZRTE5Om1lZXRpbmdf...",
    "createdDateTime": "2026-05-15T14:30:00.0000000"
  }
]
```

---

## Node 3: Obter Conteúdo da Transcrição

**Node:** HTTP Request

| Campo | Valor |
|-------|-------|
| Method | `GET` |
| URL | `http://204.216.160.72:3000/users/41f7de1a-afda-4b5e-8116-4a051ab14e5e/meetings/{{ $json.meetingId }}/transcripts/{{ $json.id }}/content?format=plain` |
| Authentication | `None` |

> `{{ $json.meetingId }}` e `{{ $json.id }}` vêm do Node 2 (listar transcrições).

### Formatos disponíveis

| Parâmetro | Retorno |
|-----------|---------|
| `?format=full` (padrão) | Tudo: `content` (VTT bruto), `plainText`, `segments` |
| `?format=plain` | Só `plainText` — texto limpo, uma fala por linha |
| `?format=segments` | Só `segments` — array com `speaker` e `text` |

### Resposta com `?format=plain`

```json
{
  "plainText": "Daniele Barbosa dos Santos: Tá.\nKarina Ivanaga Cavalca: Bom dia, Maria Laura, tudo bem?\nSilas Costa Carvalho Pereira de Olanda: Bom dia.\n..."
}
```

### Resposta com `?format=segments`

```json
{
  "segments": [
    {
      "speaker": "Daniele Barbosa dos Santos",
      "text": "Tá."
    },
    {
      "speaker": "Karina Ivanaga Cavalca",
      "text": "Bom dia, Maria Laura, tudo bem?"
    },
    {
      "speaker": "Silas Costa Carvalho Pereira de Olanda",
      "text": "Bom dia."
    }
  ]
}
```

---

## Fluxo completo no n8n

```
[Start]
  └──→ [HTTP Request: Listar Reuniões]
         └──→ [HTTP Request: Listar Transcrições]
                └──→ [HTTP Request: Obter Conteúdo]
                       └──→ [OpenAI / Notion / Banco de Dados / etc]
```

### Dica: processar múltiplas reuniões

Use o node **Split in Batches** após "Listar Reuniões" para iterar sobre cada reunião individualmente.

---

## Exemplo: enviar transcrição para OpenAI

Após o Node 3 (`?format=plain`), adicione um node **OpenAI**:

- **Resource:** Completion
- **Prompt:**
  ```
  Resuma a seguinte transcrição de reunião:

  {{ $json.plainText }}
  ```

Ou com `?format=segments`, para análise mais estruturada:

- **Prompt:**
  ```
  Analise a seguinte reunião e identifique:
  1. Participantes
  2. Decisões tomadas
  3. Próximos passos

  {{ JSON.stringify($json.segments) }}
  ```

---

## Variáveis recomendadas no n8n

Crie **variáveis de workflow** para facilitar reuso:

| Nome | Valor |
|------|-------|
| `API_BASE_URL` | `http://204.216.160.72:3000` |
| `USER_ID` | `41f7de1a-afda-4b5e-8116-4a051ab14e5e` |

Com isso, a URL do Node 1 fica:
```
{{ $vars.API_BASE_URL }}/users/{{ $vars.USER_ID }}/meetings
```
