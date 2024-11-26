'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Task, {
        through: 'TaskTag',
        foreignKey: 'TagId',
        otherKey: 'TaskId'
      })
    }
  }


  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedTo: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Tag',
      tableName: 'Tags'
    }
  );

  return Tag;
};