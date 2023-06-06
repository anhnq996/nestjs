## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Database Migration
### Make migration
```bash
sequelize-cli migration:generate --name <migration-name>
```
### Run
```bash
sequelize-cli db:migrate
```

### Make seeder
```bash
sequelize-cli seed:generate --name <seeder-name>
```

### Run all seeder
```bash
sequelize-cli db:seed:all
```

### Run one seeder file
```bash
sequelize-cli db:seed --seed <seeder-name>
```