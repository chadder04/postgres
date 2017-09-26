const pg = require("pg");
const settings = require("./settings");

function connectDB(settings, cb) {

    const client = new pg.Client({
        user:       settings.user,
        password:   settings.password,
        database:   settings.database,
        host:       settings.hostname,
        port:       settings.port,
        ssl:        settings.ssl
    });

    client.connect((err) => {
        if (err) {
            return console.error("Connection Error", err);
        }
        console.log('Connected..');
        cb(client, err);
    });

}

function lookupName(client, name, cb) {
    client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [name], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        cb(result);
        client.end();
    });
}

let name = process.argv[2];

connectDB(settings, (client, err) => {
    console.log('Searching..');
    lookupName(client, name, (result) => {
        console.log(`Found ${result.rowCount} person(s) by the name of '${name}':`);
        for (key in result.rows) {
            console.log(`${result.rows[key].first_name}`);
        }
    });
});

