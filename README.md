# Monitor de Atividade - PWA

Um aplicativo web progressivo (PWA) para monitorar e registrar atividades periódicas. O usuário deve pressionar um botão a cada intervalo configurável para confirmar sua presença/atividade.

## 🚀 Funcionalidades

- ✅ **Check-in periódico**: Botão para confirmar presença em intervalos configuráveis
- ⏱️ **Timer visual**: Contador regressivo mostrando tempo restante até próximo check-in
- ⚙️ **Intervalo configurável**: Defina o tempo entre check-ins (1-1440 minutos)
- 📊 **Barra de progresso**: Visualização do tempo decorrido
- 🔔 **Notificações**: Alertas quando o check-in está próximo ou atrasado
- 📋 **Histórico completo**: Registro de todas as atividades com status
- 💾 **Armazenamento local**: Dados salvos no navegador
- 📤 **Exportação**: Exporte o histórico em formato CSV
- 📱 **Instalável**: Pode ser instalado como app no celular ou desktop
- 🌐 **Funciona offline**: Service Worker para uso sem internet

## 📦 Instalação

### Como PWA (Recomendado)

1. Abra o aplicativo em um navegador moderno (Chrome, Edge, Safari, Firefox)
2. Procure pelo ícone de instalação na barra de endereços ou menu
3. Clique em "Instalar" ou "Adicionar à tela inicial"
4. O app será instalado como aplicativo nativo

### Servidor Local

Para testar localmente, você precisa de um servidor HTTP. Escolha uma das opções:

**Opção 1 - Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Opção 2 - Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Opção 3 - PHP:**
```bash
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## 🎯 Como Usar

1. **Primeiro Check-in**: Pressione o botão "Confirmar Presença" para iniciar
2. **Configure o Intervalo**: Defina quantos minutos entre cada check-in (padrão: 30 min)
3. **Ative Notificações**: Marque a opção para receber alertas
4. **Monitore o Timer**: Acompanhe o tempo restante na tela principal
5. **Check-ins Regulares**: Pressione o botão antes do tempo acabar
6. **Visualize Histórico**: Veja todos os check-ins realizados

## 🎨 Recursos Visuais

- **Verde**: Check-in realizado no prazo
- **Amarelo**: Menos de 5 minutos restantes
- **Vermelho piscando**: Check-in atrasado
- **Barra de progresso**: Mostra tempo decorrido visualmente

## 📱 Compatibilidade

- ✅ Chrome/Edge (Desktop e Mobile)
- ✅ Safari (iOS e macOS)
- ✅ Firefox (Desktop e Mobile)
- ✅ Samsung Internet
- ✅ Opera

## 🔧 Tecnologias

- HTML5
- CSS3 (Design responsivo)
- JavaScript (Vanilla)
- Service Worker (PWA)
- Web Notifications API
- LocalStorage API

## 📝 Estrutura de Arquivos

```
deadmanSwitch/
├── index.html          # Página principal
├── styles.css          # Estilos
├── app.js             # Lógica do aplicativo
├── manifest.json      # Manifesto PWA
├── service-worker.js  # Service Worker para cache
├── icon-192.png       # Ícone 192x192
├── icon-512.png       # Ícone 512x512
└── README.md          # Este arquivo
```

## 🔒 Privacidade

Todos os dados são armazenados localmente no seu dispositivo. Nenhuma informação é enviada para servidores externos.

## 🎯 Casos de Uso

- Monitoramento de atividade em trabalho remoto
- Sistema "dead man's switch" pessoal
- Lembretes periódicos de tarefas
- Controle de presença
- Registro de atividades regulares

## 🛠️ Personalização

Você pode personalizar:
- Intervalo de check-in (1 a 1440 minutos)
- Cores no arquivo `styles.css`
- Textos e mensagens no `index.html` e `app.js`
- Ícones (substitua `icon-192.png` e `icon-512.png`)

## ⚠️ Notas Importantes

- O timer continua rodando mesmo se você fechar a aba (dados salvos no LocalStorage)
- Notificações requerem permissão do navegador
- Para funcionar offline, acesse o app online pelo menos uma vez
- O histórico é limitado a 100 entradas mais recentes

## 📄 Licença

Livre para uso pessoal e comercial.
