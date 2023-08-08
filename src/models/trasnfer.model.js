const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Transfer = db.define('trasfer', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    senderUserId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receiverUserId: {
      type: DataTypes.STRING,
      allowNull: false
    },
});

module.exports = Transfer;