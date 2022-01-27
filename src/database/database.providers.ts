import { createConnection } from 'typeorm';
import ormconfig from './ormconfig'



export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(ormconfig),
  },
];