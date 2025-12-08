const { DataTypes, Sequelize, STRING } = require("sequelize");

module.exports = (Sequelize, DataTypes)=>{
    const setList = Sequelize.define(
        "SetList",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            eventId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            artistId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            // look into JSON Stringify for formatting of songs
            songs: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }
    );
    return setList;
};