const request = require("supertest");
const app = require("../server");
const {db, user, artist, event, setList, rsvp } = require("../database/setup");

//resets the database before the tests are run
beforeAll(async () => {
    await db.sync({force:true});
});

describe("concert planner api test", () => {
    /* Users */
    // Create
    test("create new user", async () => {
        const res = await request(app).post("/users").send({ name: "John", email: "John@example.com", password: "passoword123"});
        expect(res.statusCode).toBe(201);
    });
    // Get all
    test("display all users", async ()=>{
        const res = await request(app).get("/users");
        //200 is successful
        expect(res.statusCode).toBe(200);
    });
    // Update
    test("update a user", async ()=>{
        const res = (await request(app).put("/users/1")).send({name: "Johnny"});
        expect(res.statusCode).toBe(200);
    });
    // Delete
    test("delete a user", async ()=>{
        const res = await request(app).delete("/users/1");
        expect(res.statusCode).toBe(200);
    });

    /* Artists */
    // Create
    test("create new artist", async () => {
        const res = await request(app).post("/artists").send({ name: "Michael Jackson", genre: "Rock"});
        expect(res.statusCode).toBe(201);
    });
    // Get all
    test("display all artists", async ()=>{
        const res = await request(app).get("/artists");
        expect(res.statusCode).toBe(200);
    });
    // Update
    test("update an artist", async ()=>{
        const res = (await request(app).put("/artists/1")).send({genre: "Pop"});
        expect(res.statusCode).toBe(200);
    });
    // Delete
    test("delete an artist", async ()=>{
        const res = await request(app).delete("/artist/1");
        expect(res.statusCode).toBe(200);
    });

    /* Events */
    // Create
    test("create new event", async () => {
        const res = await request(app).post("/events").send({ title: "Cochella", venue: "the Diamond", date: "12-01-2025", genre: "Hiphop"});
        expect(res.statusCode).toBe(201);
    });
    // Get all
    test("display all events", async ()=>{
        const res = await request(app).get("/events");
        expect(res.statusCode).toBe(200);
    });
    // Update
    test("update an event", async ()=>{
        const res = (await request(app).put("/events/1")).send({title: "Eezy Bowl"});
        expect(res.statusCode).toBe(200);
    });
    // Delete
    test("delete an evemt", async ()=>{
        const res = await request(app).delete("/events/1");
        expect(res.statusCode).toBe(200);
    });

    /* SetList */
    // Create
    test("create new setlist", async () => {
        const res = await request(app).post("/setLists").send({ eventId: 1, artistId: 2, songs: "Song1, Song2"});
        expect(res.statusCode).toBe(201);
    });
    // Get all
    test("display all setlists", async ()=>{
        const res = await request(app).get("/setLists");
        expect(res.statusCode).toBe(200);
    });
    // Update
    test("update a setList", async ()=>{
        const res = (await request(app).put("/setList/1")).send({songs: "Song1, Song2, Song3"});
        expect(res.statusCode).toBe(200);
    });
    // Delete
    test("delete an setlist", async ()=>{
        const res = await request(app).delete("/setLists/1");
        expect(res.statusCode).toBe(200);
    });

    /* RSVP */
    // Create
    test("create new rsvp", async () => {
        const res = await request(app).post("/rsvps").send({ userid: 1, eventId: 2, status: "attending"});
        expect(res.statusCode).toBe(201);
    });
    // Get all
    test("display all rsvps", async ()=>{
        const res = await request(app).get("/rsvps");
        expect(res.statusCode).toBe(200);
    });
    // Update
    test("update a rsvp", async ()=>{
        const res = (await request(app).put("/rsvps/1")).send({status: "cancelled"});
        expect(res.statusCode).toBe(200);
    });
    // Delete
    test("delete a rsvp", async ()=>{
        const res = await request(app).delete("/rsvps/1");
        expect(res.statusCode).toBe(200);
    });
});