'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) { }
    }

    Task.init(
        {
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('pending', 'inProgress', 'completed'),
                allowNull: false,
                defaultValue: 'pending',
            },
            assignedTo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('NOW'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('NOW'),
            },
        },
        {
            sequelize,
            modelName: 'Task',
            tableName: 'Tasks',
        }
    );

    return Task;
};
