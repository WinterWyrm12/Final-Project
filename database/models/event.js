const { DataTypes, Sequelize, STRING } = require("sequelize");

module.exports=(Sequelize, DataTypes)=>{
    const event = Sequelize.define(
        "Event",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true
            },
            title: {
                type: DataTypes.STRING,
                allowNull:false
            },
            venue: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull:false
            },
            genre: {
                type: DataTypes.STRING,
                allowNull:false
            }
        }
    );
    return event;
};