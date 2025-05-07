# Chamador de Senhas

Um sistema simples e personalizável para gerenciar fila de atendimento por senhas. Ideal para clínicas, escritórios, repartições públicas, bancos e qualquer outro estabelecimento que precise organizar o fluxo de clientes.

---

## 📋 Sumário

- [Descrição](#descrição)  
- [Funcionalidades](#funcionalidades)  
- [Tecnologias](#tecnologias)  
- [Pré-requisitos](#pré-requisitos)  
- [Instalação](#instalação)  
- [Configuração](#configuração)  
- [Uso](#uso)  
- [Contribuição](#contribuição)  
- [Licença](#licença)  

---

## 📝 Descrição

O **Chamador de Senhas** permite:
- Emitir senhas sequenciais para atendimento.  
- Exibir a senha atual em tela externa (monitor ou projetor).  
- Chamar a próxima senha com som ou mensagem visual.  
- Registrar histórico de senhas atendidas.  
- Personalizar layouts, sons e intervalos de chamada.  

É fácil de instalar, configurar e usar — ideal para quem quer organizar o atendimento sem complicação.

---

## ⚙️ Funcionalidades

1. **Emissão de Senhas**  
   - Geração automática de números sequenciais (ex.: 001, 002, …).  
2. **Chamada de Senhas**  
   - Botão “Próxima” para avançar no atendimento.  
   - Anúncio sonoro com voz sintetizada.  
3. **Painel de Exibição**  
   - Tela em tempo real mostrando a senha atual.  
   - Modo “espera” quando não há chamadas ativas.  
4. **Histórico**  
   - Registro de todas as senhas chamadas e horários.  
   - Exportação em CSV.  
5. **Personalização**  
   - Temas de cores e fontes.  
   - Sons e mensagens configuráveis.  
6. **Multilinguagem**  
   - Suporte a português, inglês e outros idiomas.  

---

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vue.js ou React)  
- **Backend**: Node.js (Express) ou Python (Flask/Django)  
- **Banco de Dados**: SQLite, PostgreSQL ou MongoDB  
- **Síntese de Voz**: Web Speech API ou serviços de TTS (Google, AWS, Azure)  
- **Empacotamento**: Docker (opcional)  

---

## 🚀 Pré-requisitos

- [Node.js](https://nodejs.org/) ≥ 14.x **ou** [Python](https://www.python.org/) ≥ 3.8  
- [Git](https://git-scm.com/)  
- [Docker](https://www.docker.com/) (opcional)  

---

## 📥 Instalação

1. **Clone o repositório**  
   ```bash
   git clone https://github.com/seu-usuario/chamador-de-senhas.git
   cd chamador-de-senhas
