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

function lookupName(client, name, cb) {
    client  
        .select('first_name', 'last_name', 'birthdate').from('famous_people')
        .where('first_name', 'LIKE', name)
        .orWhere('first_name', 'LIKE', name)
        .asCallback(function(err, rows) {
            if (err) { 
                return console.error(err); 
            }
            cb(rows);
        })
        .finally(() => {
            client.destroy();
        });
}

function printResult(item, index) {
    let currentRow = index + 1;
    let birthdate = new Date(item.birthdate);
    let birthdate_string = birthdate.getFullYear() + '-' + birthdate.getMonth() + '-' + birthdate.getDate();
    return console.log(` - ${currentRow}: ${item.first_name} ${item.last_name}, born '${birthdate_string}'`);
}

let name = process.argv[2];

connectDB(settings, (client) => {
    console.log('Searching..');
    lookupName(client, name, (result) => {
        console.log(`Found ${result.length} person(s) by the name of '${name}':`);
        result.forEach(printResult);
    });
});

