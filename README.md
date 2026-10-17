# Site D.R. Global Imóveis (drglobalimoveis.com.br)

Site estático (HTML/CSS/JS) hospedado no GitHub Pages.

- **Home institucional** (`index.html`, `style.css`, `common.js`, `config.js`): feita aqui.
- **Vitrine** (`imoveis.html`, `imovel.html` e os `public-*.js`, `public.css`, `styles.css`,
  `firebase-config.js`, `icones/`): **é a vitrine do DRG-Rently**, copiada automaticamente pelo
  workflow *Sincronizar vitrine do Rently* (a cada hora e pelo botão "Run workflow").
  **Não edite esses arquivos aqui** — a próxima sincronização sobrescreve. Melhorias vão no
  repositório `drg-rently`.
- O que faz a vitrine "morar" aqui (não é sincronizado): `rently-site.js` (imobiliária fixa e
  "Início" voltando à home) e `tema.css` (cores e fontes do site).
- Sincronizar na hora, a partir da cópia local: `RENTLY_LOCAL=/c/Projetos/DRG-Rently bash scripts/sincronizar-vitrine.sh`.
- No Rently: Configurações → **Site próprio da imobiliária** = `https://drglobalimoveis.com.br`
  (links compartilhados no WhatsApp passam a abrir aqui).

Dados de contato e CRECI: `config.js`.

## Para entrar no ar
1. Repositório GitHub (ex.: zett-romao/drglobalimoveis) com estes arquivos → Settings → Pages → branch main / root.
2. Custom domain: drglobalimoveis.com.br (arquivo CNAME já incluso) → marcar "Enforce HTTPS".
3. Registro.br (DNS do domínio), mantendo os MX/TXT do Zoho:
   - A  @  185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
   - CNAME  www  zett-romao.github.io.
4. Google Cloud → Credentials → Browser key do projeto drg-rently → HTTP referrers: incluir
   `drglobalimoveis.com.br/*` e `www.drglobalimoveis.com.br/*`.
