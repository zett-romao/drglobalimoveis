#!/usr/bin/env bash
# Copia a vitrine pública do DRG-Rently (repo público zett-romao/drg-rently, branch main)
# para este site e injeta a configuração da D.R. Global (rently-site.js + tema.css).
# RENTLY_LOCAL=/c/Projetos/DRG-Rently usa a cópia local em vez do GitHub (raw tem cache de minutos).
# Rodado pelo workflow .github/workflows/sincronizar-vitrine.yml (a cada hora e manual).
set -euo pipefail
BASE="https://raw.githubusercontent.com/zett-romao/drg-rently/main"
ARQS="site.css site-engine.js site-padrao.js imoveis.html imovel.html public-imoveis.js public-imovel.js public-shell.js public.css styles.css firebase-config.js icones/favicon.ico icones/favicon-32.png"
mkdir -p icones
TMP=$(mktemp -d)
for a in $ARQS; do
  mkdir -p "$TMP/$(dirname "$a")"
  if [ -n "${RENTLY_LOCAL:-}" ]; then cp "$RENTLY_LOCAL/$a" "$TMP/$a"   # cópia local (uso manual)
  else curl -fsSL "$BASE/$a" -o "$TMP/$a"; fi                        # falhou um arquivo = não troca nada (set -e)
done
for p in imoveis.html imovel.html; do
  # tema depois do public.css; configuração do site antes do public-shell.js
  sed -i -E 's#(<link rel="stylesheet" href="public\.css[^"]*">)#\1\n  <link rel="stylesheet" href="tema.css">#' "$TMP/$p"
  sed -i -E 's#(<script src="public-shell\.js[^"]*"></script>)#<script src="selo-digital.js"></script>\n  <script src="rently-site.js"></script>\n  \1#' "$TMP/$p"
  grep -q 'href="tema.css"' "$TMP/$p" && grep -q 'src="rently-site.js"' "$TMP/$p" || { echo "ERRO: não achei onde injetar em $p — layout do Rently mudou"; exit 1; }
done
for a in $ARQS; do cp "$TMP/$a" "$a"; done
rm -rf "$TMP"
echo "Vitrine sincronizada."
