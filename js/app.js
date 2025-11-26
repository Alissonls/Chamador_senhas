/**
 * Chamador de Senhas - Sistema de Chamada de Pedidos
 * @version 2.0.0
 * @description Sistema modular para gerenciamento de filas e chamadas de pedidos
 */

'use strict';

/* ==========================================================================
   CLASSE: AudioPlayer - Gerenciamento de Sons
   ========================================================================== */
class AudioPlayer {
    constructor() {
        this.audioCtx = null;
    }

    /**
     * Inicializa o contexto de áudio
     * @private
     */
    _initContext() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    /**
     * Toca o som de chamada de senha
     * @public
     */
    playChamadaSound() {
        this._initContext();

        const osc1 = this.audioCtx.createOscillator();
        const osc2 = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(800, this.audioCtx.currentTime);
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1200, this.audioCtx.currentTime);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, this.audioCtx.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.3);

        osc1.start(this.audioCtx.currentTime);
        osc2.start(this.audioCtx.currentTime);

        osc1.stop(this.audioCtx.currentTime + 0.3);
        osc2.stop(this.audioCtx.currentTime + 0.3);
    }
}

/* ==========================================================================
   CLASSE: StorageManager - Gerenciamento de Persistência
   ========================================================================== */
class StorageManager {
    constructor() {
        this.storageKey = 'chamador_senhas';
    }

    /**
     * Salva dados no localStorage
     * @param {Object} data - Dados a serem salvos
     * @public
     */
    save(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            return false;
        }
    }

    /**
     * Carrega dados do localStorage
     * @returns {Object|null} - Dados carregados ou null
     * @public
     */
    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            return null;
        }
    }

    /**
     * Limpa dados do localStorage
     * @public
     */
    clear() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            return false;
        }
    }
}

/* ==========================================================================
   CLASSE: QueueManager - Gerenciamento de Fila de Senhas
   ========================================================================== */
class QueueManager {
    constructor(maxHistorySize = 5) {
        this.senhaAtual = '';
        this.ultimasSenhas = [];
        this.maxHistorySize = maxHistorySize;
        this.storage = new StorageManager();
        this._loadFromStorage();
    }

    /**
     * Carrega histórico do localStorage
     * @private
     */
    _loadFromStorage() {
        const data = this.storage.load();
        if (data && data.ultimasSenhas) {
            this.ultimasSenhas = data.ultimasSenhas;
        }
    }

    /**
     * Salva histórico no localStorage
     * @private
     */
    _saveToStorage() {
        this.storage.save({
            ultimasSenhas: this.ultimasSenhas,
            lastUpdate: new Date().toISOString()
        });
    }

    /**
     * Adiciona dígito à senha atual
     * @param {string} digito - Dígito a ser adicionado
     * @returns {boolean} - Se foi adicionado com sucesso
     * @public
     */
    adicionarDigito(digito) {
        if (this.senhaAtual.length >= 4) {
            return false;
        }
        this.senhaAtual += digito;
        return true;
    }

    /**
     * Limpa a senha atual
     * @public
     */
    limparSenhaAtual() {
        this.senhaAtual = '';
    }

    /**
     * Obtém a senha atual
     * @returns {string} - Senha atual
     * @public
     */
    getSenhaAtual() {
        return this.senhaAtual;
    }

    /**
     * Valida a senha atual
     * @returns {Object} - {valid: boolean, message: string, numero: number}
     * @public
     */
    validarSenha() {
        if (this.senhaAtual === '') {
            return { valid: false, message: 'Digite um número!', numero: null };
        }

        const numero = parseInt(this.senhaAtual);

        if (isNaN(numero)) {
            return { valid: false, message: 'Número inválido!', numero: null };
        }

        if (numero < 1 || numero > 1000) {
            return { valid: false, message: 'Número deve estar entre 1 e 1000!', numero: null };
        }

        return { valid: true, message: '', numero };
    }

    /**
     * Adiciona senha ao histórico
     * @param {string} senha - Senha a ser adicionada
     * @public
     */
    adicionarAoHistorico(senha) {
        // Evita duplicatas consecutivas
        if (this.ultimasSenhas.length > 0 && this.ultimasSenhas[0] === senha) {
            return;
        }

        this.ultimasSenhas.unshift(senha);

        // Mantém apenas o tamanho máximo
        if (this.ultimasSenhas.length > this.maxHistorySize) {
            this.ultimasSenhas.pop();
        }

        this._saveToStorage();
    }

    /**
     * Obtém o histórico de senhas
     * @returns {Array} - Array com histórico
     * @public
     */
    getHistorico() {
        return this.ultimasSenhas;
    }

    /**
     * Limpa todo o histórico
     * @public
     */
    limparHistorico() {
        this.ultimasSenhas = [];
        this._saveToStorage();
    }
}

/* ==========================================================================
   CLASSE: UIController - Controle da Interface
   ========================================================================== */
