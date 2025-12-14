const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// import the databases
const {db, user, setList, rsvp, event, artist} = require("./database/setup");

// middleware
app.use(express.json());
// logging - logs the date of CRUD methods
app.use((req, res, next) => {
    console.log(`${req.method} - ${new Date().toISOString()}`);
    next();
});
app.use(cors());

// Authentication
function requireAuth(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader||!authHeader.startsWith("Bearer")){
        return res.status(401).json({error:"No token provided."});
    }
    const token = authHeader.substring(7);
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role
        };
        next();
    } catch (error){
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({error:"Token has expired."});
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token." });
        } else {
            return res.status(401).json({ error: "Token verification failed." });
        }
    }
};

// Role Athorization
function requireArtist(req,res,next){
    if (!req.user){
        return res.status(401).json({error: "Authentication required."})
    }
    if (req.user.role === "artist" || req.user.role === "admin"){
        next();
    } else {
        return res.status(401).json({error: "Access denied, artist role or higher required."});
    }
};

function requireAdmin(req,res,next){
    if (!req.user){
        return res.status(401).json({error: "Authentication required."})
    }
    if (req.user.role === "admin"){
        next();
    } else {
        return res.status(401).json({error: "Access denied, admin role required."});
    }
};

/* CRUD Routes */
// User - CREATE
app.post("/users", async(req, res)=>{
    try {
        const {name, email, password } = req.body;
        if (!name || !email || !password){
        return res.status(400).json({error: "Name, email, adn password are required."});
        }
        const existing =  await user.findOne({ where: {email}}); 
        if (existing) {
            return res.status(400).json({error: "User with this email already exists."});
        }

        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(password, saltRounds);

        const newUser = await user.create({name, email, password: hashedPass});
        res.status(201).json({message: "User registered successfully", newUser});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// User - GET ALL
app.get("/users", requireAuth, async(req, res)=>{
    try{
        const users = await user.findAll({
            // hides passwords
            attributes: {exclude: ["password"]}
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve users."});
    }
});

// User - GET ONE
app.get("/users/:id", requireAuth, async(req,res)=>{
    try{
        // hide passwords
        const foundUser = await user.findByPk(req.params.id, {
            attributes: {exclude: ["password"]}
        });
        if (!foundUser){
            return res.status(404).json({error: "User not found."});
        }
        res.json(foundUser);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve user."});
    }
});

// User - UPDATE
app.put("/users/:id", requireAuth, async(req,res)=>{
    try{
        const foundUser = await user.findByPk(req.params.id);
        if (!foundUser){
            return res.status(404).json({error: "User not found."});
        }
        if (req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        await foundUser.update(req.body);
        res.json(foundUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// User - DELETE
app.delete("/users/:id", requireAuth, async (req,res)=>{
    try{
        const deleted = await user.destroy({where: {id: req.params.id}});
        if (!deleted){
            return res.status(404).json({error: "User not found."});
        }
        res.json({message: "User deleted succussfully."});
    } catch (error) {
        res.status(500).json({error: "Failed to delete user."});
    }
});

// -------------------- //

// Artist - CREATE
app.post("/artists", requireAuth, requireArtist, async(req, res)=>{
    try{
        const newArtist = await artist.create(req.body);
        res.status(201).json(newArtist);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Artist - GET ALL
app.get("/artists", requireAuth, requireArtist, async(req, res)=>{
    try{
        const artists = await artist.findAll();
        res.json(artists);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve artists."});
    }
});

// Artist - GET ONE
app.get("/artists/:id", requireAuth, requireArtist, async(req,res)=>{
    try{
        const foundArtist = await artist.findByPk(req.params.id);
        if (!foundArtist){
            return res.status(404).json({error: "Artist not found."});
        }
        res.json(foundArtist);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve artist."});
    }
});

// Artist - UPDATE
app.put("/artists/:id", requireAuth, requireArtist, async(req,res)=>{
    try{
        const foundArtist = await artist.findByPk(req.params.id);
        if (!foundArtist){
            return res.status(404).json({error: "Artist not found."});
        }
        await foundArtist.update(req.body);
        res.json(foundArtist);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Artist - DELETE
app.delete("/artists/:id", requireAuth, requireArtist, async (req,res)=>{
    try{
        const deleted = await artist.destroy({where: {id: req.params.id}});
        if (!deleted){
            return res.status(404).json({error: "Artist not found."});
        }
        res.json({message: "Artist deleted succussfully."});
    } catch (error) {
        res.status(500).json({error: "Failed to delete artist."});
    }
});

// -------------------- //

// Event - CREATE
app.post("/events", requireAuth, requireAdmin, async(req, res)=>{
    try{
        const newEvent = await event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Event - GET ALL
app.get("/events", requireAuth, requireAdmin, async(req, res)=>{
    try{
        const events = await event.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve events."});
    }
});

// Event - GET ONE
app.get("/events/:id", requireAuth, requireAdmin, async(req,res)=>{
    try{
        const foundEvent = await event.findByPk(req.params.id);
        if (!foundEvent){
            return res.status(404).json({error: "Event not found."});
        }
        res.json(foundEvent);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve event."});
    }
});

// Event - UPDATE
app.put("/events/:id", requireAuth, requireAdmin, async(req,res)=>{
    try{
        const foundEvent = await event.findByPk(req.params.id);
        if (!foundEvent){
            return res.status(404).json({error: "Event not found."});
        }
        await foundEvent.update(req.body);
        res.json(foundEvent);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Event - DELETE
app.delete("/events/:id", requireAuth, requireAdmin, async (req,res)=>{
    try{
        const deleted = await event.destroy({where: {id: req.params.id}});
        if (!deleted){
            return res.status(404).json({error: "Event not found."});
        }
        res.json({message: "Event deleted succussfully."});
    } catch (error) {
        res.status(500).json({error: "Failed to delete event."});
    }
});

// -------------------- //

// SetList - CREATE
app.post("/setLists", requireAuth, requireArtist, async(req, res)=>{
    try{
        const NewSetLists = await setList.create(req.body);
        res.status(201).json(NewSetLists);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// SetList - GET ALL
app.get("/setLists", requireAuth, async(req, res)=>{
    try{
        const setLists = await setList.findAll();
        res.json(setLists);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve setLists."});
    }
});

// SetList - GET ONE
app.get("/setLists/:id", requireAuth, async(req,res)=>{
    try{
        const foundSetList = await setList.findByPk(req.params.id);
        if (!foundSetList){
            return res.status(404).json({error: "SetList not found."});
        }
        res.json(foundSetList);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve setList."});
    }
});

// SetList - UPDATE
app.put("/setLists/:id", requireAuth, requireArtist, async(req,res)=>{
    try{
        const foundSetList = await setList.findByPk(req.params.id);
        if (!foundSetList){
            return res.status(404).json({error: "SetList not found."});
        }
        await foundSetList.update(req.body);
        res.json(foundSetList);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// SetList - DELETE
app.delete("/setLists/:id", requireAuth, requireArtist, async (req,res)=>{
    try{
        const deleted = await setList.destroy({where: {id: req.params.id}});
        if (!deleted){
            return res.status(404).json({error: "SetList not found."});
        }
        res.json({message: "SetList deleted succussfully."});
    } catch (error) {
        res.status(500).json({error: "Failed to delete setList."});
    }
});

// -------------------- //

// Rsvp - CREATE
app.post("/rsvps", requireAuth, async(req, res)=>{
    try{
        const newRsvp = await rsvp.create(req.body);
        res.status(201).json(newRsvp);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Rsvp - GET ALL
app.get("/rsvps", requireAuth, async(req, res)=>{
    try{
        const rsvps = await rsvp.findAll();
        res.json(rsvps);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve rsvps."});
    }
});

// Rsvp - GET ONE
app.get("/rsvps/:id", requireAuth, async(req,res)=>{
    try{
        const foundRsvp = await rsvp.findByPk(req.params.id);
        if (!foundRsvp){
            return res.status(404).json({error: "Rsvp not found."});
        }
        res.json(foundRsvp);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve rsvp."});
    }
});

// Rsvp - UPDATE
app.put("/rsvps/:id", requireAuth, async(req,res)=>{
    try{
        const foundRsvp = await rsvp.findByPk(req.params.id);
        if (!foundRsvp){
            return res.status(404).json({error: "Rsvp not found."});
        }
        await foundRsvp.update(req.body);
        res.json(foundRsvp);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Rsvp - DELETE
app.delete("/rsvps/:id", requireAuth, async (req,res)=>{
    try{
        const deleted = await rsvp.destroy({where: {id: req.params.id}});
        if (!deleted){
            return res.status(404).json({error: "Rsvp not found."});
        }
        res.json({message: "Rsvp deleted succussfully."});
    } catch (error) {
        res.status(500).json({error: "Failed to delete rsvp."});
    }
});

// -------------------- //

// Login EndPoint
app.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const User = await user.findOne({where: {email}});
        if (!User){
            return res.status(401).json({error: "Invalid email or password."});
        }
        const isValid = await bcrypt.compare(password, User.password);
        if (!isValid) {
            return res.status(401).json({error: "Invalid email or password."});
        }

        const token = jwt.sign({
            id: User.id,
            name: User.name,
            email: User.email,
            role: User.role
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN});
        res.json({
            message: "Login successful.",
            token,
            User: {
                id: User.id,
                name: User.name,
                email: User.email,
                role: User.role
            }
        });
    } catch (error) {
        console.error("Error logging in user.", error);
        res.status(500).json({error: "Failed to login"});
    }
});

// -------------------- //

// Logout EndPoint

app.post("/logout", (req,res)=>{
    res.json({message: "Logout successful."});
});

// -------------------- //

// Error handeling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        message: `${req.method} ${req.path} is not a valid endpoint`
    });
});

// Server start
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

// test
module.exports = {app};