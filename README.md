# Site D.R. Global Imóveis (drglobalimoveis.com.br)

Site estático (HTML/CSS/JS) hospedado no GitHub Pages. Os imóveis vêm automaticamente da
vitrine pública do DRG-Rently (`tenants/K52yZ4nqu7Z7DJfVegYo/vitrine`); o formulário
"Anuncie seu imóvel" grava em `leadsImoveis` (origem `vitrine_publica`).

Dados de contato e CRECI: `config.js`.

## Para entrar no ar
1. Repositório GitHub (ex.: zett-romao/drglobalimoveis) com estes arquivos → Settings → Pages → branch main / root.
2. Custom domain: drglobalimoveis.com.br (arquivo CNAME já incluso) → marcar "Enforce HTTPS".
3. Registro.br (DNS do domínio), mantendo os MX/TXT do Zoho:
   - A  @  185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
   - CNAME  www  zett-romao.github.io.
4. Google Cloud → Credentials → Browser key do projeto drg-rently → HTTP referrers: incluir
   `drglobalimoveis.com.br/*` e `www.drglobalimoveis.com.br/*`.
