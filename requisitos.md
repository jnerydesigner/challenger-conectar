# Requisitos Funcionais e Não Funcionais

## Requisitos Funcionais

### Autenticação
- [ ] Registrar novos usuários em `/auth/register`
- [ ] Autenticar usuários via `/auth/login` utilizando JWT
- [ ] Login social opcional com Google ou Microsoft

### Gerenciamento de Usuários
- [ ] Criar, visualizar, editar e excluir usuários
- [ ] Administradores podem listar e excluir qualquer usuário
- [ ] Usuários regulares podem apenas ver/editar seus próprios dados

### Filtros e Ordenação
- [ ] Filtro por papel do usuário (`?role=admin`)
- [ ] Ordenação por nome ou data (`?sortBy=name&order=asc`)

### Notificações
- [ ] Listar usuários inativos (sem login nos últimos 30 dias)

## Requisitos do Frontend

### Interface
- [ ] Tela de login
- [ ] Tela de cadastro
- [ ] Tela de listagem de usuários (apenas admins)
- [ ] Tela de perfil (usuários comuns)
- [ ] Responsividade

## Requisitos Não Funcionais

- [ ] Segurança contra XSS, SQL Injection
- [ ] Criptografia de senhas
- [ ] Arquitetura modular e escalável
- [ ] Documentação com Swagger
- [ ] Testes automatizados com Jest
- [ ] Interface intuitiva e responsiva
