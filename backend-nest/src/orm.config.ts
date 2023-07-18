import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgresTypeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'mypassword',
  port: 5432,
  host: '127.0.0.1',
  database: 'todos',
  entities: [],
  name: 'pgConnection',
  synchronize: true,
  logging: true,
};