const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PORT = process.env.PORT || 3000;

// import the databases
const {db, user, setList, rsvp, event, artist} = require("./database/setup");

// middleware
app.use(express.json());

/* CRUD Routes */
// User - CREATE
app.post("/users", async(req, res)=>{
    try{
        const newUser = await user.create(req,body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// User - GET ALL
app.get("/users", async(req, res)=>{
    try{
        const newUser = await user.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: "Failed to retrive users."});
    }
});

// User - GET ONE
app.get("/users/:id", async(req,res)=>{
    try{
        const foundUser = await user.findByPk(req.params.id);
        if (!foundUser){
            return res.status(404).json({error: "User not found."});
        }
        res.json(foundUser);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve user."});
    }
});

// User - UPDATE
app.put("/users/:id", async(req,res)=>{
    try{
        const foundUser = await user.findByPk(req.params.id);
        if (!foundUser){
            return res.status(404).json({error: "User not found."});
        }
        await foundUser.update(req.body);
        res.json(foundUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// User - DELETE
app.delete("/users/:id", async (req,res)=>{
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
app.post("/artists", async(req, res)=>{
    try{
        const newArtist = await artist.create(req,body);
        res.status(201).json(newArtist);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Artist - GET ALL
app.get("/artists", async(req, res)=>{
    try{
        const newArtist = await artist.findAll();
        res.json(artists);
    } catch (error) {
        res.status(500).json({error: "Failed to retrive artists."});
    }
});

// Artist - GET ONE
app.get("/artists/:id", async(req,res)=>{
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
app.put("/artists/:id", async(req,res)=>{
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
app.delete("/artists/:id", async (req,res)=>{
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
app.post("/events", async(req, res)=>{
    try{
        const newEvent = await event.create(req,body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Event - GET ALL
app.get("/events", async(req, res)=>{
    try{
        const newEvent = await event.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({error: "Failed to retrive events."});
    }
});

// Event - GET ONE
app.get("/events/:id", async(req,res)=>{
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
app.put("/events/:id", async(req,res)=>{
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
app.delete("/events/:id", async (req,res)=>{
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
app.post("/setLists", async(req, res)=>{
    try{
        const NewSetLists = await setList.create(req,body);
        res.status(201).json(NewSetLists);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// SetList - GET ALL
app.get("/setLists", async(req, res)=>{
    try{
        const NewSetLists = await setList.findAll();
        res.json(setLists);
    } catch (error) {
        res.status(500).json({error: "Failed to retrive setLists."});
    }
});

// SetList - GET ONE
app.get("/setLists/:id", async(req,res)=>{
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
app.put("/setLists/:id", async(req,res)=>{
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
app.delete("/setLists/:id", async (req,res)=>{
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
app.post("/rsvps", async(req, res)=>{
    try{
        const newRsvp = await rsvp.create(req,body);
        res.status(201).json(newRsvp);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Rsvp - GET ALL
app.get("/rsvps", async(req, res)=>{
    try{
        const newRsvp = await rsvp.findAll();
        res.json(rsvps);
    } catch (error) {
        res.status(500).json({error: "Failed to retrive rsvps."});
    }
});

// Rsvp - GET ONE
app.get("/rsvps/:id", async(req,res)=>{
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
app.put("/rsvps/:id", async(req,res)=>{
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
app.delete("/rsvps/:id", async (req,res)=>{
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