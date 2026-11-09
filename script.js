// ============================================================
// CONFIGURAÇÃO — é só aqui que você mexe.
// "nome" é o texto que aparece no botão (use o mesmo nome do acionador).
// "url"  é o link de Play copiado do painel (ícone de corrente 🔗).
// ============================================================
const MIDIAS = [
    { nome: 'Bem Vindo Copa Feminina',   url: 'https://app.onsign.tv/play/3zc1D68aYjY5jF1FRYKVJH1Y?repeat=0', c1: '#f857a6', c2: '#ff5858' },
    { nome: 'Descanço de Tela Copa Femini', url: 'https://app.onsign.tv/play/pQiLeINElUux8wUFDMbZ9UNH?repeat=0', c1: '#00c6ff', c2: '#0072ff' },
    { nome: 'BG_LED_PPT', url: 'https://app.onsign.tv/play/JQPkTpq0ymi4ot6isbnOFKjH?repeat=0', c1: '#f7971e', c2: '#ffd200' },
    { nome: 'Mídia 4', url: 'COLE_AQUI_O_LINK_DE_PLAY_4', c1: '#11998e', c2: '#38ef7d' },
    { nome: 'Mídia 5', url: 'COLE_AQUI_O_LINK_DE_PLAY_5', c1: '#8e2de2', c2: '#4a00e0' },
    { nome: 'Mídia 6', url: 'COLE_AQUI_O_LINK_DE_PLAY_6', c1: '#eb3349', c2: '#f45c43' },
    { nome: 'Mídia 7', url: 'COLE_AQUI_O_LINK_DE_PLAY_7', c1: '#2193b0', c2: '#6dd5ed' },
    { nome: 'Mídia 8', url: 'COLE_AQUI_O_LINK_DE_PLAY_8', c1: '#834d9b', c2: '#d04ed6' }
];

// Link de Stop: botão "Parar Campanhas Sob Demanda" > seta ▾ > "Compartilhar Link de Parar"
const URL_PARAR = 'https://app.onsign.tv/stop/nwgNVM8pPf74aJNgTXU1iiDT';

const TEXTO_PADRAO = 'Escolha uma mídia para exibir agora';
const grid = document.getElementById('grid');
const stopBtn = document.getElementById('stopBtn');
const statusText = document.getElementById('status');
let ativo = null; // índice da mídia em exibição (null = loop principal)

MIDIAS.forEach((m, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-media';
    btn.textContent = m.nome;
    btn.style.setProperty('--c1', m.c1);
    btn.style.setProperty('--c2', m.c2);
    btn.addEventListener('click', () => enviar(m.url, i));
    grid.appendChild(btn);
});
stopBtn.addEventListener('click', () => enviar('https://app.onsign.tv/stop/nwgNVM8pPf74aJNgTXU1iiDT', null));

function enviar(url, indice) {
    if (url.startsWith('COLE_AQUI')) {
        statusText.textContent = 'Link ainda não configurado no script.js';
        return;
    }
    travar(true);

    // Ping de imagem: evita o bloqueio de CORS (não há confirmação real de entrega)
    const ping = new Image();
    const terminar = () => {
        ativo = indice;
        atualizar();
        travar(false);
    };
    ping.onload = terminar;
    ping.onerror = terminar; // o player não devolve imagem; o erro é esperado
    ping.src = url;
}

function travar(sim) {
    grid.querySelectorAll('button').forEach((b) => (b.disabled = sim));
    stopBtn.disabled = sim;
}

function atualizar() {
    grid.querySelectorAll('.btn-media').forEach((b, i) => b.classList.toggle('ativo', i === ativo));
    statusText.textContent = ativo === null ? TEXTO_PADRAO : `Exibindo: ${MIDIAS[ativo].nome}`;
}