const fs = require('fs');
let users = JSON.parse(fs.readFileSync('public/db/users.json').toLocaleString());

function isExecption(login,pass){
    console.log(login,pass);
    let wanring_login = false;
    let warning_pass = false;
    // console.log(login,pass);
    if(login == null || login == '' || typeof(login) != 'string'){
        wanring_login = true;
        return 'ERR LOG'
    }
    if(pass == null || pass == '' || typeof(pass) == 'object' || typeof(pass) == 'boolean'){
        warning_pass = true;
        return 'ERR PASS'
    }
    if(wanring_login || warning_pass){
        return 'Not found'
    }else if(warning_pass == false && wanring_login == false){
        let find = false;
        
        for(let user in users){
            // console.log(user,login,users[user].pass,pass);
            if(user == login && users[user].pass == pass){
                find = true;
                return {exist:true,Login:user,pass:users[user].pass}
            }
        }

        if(find == false){
            return {exist:false,log:'Not found'}
        }
    }
    
    
}
// isExecption(true,'nicki4');
// isExecption(123,'nicki4');
// isExecption({name:"dfgdf"},'nicki4');
// isExecption('','nicki4');

// isExecption("nicki",true);
// isExecption('nicki4',123);
// isExecption('nicki4',{name:"dfgdf"});
// isExecption('nicki4','');


// let output = isExecption('admin','nicki4');
// console.log(output);

// let query = 'Name=asdasd&Password=1234';

function whatOnQuery(bodyQuery){
    // console.log(bodyQuery);
    let output = {};
    let temp = '';
    let temp_2 = [];
    for(let i =0; i < bodyQuery.length;i++){
        
        if(bodyQuery[i] == '=' || bodyQuery[i] == '&'){
            temp_2.push(temp);
            temp = '';
        }else if(i == bodyQuery.length - 1){
            temp+= bodyQuery[i];
            temp_2.push(temp);
            temp = '';
        }
        else{
            temp+= bodyQuery[i];
        }

        
    }
    // console.log(temp_2);
    for(let i =0; i < temp_2.length;i+=2){
        output[`${temp_2[i]}`] = temp_2[i+1];

    }
    // console.log(output);
    return output;
}
function MakeNewUser(login,name,pass){
    let warning_pass = false;
    let wanring_login = false;
    if(login == null || login == '' || typeof(login) != 'string'){
        wanring_login = true;
        return 'ERR LOG'
    }
    if(pass == null || pass == '' || typeof(pass) == 'object' || typeof(pass) == 'boolean'){
        warning_pass = true;
        return 'ERR PASS'
    }
    if(wanring_login == false && warning_pass == false){
        // console.log(users);
        users[login] = {pass:pass,name:name};
        // console.log(users);
        fs.writeFileSync('public/db/users.json',JSON.stringify(users));
        return 'CREATED';
    }
    
}
function makeNewRecordOnUser(login,record,data){
    console.log(login,record,data);
    //  in future make test 
    users[login][record] = data;
        // console.log(users);
    fs.writeFileSync('public/db/users.json',JSON.stringify(users));
    return 'CREATED';
}
// makeNewRecordOnUser('lololo2','superSecret','mur');

// MakeNewUser('fris','armya','65656$3s');
// whatOnQuery(query);
module.exports = {
    FindOnDB:isExecption,
    MakeAsObj:whatOnQuery,
    registerNewUser:MakeNewUser,
    AddNewData:makeNewRecordOnUser
}