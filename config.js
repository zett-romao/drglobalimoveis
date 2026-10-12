// D.R. Global Imóveis — configuração do site
// Imóveis vêm da vitrine pública do DRG-Rently (tenants/{TENANT}/vitrine).
window.SITE = {
  TENANT: 'K52yZ4nqu7Z7DJfVegYo',
  WHATSAPP: '551152960840',          // Atende24h
  WHATSAPP_FMT: '+55 11 5296-0840',
  EMAIL: 'atendimento@drglobalimoveis.com.br',
  CNPJ: '49.698.112/0001-57',
  CRECI_PJ: '43.112-J',
  CRECI_RESP: '229508',
  RESPONSAVEL: 'Aparecido Donizete Romão',
  ENDERECO: 'Alameda Rio Negro, 1030 – Escritório 206 – Alphaville – Barueri/SP – CEP 06454-000',
  ENDERECO_L1: 'Alameda Rio Negro, 1030 – Escritório 206',
  ENDERECO_L2: 'Alphaville – Barueri/SP – CEP 06454-000'
};
const firebaseConfig = {
  apiKey: "AIzaSyBnkH-HvtOnrXBwupBHdhF107C7ysDUnI4",
  authDomain: "drg-rently.firebaseapp.com",
  projectId: "drg-rently",
  storageBucket: "drg-rently.firebasestorage.app",
  messagingSenderId: "838607866137",
  appId: "1:838607866137:web:20ccc69985309e95811d88"
};
firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();
