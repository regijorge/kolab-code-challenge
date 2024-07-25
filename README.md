# Kolab Code Challenge

## Instruções
### Instale as dependencias
```
yarn install
```

### Instale o container para o banco de dados
```
docker-compose up -d
```

### Execute a migração do banco de dados
```
yarn migration:run
```

### Execute o seed de usuários
```
yarn seed:user
```

### Execute o projeto
```
yarn start
```

## Tecnologias usadas
- NodeJS
- NestJS
- TypeORM
- PostgreSQL
- Docker
- Docker Compose
- Swagger
- Typescript

## Débitos técnicos
- O campo password não está sendo criptografado, sendo salvo como playtext. Podendo-se usar a lib <code>bcrypt</code>
- Não foi implementada uma validação de usuários duplicados
- Não foi implementado um teste de integração para a API
- Não foram implementados testes unitários
- Existem alguns débitos técnicos com relação a tipagem