class UIController {
    constructor() {
        this.elements = {
            hiddenInput: document.getElementById('hidden-input'),
            displaySenhaAtual: document.getElementById('senha-atual'),
            displayTipoSenha: document.getElementById('tipo-senha'),
            previewNumero: document.getElementById('preview-numero'),
            cursor: document.getElementById('cursor'),
            feedback: document.getElementById('feedback'),
            controlPanel: document.getElementById('control-panel'),
            togglePanelBtn: document.getElementById('toggle-panel'),
            historicoSenhas: document.getElementById('historico-senhas')
        };
    }

    /**
     * Atualiza o preview da senha
     * @param {string} senha - Senha a ser exibida
     * @public
     */
    atualizarPreview(senha) {
        this.elements.previewNumero.textContent = senha;
        this.elements.cursor.classList.remove('opacity-0');
    }

    /**
     * Atualiza a senha principal exibida
     * @param {string} senha - Senha a ser exibida
     * @public
     */
    atualizarSenhaAtual(senha) {
        this.elements.displaySenhaAtual.textContent = senha;
        this.elements.displaySenhaAtual.classList.remove('text-gray-400');
        this.elements.displaySenhaAtual.classList.add('animate-pulse');

        this.elements.displayTipoSenha.textContent = 'PEDIDO';
        this.elements.displayTipoSenha.className = 'text-white text-2xl md:text-4xl font-semibold';

        // Remove animação após 2 segundos
        setTimeout(() => {
            this.elements.displaySenhaAtual.classList.remove('animate-pulse');
        }, 2000);
    }

    /**
     * Atualiza o histórico visual de senhas
     * @param {Array} historico - Array com histórico de senhas
     * @public
     */
    atualizarHistorico(historico) {
        this.elements.historicoSenhas.innerHTML = '';

        if (historico.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Nenhum pedido chamado ainda.';
            li.className = 'text-white text-3xl font-semibold';
            this.elements.historicoSenhas.appendChild(li);
            return;
        }

        // Mostrar até 5 senhas
        const senhasParaMostrar = historico.slice(0, 5);
        senhasParaMostrar.forEach((senha, index) => {
            const li = document.createElement('li');
            li.textContent = senha;
            li.className = 'text-6xl font-bold text-white select-none bg-opacity-10 bg-white rounded-lg px-4 py-2 animate-fade-in';
            li.style.animationDelay = `${index * 50}ms`;
            this.elements.historicoSenhas.appendChild(li);
        });
    }

