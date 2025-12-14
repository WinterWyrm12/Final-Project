// **Example date was generated using ChatGPT and edited by me ** //
const bcrypt = require('bcryptjs');
const { db, user, artist, event, setList, rsvp } = require('./setup');

async function seedDatabase() {
    try {
    // Reset database
        await db.sync({ force: true });
        console.log('Database synced.');
        const hashedPass = await bcrypt.hash("password123", 10);

        /* Users */
        const users = await Promise.all([
            user.create({
                name: 'Alice',
                email: 'alice@example.com',
                password: hashedPass,
                role: 'guest'
            }),
            user.create({
                name: 'Bob',
                email: 'bob@example.com',
                password: hashedPass,
                role: 'artist'
            }),
            user.create({
                name: 'Charlie',
                email: 'charlie@example.com',
                password: hashedPass,
                role: 'admin'
            })
        ]);
        console.log('Users created');

        /* Artists */
        const artists = await Promise.all([
            artist.create({
                name: 'The Rolling Stones',
                genre: 'Rock'
            }),
            artist.create({
                name: 'Beyoncé',
                genre: 'Pop'
            }),
            artist.create({
                name: 'Coldplay',
                genre: 'Alternative'
            })
        ]);
        console.log('Artists created');

        /* Events */
        const events = await Promise.all([
            event.create({
                title: 'Summer Fest',
                venue: 'Madison Square Garden',
                date: '2025-08-10',
                genre: 'Pop',
                userId: users[0].id
            }),
            event.create({
                title: 'Rock Night',
                venue: 'Staples Center',
                date: '2025-09-15',
                genre: 'Rock',
                userId: users[1].id
            })
        ]);
        console.log('Events created');

        /* Setlists */
        const setLists = await Promise.all([
            setList.create({
                eventId: events[0].id,
                artistId: artists[1].id,
                songs: 'Song A, Song B, Song C'
            }),
            setList.create({
                eventId: events[1].id,
                artistId: artists[0].id,
                songs: 'Rock Song 1, Rock Song 2'
            })
        ]);
        console.log('SetLists created');

        /* RSVPs */
        const rsvps = await Promise.all([
            rsvp.create({
            userId: users[2].id,
            eventId: events[0].id,
            status: 'attending'
            }),
            rsvp.create({
                userId: users[2].id,
                eventId: events[1].id,
                status: 'interested'
            })
        ]);
        console.log('RSVPs created');

    console.log('Database seeded successfully.');
    process.exit(0);
    } catch (error) {
        console.error('Error seeding database: ', error);
        process.exit(1);
    };
};

seedDatabase();
