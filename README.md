# 🏠 Achei Meu Lar Conectado

A modern real estate platform that connects property owners with potential tenants, providing an intuitive and efficient solution for the real estate market.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## 📋 Sobre o Projeto

**Achei Meu Lar Conectado** é uma aplicação web moderna desenvolvida para facilitar a busca e conexão entre proprietários de imóveis e potenciais inquilinos. A plataforma oferece uma interface intuitiva e responsiva, proporcionando uma experiência eficiente para todos os usuários do mercado imobiliário.

## ✨ Funcionalidades

- 🔍 **Busca de Imóveis** - Sistema de busca avançada com filtros personalizados
- 📱 **Design Responsivo** - Interface otimizada para todos os dispositivos
- 🎨 **UI Moderna** - Interface construída com componentes acessíveis e modernos
- ⚡ **Performance** - Aplicação rápida e otimizada com Vite
- 🔒 **Type Safety** - Desenvolvido com TypeScript para maior confiabilidade

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI acessíveis e customizáveis

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para garantir qualidade de código
- **PostCSS** - Processador CSS
- **Git** - Controle de versão

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **pnpm** ou **bun** (gerenciador de pacotes)

> 💡 **Dica**: Recomendamos usar [nvm](https://github.com/nvm-sh/nvm) para gerenciar versões do Node.js

## 🛠️ Instalação

Siga estes passos para configurar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/Claudiolitt/achei-meu-lar-conectado.git
```

### 2. Navegue até o diretório do projeto

```bash
cd achei-meu-lar-conectado
```

### 3. Instale as dependências

```bash
npm install
# ou
pnpm install
# ou
bun install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
pnpm dev
# ou
bun dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta se 5173 estiver em uso).

## 📁 Estrutura do Projeto

```
achei-meu-lar-conectado/
├── public/                 # Arquivos estáticos
├── src/                   # Código fonte
│   ├── components/        # Componentes React
│   ├── pages/            # Páginas da aplicação
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Funções utilitárias
│   ├── styles/          # Estilos globais
│   └── types/            # Definições TypeScript
├── .gitignore
├── components.json       # Configuração shadcn/ui
├── eslint.config.js      # Configuração ESLint
├── index.html
├── package.json
├── postcss.config.js     # Configuração PostCSS
├── tailwind.config.ts    # Configuração Tailwind
├── tsconfig.json         # Configuração TypeScript
└── vite.config.ts        # Configuração Vite
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção

# Preview
npm run preview      # Preview do build de produção

# Lint
npm run lint         # Executa o linter
```

## 🌐 Deploy

### Deploy com Lovable

Este projeto foi criado com [Lovable](https://lovable.dev). Para fazer deploy:

1. Acesse o projeto no Lovable
2. Clique em **Share → Publish**
3. Siga as instruções para configurar o domínio

### Deploy Manual

#### Vercel

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm run build
# Faça upload da pasta 'dist' para Netlify
```

#### Outros Provedores

O projeto gera uma build estática na pasta `dist` que pode ser hospedada em qualquer serviço de hospedagem estática.

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (se necessário):

```env
VITE_API_URL=your_api_url_here
```

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

**Cláudio Leite**

- LinkedIn: [@claudioleite02](https://www.linkedin.com/in/claudioleite02/)
- GitHub: [@Claudiolitt](https://github.com/Claudiolitt)
- Email: claudio.leite_@live.com

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) - Por componentes incríveis
- [Vite](https://vitejs.dev/) - Por uma experiência de desenvolvimento excepcional
- [Tailwind CSS](https://tailwindcss.com/) - Por um framework CSS poderoso
- [Lovable](https://lovable.dev/) - Por facilitar o desenvolvimento

## 📊 Estatísticas do Projeto

![GitHub stars](https://img.shields.io/github/stars/Claudiolitt/achei-meu-lar-conectado?style=social)
![GitHub forks](https://img.shields.io/github/forks/Claudiolitt/achei-meu-lar-conectado?style=social)
![GitHub issues](https://img.shields.io/github/issues/Claudiolitt/achei-meu-lar-conectado)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Claudiolitt/achei-meu-lar-conectado)

---

⭐️ Se este projeto foi útil para você, considere dar uma estrela!