    /**
     * Mostra mensagem de feedback
     * @param {string} mensagem - Mensagem a exibir
     * @param {boolean} sucesso - Se é mensagem de sucesso ou erro
     * @public
     */
    mostrarFeedback(mensagem, sucesso = true) {
        const bgColor = sucesso ? 'bg-green-500' : 'bg-red-500';
        this.elements.feedback.textContent = mensagem;
        this.elements.feedback.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg font-semibold opacity-0 transition-opacity duration-300 ${bgColor} text-white z-50`;

        requestAnimationFrame(() => {
            this.elements.feedback.classList.remove('opacity-0');

            setTimeout(() => {
                this.elements.feedback.classList.add('opacity-0');
            }, 2500);
        });
    }

    /**
     * Alterna visibilidade do painel de controle
     * @public
     */
    toggleControlPanel() {
        const isVisible = this.elements.controlPanel.classList.contains('translate-y-0');

        if (isVisible) {
            this.elements.controlPanel.classList.remove('translate-y-0');
            this.elements.controlPanel.classList.add('translate-y-full');
            this.elements.togglePanelBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            `;
        } else {
            this.elements.controlPanel.classList.remove('translate-y-full');
            this.elements.controlPanel.classList.add('translate-y-0');
            this.elements.togglePanelBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
            `;
        }

        this.focusInput();
    }

    /**
     * Foca no input oculto
     * @public
     */
    focusInput() {
        this.elements.hiddenInput.focus();
    }

    /**
     * Limpa o preview
     * @public
     */
    limparPreview() {
        this.elements.previewNumero.textContent = '';
        this.elements.cursor.classList.remove('opacity-0');
    }
}

/* ==========================================================================
   CLASSE: CarouselController - Controle de Carrosséis
   ========================================================================== */
class CarouselController {
    constructor() {
        this.carousels = [];
    }

    /**
     * Inicializa os carrosséis
     * @public
     */
    init() {
        // Carrossel esquerdo - 30 segundos
        try {
            const glideEsquerda = new Glide('.glide-esquerda', {
                type: 'carousel',
                autoplay: 30000,
                hoverpause: false,
                perView: 1,
                animationDuration: 1000
            });
            glideEsquerda.mount();
            this.carousels.push(glideEsquerda);
        } catch (error) {
            console.warn('Erro ao inicializar carrossel esquerdo:', error);
        }

        // Carrossel direito - 30 segundos (corrigido de 15s)
        try {
            const glideDireita = new Glide('.glide-direita', {
                type: 'carousel',
                autoplay: 30000,
                hoverpause: false,
                perView: 1,
                animationDuration: 1000
            });
            glideDireita.mount();
            this.carousels.push(glideDireita);
        } catch (error) {
            console.warn('Erro ao inicializar carrossel direito:', error);
        }
    }

    /**
     * Destroi os carrosséis
     * @public
     */
    destroy() {
        this.carousels.forEach(carousel => {
            try {
                carousel.destroy();
            } catch (error) {
                console.warn('Erro ao destruir carrossel:', error);
            }
        });
        this.carousels = [];
    }
}

/* ==========================================================================
   CLASSE PRINCIPAL: ChamadorApp - Aplicação Principal
   ========================================================================== */
class ChamadorApp {
    constructor() {
        this.queueManager = new QueueManager(5);
        this.uiController = new UIController();
        this.audioPlayer = new AudioPlayer();
        this.carouselController = new CarouselController();
    }

    /**
     * Inicializa a aplicação
     * @public
     */
    init() {
        this._setupEventListeners();
        this._initializeUI();
        this.carouselController.init();
        console.log('✅ Chamador de Senhas inicializado com sucesso!');
    }

    /**
     * Configura event listeners
     * @private
     */
    _setupEventListeners() {
        // Foca no input quando página carrega
        this.uiController.focusInput();

        // Listener de teclado
        document.addEventListener('keydown', (e) => this._handleKeyDown(e));

        // Garantir foco ao clicar na página
        document.addEventListener('click', () => {
            this.uiController.focusInput();
        });
    }

    /**
     * Inicializa interface
     * @private
     */
    _initializeUI() {
        this.uiController.atualizarHistorico(this.queueManager.getHistorico());
        this.uiController.atualizarPreview('');
    }

    /**
     * Manipula eventos de teclado
     * @param {KeyboardEvent} e - Evento de teclado
     * @private
     */
    _handleKeyDown(e) {
        // Números
        if (e.key >= '0' && e.key <= '9') {
            this.adicionarDigito(e.key);
            e.preventDefault();
            return;
        }

        // Backspace
        if (e.key === 'Backspace') {
            const senhaAtual = this.queueManager.getSenhaAtual();
            this.queueManager.senhaAtual = senhaAtual.slice(0, -1);
            this.uiController.atualizarPreview(this.queueManager.getSenhaAtual());
            e.preventDefault();
            return;
        }

        // Enter - chamar senha
        if (e.key === 'Enter') {
            this.chamarSenha();
            e.preventDefault();
            return;
        }

        // Escape - limpar
        if (e.key === 'Escape') {
            this.limpar();
            e.preventDefault();
            return;
        }

        // Espaço - toggle painel
        if (e.key === ' ') {
            this.uiController.toggleControlPanel();
            e.preventDefault();
            return;
        }
    }

    /**
     * Adiciona dígito à senha
     * @param {string} digito - Dígito a adicionar
     * @public
     */
    adicionarDigito(digito) {
        const adicionado = this.queueManager.adicionarDigito(digito);
        if (adicionado) {
            this.uiController.atualizarPreview(this.queueManager.getSenhaAtual());
        }
    }

    /**
     * Limpa a senha atual
     * @public
     */
    limpar() {
        this.queueManager.limparSenhaAtual();
        this.uiController.limparPreview();
        this.uiController.focusInput();
    }

    /**
     * Chama a senha
     * @public
     */
    chamarSenha() {
        const validacao = this.queueManager.validarSenha();

        if (!validacao.valid) {
            this.uiController.mostrarFeedback(validacao.message, false);
            return;
        }

        // Toca som
        this.audioPlayer.playChamadaSound();

        // Atualiza UI
        const senha = this.queueManager.getSenhaAtual();
        this.uiController.atualizarSenhaAtual(senha);

        // Adiciona ao histórico
        this.queueManager.adicionarAoHistorico(senha);
        this.uiController.atualizarHistorico(this.queueManager.getHistorico());

        // Feedback
        this.uiController.mostrarFeedback(`Pedido ${senha} chamado com sucesso!`, true);

        // Limpa após 1.5s
        setTimeout(() => {
            this.limpar();
        }, 1500);
    }

    /**
     * Toggle do painel de controle
     * @public
     */
    toggleControlPanel() {
        this.uiController.toggleControlPanel();
    }
}

/* ==========================================================================
   FUNÇÕES GLOBAIS - Compatibilidade com HTML inline
   ========================================================================== */
let app;

// Funções expostas globalmente para uso nos botões HTML
window.adicionarDigito = (digito) => app?.adicionarDigito(digito);
window.chamarSenha = () => app?.chamarSenha();
window.limpar = () => app?.limpar();
window.toggleControlPanel = () => app?.toggleControlPanel();

/* ==========================================================================
   INICIALIZAÇÃO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    app = new ChamadorApp();
    app.init();

    // Inicializar e atualizar relógio
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

/**
 * Atualiza data e hora no header
 */
function updateDateTime() {
    const dataHoraElement = document.getElementById('data-hora');
    if (dataHoraElement) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        dataHoraElement.textContent = now.toLocaleDateString('pt-BR', options);
    }
}
