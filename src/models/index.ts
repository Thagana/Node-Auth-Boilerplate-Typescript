import * as sequelize from 'sequelize';
import { UserFactory } from './user-model';
import { SkillsFactory } from './skill-model';

export const dbConfig = new sequelize.Sequelize((process.env.DB_NAME = 'db-name'), (process.env.DB_USER = 'db-user'), (process.env.DB_PASSWORD = 'db-password'), {
    port: Number(process.env.DB_PORT) || 54320,
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

// Users have skills then lets create that relationship

User.hasMany(Skills);

// or instead of that, maybe many users have many skills
Skills.belongsToMany(User, { through: 'users_have_skills' });

// the skill is the limit!
