# Backend WeFit

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de desenvolvedor Backend na WeFit. O desafio consistia na criação de uma api que fornece as opções de cadastro, listagem, atualização e exclusão de um cliente (Customer) utilizando as tecnologias Node, TypeScript e Prisma.

## Instruções de Execução

Para executar o projeto, siga os passos abaixo:

- Clone o repositório: `git clone https://github.com/gustavo-evaristo/wefit-backend.git`
- Instale as dependências: `npm install` ou `yarn`
- Inicie o container MySQL: `docker-compose up -d`
- Inicie a aplicação: `npm start` ou `yarn start`
- A aplicação estará disponível em `http://localhost:3000` e o banco de dados em `http://localhost:3306`.

## Estrutura do Projeto

A estrutura do projeto segue as melhores práticas de organização de pastas, o projeto foi desenvolvido seguindo os padrões do DDD. Os principais diretórios são:

- src: Contém o código-fonte da aplicação.
- prisma: Migrations e schema do banco de dados.
- core: Arquivos globais da api.
- domain: Contem as entidades, objetos de valores, mensagens de erro e repositorios do dominio de Customer.
- infra: Camada responsável por armazenar toda a parte de infraestrutura, endpoints http da api e os repositorios que se conectam com o banco de dados.
- test: Responsável por disponibilizar entidades e repositorios de teste.
- use-cases: Disponibiliza todos os casos de uso que nossa api precisa.

## Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias e bibliotecas:

- Node
- TypeScript
- Express
- Prisma
- Zod
- Jest

## Como testar

### Testes com jest

Para testar a api basta executar o comando `npm run test` ou `yarn test` e aguardar a execução dos testes automatizados.

### Endpoints

Na raiz do projeto existe um arquivo `insomnia.json` que pode ser importado para realizar os testes da api atravez do aplicativo insomnia.

A aplicação possui os seguintes endpoints:

- `POST => http://localhost:3000`: Realiza a criação de um novo customer.

JSON de exemplo

```json
{
  "name": "Gustavo Evaristo",
  "email": "gug.henri1@gmail.com",
  "phone": "5511970256279",
  "cellPhone": "5511970256279",
  "cpf": "56768654071",
  "cnpj": "93236453000100",
  "type": "NATURAL_PERSON",
  "zipCode": "03112090",
  "state": "SP",
  "city": "São Paulo",
  "district": "Vila Perus",
  "street": "Rua Alcantara Machado",
  "number": "220",
  "complement": "apartamento 120"
}
```

- `GET => http://localhost:3000`: Lista todos os customers criados.

- `GET => http://localhost:3000/:id`: Busca um customer pelo `id` enviado.

- `PUT => http://localhost:3000`: Atualiza os dados de um customer.

JSON de exemplo

```json
{
  "id": "d8f03907-7f9f-4a92-b6e6-27a171e16e83",
  "name": "Gustavo Evaristo",
  "email": "gug.henri1@gmail.com",
  "phone": "5511970256279",
  "cellPhone": "5511970256279",
  "cpf": "56768654071",
  "cnpj": "93236453000100",
  "type": "NATURAL_PERSON",
  "zipCode": "03112090",
  "state": "SP",
  "city": "São Paulo",
  "district": "Vila Perus",
  "street": "Rua Alcantara Machado",
  "number": "220",
  "complement": "apartamento 120"
}
```

- `DELETE => http://localhost:3000/:id`: Remove um customer.

## Considerações finais

A api foi desenvolvida seguindo as boas praticas de código e design patterns. A utilização de testes foi essencial no desenvolvimento para garantir a consistencia e validações de todas as entidades, casos de uso e funcionalidades da aplicação. Os endppoints que recebem dados do cliente também possuem schemas de validação, permitindo validar os dados recebidos antes de prosseguir com a requisição.

Também optei por incluir um arquivo yaml para realizar a validação do código de forma automatizada com o github actions, toda vez que realizo alguma alteração no código, o script é executado validando se as novas alterações estão de acordo com o lint style do projeto e verificando se os testes unitarios também estão funcionando.
