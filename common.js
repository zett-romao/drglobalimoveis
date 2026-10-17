const S = window.SITE;
const $ = (s, el = document) => el.querySelector(s);
const esc = (t) => String(t ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const brl = (n) => (n == null || isNaN(n)) ? null : Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const SUB = { apartamento:'Apartamento', casa:'Casa', sobrado:'Sobrado', kitnet:'Kitnet', sala:'Sala comercial', loja:'Loja', galpao:'Galpão', terreno:'Terreno', outro:'Imóvel' };
const wa = (msg) => `https://wa.me/${S.WHATSAPP}?text=${encodeURIComponent(msg)}`;
const enderecoHTML = () => `<span class="nw">${esc(S.ENDERECO_L1)}</span><br><span class="nw">${esc(S.ENDERECO_L2)}</span>`;
const tenantRef = () => db.collection('tenants').doc(S.TENANT);

function titulo(im) {
  // Título do anúncio (Rently) tem prioridade; o apelido é identificação interna
  if (im.tituloAnuncio) return im.tituloAnuncio;
  if (im.apelido) return im.apelido;
  const e = im.endereco || {};
  return `${SUB[im.subtipo] || 'Imóvel'}${e.bairro ? ' – ' + e.bairro : ''}`;
}
function local(im) { const e = im.endereco || {}; return [e.bairro, e.cidade && (e.cidade + (e.uf ? '/' + e.uf : ''))].filter(Boolean).join(' · '); }
function preco(im) {
  const a = brl(im.aluguelSugerido), v = brl(im.valorVenda);
  if (im.finalidade === 'venda') return v ? `<b>${v}</b>` : '<b>Sob consulta</b>';
  if (im.finalidade === 'ambos') return (a ? `<b>${a}</b><small>/mês</small>` : '') + (v ? `<span class="p2">Venda ${v}</span>` : '') || '<b>Sob consulta</b>';
  return a ? `<b>${a}</b><small>/mês</small>` : '<b>Sob consulta</b>';
}
function badge(im) { return { venda:'Venda', ambos:'Venda e locação' }[im.finalidade] || 'Locação'; }
function card(im) {
  const feats = [im.quartos ? `${im.quartos} quarto${im.quartos>1?'s':''}` : null, im.banheiros ? `${im.banheiros} banh.` : null, im.vagas ? `${im.vagas} vaga${im.vagas>1?'s':''}` : null, im.areaUtil ? `${im.areaUtil} m²` : null].filter(Boolean);
  return `<a class="card" href="imovel.html?id=${encodeURIComponent(im.id)}">
    <div class="card-img">${im.coverUrl ? `<img loading="lazy" src="${esc(im.coverUrl)}" alt="${esc(titulo(im))}">` : '<div class="noimg">Sem foto</div>'}<span class="tag">${badge(im)}</span></div>
    <div class="card-body"><h3>${esc(titulo(im))}</h3><p class="loc">${esc(local(im))}</p>
    <p class="feats">${feats.map(esc).join(' · ')}</p><div class="price">${preco(im)}</div>${im.codigoAnuncio ? `<p class="small" style="color:var(--muted);margin:.4em 0 0">Cód. ${esc(im.codigoAnuncio)}</p>` : ''}</div></a>`;
}
async function carregarVitrine() {
  const snap = await tenantRef().collection('vitrine').get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(im => im.status !== 'locado' && im.status !== 'vendido');
}
async function carregarLogo() {
  try { const t = await tenantRef().get(); const u = t.data()?.logoUrl; if (u) document.querySelectorAll('.brand img').forEach(i => { i.src = u; i.hidden = false; }); } catch (_) {}
}
function montarLayout() {
  const page = document.body.dataset.page;
  $('#header').innerHTML = `<div class="wrap nav">
    <a class="brand" href="index.html"><img src="logo.png" alt="D.R. Global"><span><b>D.R. Global</b> Imóveis</span></a>
    <button class="menu-btn" aria-label="Menu" onclick="document.body.classList.toggle('menu-open')">☰</button>
    <nav><a href="index.html" ${page==='home'?'class="on"':''}>Início</a><a href="imoveis.html" ${page==='imoveis'?'class="on"':''}>Imóveis</a>
    <a href="index.html#servicos">Serviços</a><a href="index.html#anuncie">Anuncie</a><a href="index.html#contato">Contato</a>
    <a class="btn btn-wa sm" target="_blank" rel="noopener" href="${wa('Olá! Vim pelo site da D.R. Global Imóveis.')}">WhatsApp</a></nav></div>`;
  $('#footer').innerHTML = `<div class="wrap foot">
    <div><div class="brand light"><img src="logo.png" alt="D.R. Global"><span><b>D.R. Global</b> Imóveis</span></div>
    <p>Locação, venda, administração e avaliação de imóveis.</p>
    <p class="small">CNPJ ${S.CNPJ} · CRECI/PJ ${S.CRECI_PJ}<br>Corretor responsável: ${S.RESPONSAVEL} – CRECI ${S.CRECI_RESP}</p></div>
    <div><h4>Contato</h4><p><a target="_blank" rel="noopener" href="${wa('Olá! Vim pelo site.')}">WhatsApp ${S.WHATSAPP_FMT}</a><br><a href="mailto:${S.EMAIL}">${S.EMAIL}</a></p><p class="small">${enderecoHTML()}</p></div>
    <div><h4>Navegue</h4><p><a href="imoveis.html?f=locacao">Imóveis para alugar</a><br><a href="imoveis.html?f=venda">Imóveis à venda</a><br><a href="index.html#anuncie">Anuncie seu imóvel</a></p></div>
    </div><div class="copy">© ${new Date().getFullYear()} D.R. Global Imóveis. Todos os direitos reservados.</div><div class="by"><em>by DR Systems</em></div>`;
  const f = document.createElement('a'); f.className = 'wa-float'; f.target = '_blank'; f.rel = 'noopener'; f.href = wa('Olá! Vim pelo site da D.R. Global Imóveis.'); f.setAttribute('aria-label','WhatsApp');
  f.innerHTML = '<svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.5.7 4.9 2 7L3 29l6.6-2.2c2 1.1 4.2 1.7 6.4 1.7 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23.1c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1.3 1.3-3.8-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.8C5.3 9.8 10.1 5.1 16 5.1s10.7 4.7 10.7 10.5S21.9 26.1 16 26.1zm5.9-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>';
  document.body.appendChild(f);
}
document.addEventListener('DOMContentLoaded', montarLayout);

// Termos estrangeiros em itálico; WhatsApp e e-mails sempre clicáveis
const FX_RE = /\b(WhatsApp|Tour)\b|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
const FX_SKIP = new Set(['SCRIPT','STYLE','OPTION','SELECT','TEXTAREA','INPUT','TITLE','NOSCRIPT']);
function decorar(root = document.body) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode(n) {
    for (let e = n.parentElement; e; e = e.parentElement) { if (FX_SKIP.has(e.tagName) || e.classList.contains('fx')) return NodeFilter.FILTER_REJECT; }
    FX_RE.lastIndex = 0; return FX_RE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; } });
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => {
    const frag = document.createDocumentFragment(), t = n.nodeValue; let last = 0, m; FX_RE.lastIndex = 0;
    const emLinkOk = !n.parentElement.closest('a,button,label');
    while ((m = FX_RE.exec(t))) {
      frag.appendChild(document.createTextNode(t.slice(last, m.index)));
      const em = document.createElement('em'); em.className = 'fx'; em.textContent = m[0];
      if (emLinkOk && (m[0] === 'WhatsApp' || m[2])) {
        const a = document.createElement('a'); a.className = 'fx';
        if (m[2]) a.href = 'mailto:' + m[2]; else { a.href = wa('Olá! Vim pelo site da D.R. Global Imóveis.'); a.target = '_blank'; a.rel = 'noopener'; }
        a.appendChild(em); frag.appendChild(a);
      } else frag.appendChild(em);
      last = m.index + m[0].length;
    }
    frag.appendChild(document.createTextNode(t.slice(last)));
    n.parentNode.replaceChild(frag, n);
  });
}
let fxT; new MutationObserver(() => { clearTimeout(fxT); fxT = setTimeout(() => decorar(), 60); }).observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', () => setTimeout(() => decorar(), 0));
