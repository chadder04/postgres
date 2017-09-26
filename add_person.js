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

function insertPerson(client, fname, lname, dob, cb) {
    client('famous_people').insert({
        first_name: fname,
        last_name: lname,
        birthdate: dob
       }).then(function (response) {
        cb(response);
       });
}

let first_name = process.argv[2];
let last_name = process.argv[3];
let birthdate = process.argv[4];

connectDB(settings, (client) => {
    console.log('Adding user to database..');
    insertPerson(client, first_name, last_name, birthdate, (result) => {
        console.log(` : User added successfully..`);
    });
    client.destroy();
});

