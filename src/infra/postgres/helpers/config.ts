import { type ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'silly.db.elephantsql.com',
  port: 5432,
  username: 'szhmeyze',
  password: '7WyaM5h8uoVh8aoqxSMNYFhMyl2zcuzm',
  database: 'szhmeyze',
  entities: ['dist/infra/postgres/entities/index.js']
}
