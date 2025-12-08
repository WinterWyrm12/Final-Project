const { Sequelize, DataTypes } = require("sequelize");

module.exports=(Sequelize, DataTypes)=>{
    const artist = Sequelize.define(
        "Artist",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey:true
            },
            name: {
                type: DataTypes.STRING,
                allowNull:false
            },
            genre:{
                type:DataTypes.STRING,
                allowNull:false
            }
        }
    );
    return artist;
};