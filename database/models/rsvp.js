const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes)=>{
    const rsvp = Sequelize.define(
        "RSVP",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            eventId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            //use ENUM for specific options for the status
            status: {
                type: DataTypes.ENUM("attending", "interested", "absent"),
                allowNull: false,
                defaultValue: "interested"
            }
        }
    );
    return rsvp;
};