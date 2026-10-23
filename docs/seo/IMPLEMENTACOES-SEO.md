# Implementações de SEO — Mentoria Individual

Repositório: [`marketing942/mentoria-individual`](https://github.com/marketing942/mentoria-individual) · branch `seo/otimizacao-organica-20261023` (base `main`) · 23/10/2026
Relatório consolidado do ecossistema: [RELATORIO-GERAL-SEO-ECOSSISTEMA.md](RELATORIO-GERAL-SEO-ECOSSISTEMA.md)

Commits na branch `seo/otimizacao-organica-20261023`. Nada foi publicado; merge e deploy dependem de aprovação.

## Arquivos modificados

| Arquivo | Alteração | Por quê |
|---|---|---|
| index.html (`<head>`) | Title, description, canonical, robots, OG completo com imagem 1200×630, Twitter card, JSON-LD (Organization, Person Everton Mota, WebSite, WebPage) |  |
| public/og-mentoria-individual.jpg (novo) | Recorte 1200×630 de `everton-mentor.jpg` |  |
| public/foto1…14.webp | 600×800, mesmo nome e proporção (14,7 MB → 0,74 MB) |  |
| public/logo-cppem-web.png | Otimização sem perda (344 → 277 KB), mesmos pixels e dimensões | Elemento de LCP |
| robots.txt, sitemap.xml, .vercelignore (novos) |  |  |

## Metadados — antes × depois

Extraídos do HTML renderizado localmente (Playwright/HTTP), antes e depois.

| Campo | Antes | Depois |
|---|---|---|
| `title` | Mentoria Individual CPPEM — Acompanhamento do Prof. Everton Mota | Mentoria Individual para Concursos Policiais \| CPPEM |
| `description` | Mentoria individual do Prof. Everton Mota para carreiras policiais: plano de estudo próprio, encontros ao vivo todo mês e acesso à plataforma CPPEM. Vagas limitadas. | Mentoria individual com o Prof. Everton Mota para concursos policiais: plano de estudos próprio, encontros ao vivo todo mês e acesso à plataforma CPPEM. |
| `canonical` | — | https://individual.cppem.com.br/ |
| `robots` | — | index, follow, max-image-preview:large |
| `og:image` | /public/bgsniper.webp | https://individual.cppem.com.br/public/og-mentoria-individual.jpg |
| `og:url` | — | https://individual.cppem.com.br/ |
| `og:site_name` | — | CPPEM Concursos Públicos |
| `og:locale` | — | pt_BR |
| `twitter:card` | — | summary_large_image |
| JSON-LD |  | Organization, Person, WebSite, WebPage |

## Dados estruturados

Só tipos aplicáveis e só com dados que a página mostra. Nada de avaliações,
preços inventados, prêmios ou credenciais. Sem `FAQPage` (o resultado de FAQ
foi restrito a sites de governo e saúde em 2023 — [Google — Mudanças nos resultados de FAQ/HowTo (2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes) — e o
changelog da documentação registra a descontinuação em 2026 — [Google — Atualizações da documentação da Pesquisa (changelog)](https://developers.google.com/search/updates)) e sem `Course`
(o Course Info saiu dos resultados em 2025: [Google — Simplificação da página de resultados (Course Info descontinuado, 2025)](https://developers.google.com/search/blog/2025/06/simplifying-search-results)). Sem promessa
de resultado enriquecido.

## Benefícios esperados

- Título e descrição alinhados à intenção principal → mais impressões
  relevantes e CTR (a confirmar no Search Console).
- Canonical absoluto → sinais concentrados no domínio de produção
  ([Google — Como especificar uma URL canônica](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)).
- `WebSite` com `name` no subdomínio → chance de o Google exibir o nome do site
  em vez do host ([Google — Nomes de sites na Pesquisa (subdomínios)](https://developers.google.com/search/docs/appearance/site-names)).
- Preview correto no WhatsApp/redes (tráfego de compartilhamento).
