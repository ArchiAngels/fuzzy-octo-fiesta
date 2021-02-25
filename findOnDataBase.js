const fs = require('fs');

let users = fs.readFileSync('public/db/users.json');

function isExecption(){
    console.log(users);
}
isExecption();