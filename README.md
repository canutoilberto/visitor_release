# Aplicação de Agendamento de Visitas

Este projeto é uma aplicação web para o gerenciamento de agendamentos de visitas em uma empresa. Construída com ReactJS, ShadcnUI, Zustand e Firebase, a aplicação permite cadastrar, visualizar e excluir agendamentos, além de realizar filtros para facilitar a busca por visitas específicas.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Funcionalidades

- `Cadastro de Visitas`: Permite o registro de novas visitas com informações detalhadas como data, horário, visitante, contato e responsável.
- `Visualização de Agendamentos`: Exibe todos os agendamentos cadastrados em uma tabela e em uma visualização de cartões para dispositivos móveis.
- `Exclusão de Visitas`: Possibilita a exclusão de agendamentos com confirmação através de um modal de confirmação.
- `Filtros de Busca`: Oferece filtros para buscar visitas por nome do visitante, responsável, e intervalo de datas.
- `Troca de Tema`: Suporta alternância entre temas claro e escuro.

## Tecnologias

- **Frontend:**
  - [ReactJS](https://reactjs.org/)
  - [ShadcnUI](https://ui.shadcn.com/)
  - [Zustand](https://github.com/pmndrs/zustand)
  - [Firebase](https://firebase.google.com/)

### - Backend:

- Firebase Firestore para armazenamento e manipulação dos dados.

## Arquitetura

### Componentes Principais

- `Schedules.jsx`: Componente responsável pela visualização e gerenciamento dos agendamentos. Permite visualizar, filtrar, detalhar e excluir visitas.
- `DeleteModal.jsx`: Modal para confirmação de exclusão de um agendamento.
- `DetailsModal.jsx`: Modal para exibição dos detalhes de um agendamento.

### Gerenciador de Estado (Zustand)

Utiliza Zustand para gerenciamento do estado da aplicação, incluindo dados dos formulários e temas.

#### Principais Funções:

- `fetchSchedules`: Busca os agendamentos do Firestore.
- `submitForm`: Envia dados do formulário para o Firestore e valida o e-mail e a duplicidade de agendamentos.
- `deleteSchedule`: Remove um agendamento do Firestore.
- `toggleTheme`: Alterna entre os temas claro e escuro.

## Funções de Banco de Dados

- `submitFormToFirestore`: Adiciona um novo agendamento à coleção "schedules" no Firestore.
- `getSchedulesFromFirestore`: Recupera todos os agendamentos da coleção "schedules" no Firestore.
- `deleteScheduleFromFirestore`: Remove um agendamento específico da coleção "schedules" no Firestore.

# Instalação

1. Clone o Repositório:

```
 git clone https://github.com/usuario/repo.git
```

2. Navegue até o Diretório do Projeto:

```
 cd repo
```

3. Instale as Dependências:

```
 npm install
```

4. Configuração do Firebase:

- Crie um arquivo firebaseConfig.js no diretório api com as credenciais do Firebase:

```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
```

## Uso

1. Inicie o Servidor de Desenvolvimento:

```
 npm run dev
```

2. Acesse a Aplicação:
   Abra o navegador e vá para `http://localhost:3000`.

3. Funcionalidades:

- Cadastrar Visitas: Acesse a página inicial e use o botão "Nova Visita" para adicionar um novo agendamento.
- Visualizar e Filtrar: Utilize os filtros para buscar visitas e visualize os agendamentos em formato de tabela ou cartões.
- Excluir e Detalhar: Clique nos botões de "Detalhes" e "Excluir" para gerenciar os agendamentos.

# Contribuição

### Sinta-se à vontade para contribuir com melhorias! Para isso:

1. Fork o Repositório.

2. Crie uma Branch para sua Feature:

```
git checkout -b minha-feature
```

3. Faça as Alterações e Commit:

```
git commit -am 'Adiciona nova feature'
```

4. Push para o Repositório:

```
git push origin minha-feature
```

5. Abra um Pull Request.

# Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
