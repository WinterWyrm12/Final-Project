# Final-Project Concert Planner API

A REST API for concert planning.
This API allows users to manage users, artists, setlists, events, and RSVPs.

## Features
- User, Artist, Event, SetList, and RSVP registration and authentication
- JWT-based authentication
- CRUD operations

## Authentication and User Roles
- user: can view events, artists, setlists, and RSVPs
- artist: can manage setlists, and view artist only endpoints
- admin: can manage events, artists, setlists, etc. (full access)

### Authentication Note
- For authorization, follow the following format for the header tab when using Postman: "Bearer <JWT_TOKEN>"

## API Endpoints and Examples
#### USERS
- POST  | /users    | Create a new user
- GET   | /users    | Get all users
- GET   | /users/:id    | Get a user by ID
- PUT   | /users/:id    | Update a user
- DELETE   | /users/:id    | Delete a user

##### Example POST:
{
    "name": "John",
    "email": "John@example.com",
    "password": "password123"
}

#### Artist
- POST  | /artists    | Create a new artist
- GET   | /artists    | Get all artists
- GET   | /artists/:id    | Get an artist by ID
- PUT   | /artists/:id    | Update an artist
- DELETE   | /artists/:id    | Delete an artist

##### Example POST:
{
    "name": "Silk Sonic",
    "genre": "R&B"
}

#### Events
- POST  | /events    | Create a new event
- GET   | /events    | Get all events
- GET   | /events/:id    | Get a event by ID
- PUT   | /events/:id    | Update a event
- DELETE   | /events/:id    | Delete a event

##### Example POST:
{
    "title": "Cochella",
    "venue": "Diamond Square",
    "date": "12-01-2025"
    "genre": "HipHop",
    "userId": 1
}

#### SetLists
- POST  | /setLists    | Create a new setList
- GET   | /setLists    | Get all setLists
- GET   | /setLists/:id    | Get a setList by ID
- PUT   | /setLists/:id    | Update a setList
- DELETE   | /setLists/:id    | Delete a setList

##### Example POST:
{
    "eventId": 1,
    "artistId": 1,
    "songs": "Song1, Song2, Song3"
}

#### RSVPs
- POST  | /rsvps    | Create a new rsvp
- GET   | /rsvps    | Get all rsvps
- GET   | /rsvps/:id    | Get a rsvp by ID
- PUT   | /rsvps/:id    | Update a rsvp
- DELETE   | /rsvps/:id    | Delete a rsvp

##### Example POST:
{
    "userId": 1,
    "eventId": 2,
    "status": "attending"
}

#### Login
- POST  | /login    | Logs in User

##### Example POST:
{
    "email": "example@example.com",
    "password": "password123"
}

#### Logout
- POST  | /logout   | Logs out User

### Environmental Variables
- DB_TYPE = sqlite
- DB_NAME = concerts.db 
- PORT = 3000
- JWT_SECRET = super-long-random-secret-key
- JWT_EXPIRES_IN = 24h

### Setup
1. Clone the repository
2. Install the dependencies
3. Create a .env file in the root folder
4. Run the server using: node server.js
The API will be running at http://localhost:3000

### Other Links
- [Postman Collection](https://documenter.getpostman.com/view/49875616/2sB3dTsTKC)
- [Render Deployment](https://final-project-f73u.onrender.com)