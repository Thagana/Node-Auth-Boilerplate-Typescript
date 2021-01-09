import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface SkillsAttributes {
    id: number;
    skill: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface SkillsModel extends Model<SkillsAttributes>, SkillsAttributes {}
export class Skills extends Model<SkillsModel, SkillsAttributes> {}

export type SkillsStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SkillsModel;
};

export function SkillsFactory(sequelize: Sequelize): SkillsStatic {
    return <SkillsStatic>sequelize.define('skills', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        skill: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });
}
