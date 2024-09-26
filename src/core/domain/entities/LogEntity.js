import Sequelize from 'sequelize';

import db from '../../../config/DataBaseConfig.js';

const LogEntity = db.sequelize.define('LogEntity',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        request: {
            type: Sequelize.JSONB,
            allowNull: false
        },
        response: {
            type: Sequelize.JSONB,
            allowNull: false
        },
        service: {
            type: Sequelize.ENUM,
            values: ['ROADMAP', 'CARTA_DE_MOTIVACAO', 'VAGAS'],
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'tb_log',
        timestamps: false
    }
);

export default LogEntity;
