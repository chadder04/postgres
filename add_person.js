const pg = require("pg");
const settings = require("./settings");

function connectDB(settings, cb) {

    const knex = require('knex')({
        client: 'pg',
        connection: {
            host: settings.hostname,
            user: settings.user,
            password: settings.password,
            database: settings.database
        }
    });

    cb(knex);

}

let first_name = process.argv[2];
let last_name = process.argv[3];
let birthdate = process.argv[4];

connectDB(settings, (client) => {
    console.log('Adding user to database..');
    console.log(`Input provided: ${first_name} :: ${last_name} :: ${birthdate}`);
    // lookupName(client, name, (result) => {
    //     console.log(`Found ${result.length} person(s) by the name of '${name}':`);
    //     result.forEach(printResult);
    // });
});

