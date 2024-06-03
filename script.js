
var num = document.getElementById("searchbar") ;
var bottone = document.getElementById("bottone") ;
var insert = document.getElementById("insert") ;
var j = document.getElementById("j");
var nome = document.getElementById("nome") ;
var sub = document.getElementById("sub") ;
var persona = new Array();
persona[0]={nome: 'Reda Lazaar', codice: '500928', mangiato: 'false'};
persona[1]={nome: 'Alessio Campiti', codice: '111111', mangiato: 'false'};
persona[2]={nome: 'Mauro Panzeri', codice: '222222', mangiato: 'false'};

function setCookie(name, value, expires) {
    let expiresString = "";
    if (expires) {
        expiresString = "; expires=" + expires.toUTCString();
    }
    document.cookie = name + "=" + value + expiresString + "; path=/";
}

function getMidnight() {
    const now = new Date();
    const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // next day
        0, 0, 0, 0 // set to midnight
    );
    return midnight;
}

const expiresAtMidnight = getMidnight();

for(var i=0;i<persona.length;i++){
        var j="";
        if(persona[i].mangiato=="false"){
            j="false";
        }else j="true";
        setCookie(persona[i].codice, j, expiresAtMidnight);
}

addEventListener("keydown",invio);

function invio(event){
    switch(event.key){
        case "Enter": verifica();
    }
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function dopoRitardo() {
    window.location.href = 'main.html';
}

function verde(nomeuser){
    j.style.backgroundColor="green";
    nomeuser.mangiato=true;
    nome.textContent = nomeuser;
    sub.textContent = "pasto registrato!";
    num.style.display = "none";
    bottone.style.display = "none";
    insert.style.display = "none";
}

function giallo(nomeuser){
    j.style.backgroundColor="yellow";
    nome.textContent = nomeuser;
    sub.textContent = "il tuo pasto è già stato registrato.";
    num.style.display = 'none';
    bottone.style.display = 'none'; 
    insert.style.display = 'none';
}

function rosso(){
    j.style.backgroundColor="red";
    nome.textContent = "utente non esistente";
    num.style.display = 'none';
    bottone.style.display = 'none';
    insert.style.display = 'none';
}

function verifica(){
    var cont=0;
    var codice = num.value;
    num.value = "";
    for(var i=0;i<persona.length;i++){
        if(codice==persona[i].codice && persona[i].mangiato==false){
            verde(persona[i].nome);
            setTimeout(dopoRitardo, 2500);
            cont=1;
            break;
        }else if(codice==persona[i].codice && persona[i].mangiato==true){
            giallo(persona[i].nome);
            setTimeout(dopoRitardo, 2500);
            cont=1;
            break;
        }
    }
    if(cont==0){
        rosso();
        setTimeout(dopoRitardo, 2500);
    }
}
