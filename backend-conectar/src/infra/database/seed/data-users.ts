import { Role } from '@application/enums/role.enum';
import { passwordHash } from '@infra/utils/password-hash.util';

export const users = async () => {
  return [
    {
      name: 'Jander Nery',
      email: 'jander@test.com',
      password: await passwordHash('123456'),
      role: Role.Admin,
    },
    {
      name: 'Ana Souza',
      email: 'ana@test.com',
      password: await passwordHash('123456'),
      role: Role.Admin,
    },
    {
      name: 'Carlos Lima',
      email: 'carlos@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Marina Dias',
      email: 'marina@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Luciana Alves',
      email: 'luciana1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Ricardo Gomes',
      email: 'ricardo1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Patrícia Silva',
      email: 'patricia1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Bruno Martins',
      email: 'bruno1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Juliana Torres',
      email: 'juliana1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Thiago Rocha',
      email: 'thiago1@test.com',
      password: await passwordHash('123456'),
      role: Role.Admin,
    },
    {
      name: 'Amanda Duarte',
      email: 'amanda1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Fernando Reis',
      email: 'fernando1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Letícia Costa',
      email: 'leticia1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Vinícius Andrade',
      email: 'vinicius1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Carla Lopes',
      email: 'carla1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Diego Oliveira',
      email: 'diego1@test.com',
      password: await passwordHash('123456'),
      role: Role.Admin,
    },
    {
      name: 'Renata Melo',
      email: 'renata1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Lucas Azevedo',
      email: 'lucas1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Paula Fernandes',
      email: 'paula1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Igor Teixeira',
      email: 'igor1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Camila Ribeiro',
      email: 'camila1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Gustavo Ferreira',
      email: 'gustavo1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Larissa Matos',
      email: 'larissa1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Rafael Cunha',
      email: 'rafael1@test.com',
      password: await passwordHash('123456'),
      role: Role.Admin,
    },
    {
      name: 'Isabela Prado',
      email: 'isabela1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Daniela Pires',
      email: 'daniela1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Eduardo Lins',
      email: 'eduardo1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Beatriz Moura',
      email: 'beatriz1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
    {
      name: 'Felipe Mendes',
      email: 'felipe1@test.com',
      password: await passwordHash('123456'),
      role: Role.Admin,
    },
    {
      name: 'Sandra Vieira',
      email: 'sandra1@test.com',
      password: await passwordHash('123456'),
      role: Role.User,
    },
  ];
};
