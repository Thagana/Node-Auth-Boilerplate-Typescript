import * as sequelize from 'sequelize';
import { UserFactory } from './user-model';
import { SkillsFactory } from './skill-model';

export const dbConfig = new sequelize.Sequelize(process.env.DB_NAME || 'storage', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
    port: Number(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    }
});

export const User = UserFactory(dbConfig);
export const Skills = SkillsFactory(dbConfig);
