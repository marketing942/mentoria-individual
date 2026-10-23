# Auditoria SEO — Mentoria Individual

Repositório: [`marketing942/mentoria-individual`](https://github.com/marketing942/mentoria-individual) · branch `seo/otimizacao-organica-20261023` (base `main`) · 23/10/2026
Relatório consolidado do ecossistema: [RELATORIO-GERAL-SEO-ECOSSISTEMA.md](RELATORIO-GERAL-SEO-ECOSSISTEMA.md)

## Arquitetura

- **Domínio de produção:** individual.cppem.com.br — evidência: mapa de origens do Apps Script (`INDIVIDUAL: mentoria-individual (individual.cppem.com.br)`).
- **Stack:** HTML + CSS + JavaScript estáticos. Vercel. Fontes do Google (Oxanium, Rajdhani).
- **Renderização:** HTML estático; FAQ em `<details>` (conteúdo no HTML).

## Rotas

| Rota | O que é | Indexação |
|---|---|---|
| / | Captação para a Mentoria Individual (modal com formulário → planilha → WhatsApp) | Indexar |

## Finalidade e classificação

- **Objetivo:** Captar interessados na mentoria individual do Prof. Everton Mota para carreiras policiais.
- **Unidade de negócio:** CPPEM Concursos
- **Público:** Candidatos a PM, PC, PRF, PF e Penal que querem acompanhamento individual.
- **Tipo de página:** Landing de captação/vendas.
- **Indexação recomendada:** Indexar.
- **Potencial orgânico:** **Médio** — Nicho comercial claro ("mentoria para concursos policiais"); concorrência de mentorias da Gran e de mentores independentes.

## Problemas encontrados

Gravidade: **P0** crítico (indexação/integridade) · **P1** alto impacto · **P2** médio · **P3** evolução · **Info** registro sem ação de SEO.

| Sev. | Problema | Evidência | Impacto | Status |
|---|---|---|---|---|
| P1 | Title com marca na frente e sem a categoria | `Mentoria Individual CPPEM — Acompanhamento do Prof. Everton Mota` | Pouca aderência a "mentoria para concursos policiais" | Corrigido |
| P1 | Sem canonical; og:image pequena e relativa | `/public/bgsniper.webp` 640×427 |  | Corrigido (1200×630 absoluta) |
| P1 | Fotos do carrossel com 14,7 MB | Mesmas 14 fotos 3024×4032 do Contato CPPEM | Peso no celular | Corrigido (0,74 MB) |
| P2 | Logo PNG pesado é o elemento de LCP | `logo-cppem-web.png` 960×511, 344 KB | LCP | Corrigido (otimização sem perda: 277 KB; mesmos pixels — a máscara do brilho usa o mesmo arquivo) |
| P2 | Sem dados estruturados, robots e sitemap |  |  | Corrigido |
| P3 | Formato WebP para o logo | Lighthouse estima 317 KB a menos em WebP | LCP | Recomendado (exige trocar `src` e a máscara CSS juntos) |

## Limitações desta auditoria

- **Produção inacessível desta sessão.** O proxy de rede do ambiente recusou
  conexões a `*.cppem.com.br` e `*.vercel.app`, e o leitor de páginas não
  resolveu esses domínios. Nada foi medido no site publicado: HTML servido,
  status HTTP, redirecionamentos e headers reais ficam **não validados**.
  Toda a auditoria foi feita no código e em servidores locais.
- **Sem Google Search Console, GA4, Keyword Planner, Trends, Semrush ou Ahrefs.**
  Não há volume, dificuldade, CPC nem posição. Nenhum número desse tipo
  aparece aqui. As prioridades de palavra-chave são **estimativas
  qualitativas** (intenção, tipo de página que aparece hoje, relevância
  comercial) e devem ser confirmadas no Search Console e no Planejador.
- **SERP observada com a busca web disponível, que não é o Google.** Os
  concorrentes listados são os que apareceram nessa busca e servem como
  indício, não como ranking do Google.
- **Lighthouse é dado de laboratório**, rodado localmente com os terceiros
  (GTM, PixelX, fontes do Google) bloqueados. Serve para comparar antes ×
  depois, não para prever o Core Web Vitals real (dado de campo do CrUX).
