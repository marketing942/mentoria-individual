# CPPEM Concursos — Landing Page

Página única de captação. Dados do formulário vão direto para o Google Sheets.

---

## ✅ Como conectar ao Google Sheets (5 minutos)

### 1. Crie a planilha
- Acesse https://sheets.google.com e crie uma planilha nova.
- Dê o nome que quiser (ex: "Leads CPPEM").

### 2. Abra o editor de script
- No menu da planilha: **Extensões → Apps Script**
- Apague tudo que estiver no editor.
- Copie todo o conteúdo do arquivo `google-apps-script.js` (que está nesta pasta) e cole.
- Clique em **Salvar** (ícone de disquete ou Ctrl+S).

### 3. Faça o deploy como Web App
- Clique em **Implantar → Nova implantação**
- Tipo: **App da Web**
- Descrição: "CPPEM Leads"
- Executar como: **Minha conta**
- Quem tem acesso: **Qualquer pessoa** ← obrigatório
- Clique em **Implantar**
- **Copie a URL** que aparece (começa com `https://script.google.com/macros/s/...`)

### 4. Cole a URL no projeto
- Abra o arquivo `script.js`
- Linha 7 — substitua `COLE_AQUI_A_URL_DO_WEB_APP` pela URL copiada:
  ```js
  const SHEET_URL = "https://script.google.com/macros/s/SUA_URL_AQUI/exec";
  ```
- Salve o arquivo.

### 5. Teste
- Abra a página, preencha o formulário e envie.
- Volte à planilha — deve aparecer uma nova linha com: Data e Hora / Nome / E-mail / Telefone.

> **Dica:** toda vez que atualizar o `google-apps-script.js` na planilha, faça
> uma **nova implantação** (não "gerenciar existente"), senão a URL antiga fica desatualizada.

---

## Estrutura de arquivos
```
mentoria-individual/
├── index.html              ← página
├── styles.css              ← estilos
├── script.js               ← validação + envio para Sheets + modal
├── google-apps-script.js   ← código que vai no Apps Script do Google
├── validar-tracking.js
├── vercel.json
└── public/
    ├── logo-cppem.png      ← logo original (1719×915, prata metálico)
    ├── logo-cppem-web.png  ← versão 660 px usada na página e na máscara do brilho
    ├── bgsniper.webp       ← fundo fixo da página
    ├── everton-mentor.jpg  ← foto do mentor (recorte 4:5 de evertonbg.jpg)
    ├── evertonbg.jpg       ← original da foto do mentor (4000×5048)
    ├── foto1..14.webp      ← carrossel de alunos aprovados
    └── plataforma/         ← prints da plataforma (plataforma-01..14.png)
```

## Identidade visual
A página segue o padrão **prata sobre fundos frios** da plataforma CPPEM, com
`Oxanium` nos títulos e `Rajdhani` no corpo e nos botões. Todos os tokens estão
no `:root` do `styles.css` — mude lá e a página inteira acompanha.

| Token | Valor | Uso |
|---|---|---|
| `--silver` | `#B8C0CC` | marca · ação primária |
| `--silver-light` | `#D4DAE3` | hover · destaque |
| `--silver-dark` | `#7A8490` | gradiente |
| `--bg` … `--bg-4` | `#050505` `#0E0F12` `#15171B` `#1E2127` | fundos |
| `--text` / `--text-dim` / `--text-faint` | `#E8EAED` `#7A8088` `#4E535B` | texto |
| `--ink` | `#070809` | texto escuro sobre prata |
| `--border` / `--border-active` | `rgba(184,192,204,.12)` / `.45` | bordas |
| status | `#5BA87B` `#E8875A` `#DC6060` `#5B8AF0` `#A07BF0` | success · warn · danger · info · special |

Botões (nomes mantidos iguais ao guia): `.btn-gold` (ação primária, 1 por tela),
`.btn-outline`, `.btn-acessar`, `.btn-add`, `.btn-remove` — todos em Rajdhani
700, uppercase, raio 8px e transição `.28s`. O `.cta` é a variação larga usada
no herói, no fecho e no formulário.

### Logo com varredura de luz
A logo do herói usa `public/logo-cppem-web.png` (versão de 960 px gerada a
partir de `logo-cppem.png`, que tem 1719 px e 880 KB).

O brilho é feito em duas camadas, e a separação é o que faz funcionar:

- `.logo-shine` fica **parada**. Ela carrega a `mask-image` (o alpha do próprio
  PNG, para a luz existir só onde há logo) e o `mix-blend-mode: color-dodge`.
- `.logo-shine::before` é a faixa que **anda**, por `transform: translateX()`.

Tentar mover a luz por `background-position` na própria `.logo-shine` faz a
máscara andar junto com ela — foi assim na primeira versão e o efeito não lia.

Dois detalhes que parecem opcionais e não são: a faixa é **opaca** de ponta a
ponta (as bordas em `#000` são neutras no dodge, então o retângulo desaparece;
com alpha, o dodge levantaria o preto do miolo do leão e a faixa viraria um
bloco cinza visível), e ela é **estreita** — espalhada, o efeito lê como "a logo
clareou" em vez de "passou uma luz".

Se trocar o arquivo da logo, troque também a URL da `mask-image` no `styles.css`.

## VSL
A página está **sem a parte de vídeo**, como combinado. O bloco já está pronto
em `index.html`, comentado logo abaixo do subtítulo do herói — quando a VSL
existir, basta descomentar e trocar o `src` do iframe. O CSS de `.vsl` continua
no `styles.css`.

## Prints da plataforma
Os arquivos em `public/plataforma/` vieram de `site-cppem/public/plataforma/`,
com duas mudanças:

1. **13,5% da altura foi cortada de baixo.** Nove dos quatorze prints originais
   (02, 03, 05, 06, 08, 10, 12, 13 e 14) tinham a marca d'água "Ativar o
   Windows" no canto inferior direito. Os originais intactos continuam em
   `site-cppem/public/plataforma/`.
2. As proporções variam muito entre si (de 2,1:1 a 6,2:1), então o tile fixa
   `aspect-ratio: 2.2/1` e o `object-fit: cover` uniformiza. Sem isso as duas
   fileiras ficam irregulares.

Para trocar ou acrescentar telas, mantenha a numeração `plataforma-NN.png` e
lembre-se de que **cada trilho tem uma cópia oculta dos itens** (`aria-hidden`)
— é ela que fecha o loop infinito. Editar só metade quebra a emenda.

> Os prints mostram a plataforma no tema **ouro**. Quando ela for para o prata,
> vale refazer as capturas — hoje é o único ponto da página fora da paleta.

## Fotos dos alunos
O carrossel usa `public/foto1..14.webp`, também com a segunda sequência
duplicada e marcada com `aria-hidden` para o loop contínuo.

## Subir no GitHub + Vercel
```bash
git init && git add . && git commit -m "CPPEM landing page"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/cppem-lp.git
git push -u origin main
```
No Vercel: Add New → Project → importe o repo → Framework Preset: **Other** → Deploy.
