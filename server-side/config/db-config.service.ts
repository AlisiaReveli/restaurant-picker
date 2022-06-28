import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

const configOptions: TypeOrmModuleOptions = {
    type: 'postgres',

    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    autoLoadEntities: Boolean(process.env.TYPEORM_AUTOLOAD_ENTITIES),
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],

    migrationsTableName: 'migration',

    migrations: ['src/migration/*.ts'],
    ssl: false,
};

export { configOptions };
