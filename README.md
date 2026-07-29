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
    ├── logo-cppem.webp     ← logo da nova identidade
    ├── bgsniper.webp       ← fundo fixo da página
    ├── everton-mentor.jpg  ← foto do mentor (recorte 4:5 de evertonbg.jpg)
    ├── evertonbg.jpg       ← original da foto do mentor (4000×5048)
    ├── foto1..14.webp      ← carrossel de alunos aprovados
    └── plataforma/         ← prints da plataforma (plataforma-01..14.png)
```

## Identidade visual
A página segue a identidade da nova plataforma CPPEM: dourado militar sobre
grafite, `Oxanium` nos títulos e `Rajdhani` no corpo e nos botões. Todos os
tokens (ouro, fundos, texto, status e bordas) estão no `:root` do `styles.css`
— mude lá e a página inteira acompanha.

Botões: `.btn-gold` (ação primária), `.btn-outline` (secundária) e `.cta`
(o botão largo do herói, do fecho e do formulário).

## VSL
A página está **sem a parte de vídeo**, como combinado. O bloco já está pronto
em `index.html`, comentado logo abaixo do subtítulo do herói — quando a VSL
existir, basta descomentar e trocar o `src` do iframe. O CSS de `.vsl` continua
no `styles.css`.

## Prints da plataforma
Os arquivos em `public/plataforma/` vieram de `site-cppem/public/plataforma/`.
Para trocar ou acrescentar telas, mantenha a numeração `plataforma-NN.png` e
lembre-se de que **cada trilho tem uma cópia oculta dos itens** (`aria-hidden`)
— é ela que fecha o loop infinito. Editar só metade quebra a emenda.

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
