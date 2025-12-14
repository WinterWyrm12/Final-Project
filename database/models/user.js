const { DataTypes, Sequelize } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const user = Sequelize.define(
        "User",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false
            },

            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "guest",
                validate: {
                    isIn: [['admin', 'artist', 'guest']]
                }
            }
        });
    return user;
};