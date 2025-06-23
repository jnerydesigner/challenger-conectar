# Sistema de Gerenciamento de Usuários - Conéctar

Este repositório contém uma aplicação full‑stack composta por dois projetos principais:

- **backend-conectar** – API REST construída com [NestJS](https://nestjs.com/) e PostgreSQL para autenticação e gerenciamento de usuários;
- **frontend-conectar** – interface em [Next.js](https://nextjs.org/) para consumir a API.

A autenticação é baseada em JWT e há suporte a login via Google OAuth. A documentação automática da API pode ser acessada em `/api` (Swagger).

## Tecnologias Utilizadas

- Node.js + TypeScript
- NestJS
- Next.js + React
- TailwindCSS
- PostgreSQL (via TypeORM)
- JWT e Bcrypt para autenticação

## Estrutura do Projeto

```
challenger-conectar/
├── backend-conectar/   # código do backend (NestJS)
├── frontend-conectar/  # código do frontend (Next.js)
├── docker-compose.yaml # serviços auxiliares (PostgreSQL)
└── diagramas/          # diagramas PlantUML
```

## Configuração e Execução

1. Suba o banco de dados com Docker:

```bash
docker-compose up -d
```

2. Instale as dependências e execute o backend:

```bash
cd backend-conectar
yarn
# crie um arquivo .env com as variáveis abaixo
yarn start:dev
```

3. Em outro terminal, execute o frontend:

```bash
cd ../frontend-conectar
yarn
yarn dev
```

### Variáveis de Ambiente (backend)

Crie um arquivo `.env` em `backend-conectar` contendo:

```
SERVER_PORT=3333
URL_FRONT_END=http://localhost:3000
JWT_SECRET=uma_chave_segura
DATABASE_HOST_NAME=localhost
POSTGRES_PORT=5448
POSTGRES_USER=root
POSTGRES_PASSWORD=123456
POSTGRES_DB=conectar_db
GOOGLE_OAUTH_CLIENT_ID=<id_do_google>
GOOGLE_OAUTH_SECRET=<segredo_do_google>
GOOGLE_OAUTH_CALLBACK_URL=http://localhost:3333/auth/google/callback
FRONT_URL=http://localhost:3000
```

## Endpoints da API

### Health Check

- `GET /health-check` – Verificação simples de saúde do serviço.

### Autenticação

- `POST /auth/login` – Autentica um usuário via e‑mail e senha. Corpo:
  ```json
  { "username": "email", "password": "senha" }
  ```
- `GET /auth/google/login` – Inicia fluxo de login com Google.
- `GET /auth/google/callback` – Endpoint de callback do Google OAuth.
- `GET /auth/me` – Retorna os dados do usuário autenticado a partir do token.

### Usuários

- `POST /users` – Cria um novo usuário. Corpo (`CreateUserDto`): `name`, `email`, `password`, `role?`.
- `GET /users` – Lista usuários (requer permissão de admin). Query params: `page`, `limit`, `direction`, `field`, `role`.
- `GET /users/:id` – Busca usuário pelo ID.
- `PATCH /users/:id` – Atualiza usuário. Corpo (`UpdateUserDto`).
- `DELETE /users/:id` – Remove usuário pelo ID.

## Diagrama das Funcionalidades

Os arquivos PlantUML em `diagramas/` descrevem fluxos como login, cadastro e atualização de perfil. Utilize qualquer visualizador de PlantUML para abrir os `.puml`.

## Licença

Este projeto é distribuído sob a licença MIT.
