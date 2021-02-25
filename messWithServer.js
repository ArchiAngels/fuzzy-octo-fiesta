

function SendToServer(obj){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/test');
    xhr.send(JSON.stringify(obj));

    let a = setInterval(() => {
        // console.log(xhr.readyState,' ',xhr.responseText,xhr.response,xhr.status,xhr.statusText);
        if(xhr.readyState == 4 && xhr.statusText == 'OK' && xhr.status == 200){
            console.log(xhr.responseText);
            document.body.innerHTML += xhr.responseText;
            clearInterval(a);
            a = null;
        }
    }, 150);
    a;

}