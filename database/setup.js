const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

// Initialize database connection
const db = new Sequelize({
    dialect: process.env.DB_TYPE,
    storage: `database/${process.env.DB_NAME}`,
    logging: false
});

// Some apis put their models here, mine are in the models folder so I need to load them here
const artist = require("./models/artist")(db, DataTypes);
const event = require("./models/event")(db, DataTypes);
const rsvp = require("./models/rsvp")(db, DataTypes);
const setList = require("./models/setList")(db, DataTypes);
const user = require("./models/user")(db, DataTypes);

// Define relationships
/* one-to-many */
//user - events
user.hasMany(event, {foreignKey: "userId", as: "events"});
event.belongsTo(user, {foreignKey: "userId", as: "owner"});

// user - rsvps
user.hasMany(rsvp, {foreignKey: "userId", as: "rsvps"});
rsvp.belongsTo(user, {foreignKey: "userId"});

// event - rsvps
event.hasMany(rsvp, {foreignKey: "eventId", as: "rsvps"});
rsvp.belongsTo(event, {foreignKey: "evemtId"});

// event - setlists
event.hasMany(setList, {foreignKey: "eventId", as: "setLists"});
setList.belongsTo(event, {foreignKey: "eventid"});

// artist - setlists
artist.hasMany(setList, {foreignKey: "artistId", as: "setLists"});
setList.belongsTo(artist, {foreignKey: "artistId"});

/* many-to-many */
// artist - events
artist.belongsToMany(event, {through: "eventArtists", as: "events", foreignKey: "artistId"});
event.belongsToMany(artist, {through: "eventArtists", as: "artists", foreignKey: "eventId"});

// Initialize database
async function initializeDatabase(){
    try {
        await db.sync({force:false});
        console.log("Database sync succussful.");
    } catch (error) {
        console.error("Unable to connect to database.", error);
    }
};

initializeDatabase();

// export modules
module.exports={Sequelize, user, event, artist, setList, rsvp};