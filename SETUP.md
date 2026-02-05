# Configuração Rápida

## Passo 1: Gerar os Ícones PNG

Os ícones são necessários para instalar o PWA. Escolha uma das opções:

### Opção A - Usar o Gerador HTML (Mais Fácil)
1. Abra o arquivo `create-icons.html` no seu navegador
2. Clique nos botões para baixar `icon-192.png` e `icon-512.png`
3. Salve os arquivos na pasta do projeto

### Opção B - Converter SVG para PNG
Use um conversor online ou ferramenta:
- **Online**: https://cloudconvert.com/svg-to-png
  - Faça upload de `icon-192.svg` e `icon-512.svg`
  - Baixe os PNGs gerados
  
- **ImageMagick** (se instalado):
  ```bash
  magick icon-192.svg icon-192.png
  magick icon-512.svg icon-512.png
  ```

### Opção C - Usar Ícones Temporários
Os arquivos SVG funcionam em alguns navegadores, mas PNG é recomendado para melhor compatibilidade.

## Passo 2: Iniciar o Servidor

Escolha um método para servir os arquivos:

### Python (Recomendado)
```bash
cd c:\repos\deadmanSwitch
python -m http.server 8000
```

### Node.js
```bash
cd c:\repos\deadmanSwitch
npx http-server -p 8000
```

### PHP
```bash
cd c:\repos\deadmanSwitch
php -S localhost:8000
```

## Passo 3: Acessar o Aplicativo

1. Abra o navegador em: `http://localhost:8000`
2. O aplicativo deve carregar normalmente
3. Para instalar como PWA:
   - **Chrome/Edge**: Clique no ícone de instalação na barra de endereços
   - **Mobile**: Menu → "Adicionar à tela inicial"

## Passo 4: Testar

1. Pressione "Confirmar Presença" para iniciar
2. Configure o intervalo desejado (ex: 5 minutos para teste)
3. Ative as notificações se desejar
4. Observe o timer contando regressivamente

## Solução de Problemas

### Service Worker não registra
- Certifique-se de estar usando HTTPS ou localhost
- Limpe o cache do navegador
- Verifique o console do navegador (F12)

### Ícones não aparecem
- Certifique-se de ter os arquivos PNG (não apenas SVG)
- Limpe o cache e recarregue a página
- Verifique se os nomes dos arquivos estão corretos

### Notificações não funcionam
- Permita notificações quando solicitado
- Verifique as configurações do navegador
- Alguns navegadores bloqueiam notificações por padrão

## Deploy em Produção

Para usar em produção, você pode hospedar em:
- **GitHub Pages**: Gratuito e fácil
- **Netlify**: Deploy automático
- **Vercel**: Suporte PWA nativo
- **Firebase Hosting**: Gratuito com SSL

Todos esses serviços oferecem HTTPS automaticamente, necessário para PWAs.
