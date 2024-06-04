var num = document.getElementById("searchbar") ;
var bottone = document.getElementById("bottone") ;
var insert = document.getElementById("insert") ;
var j = document.getElementById("j");
var nome = document.getElementById("nome") ;
var sub = document.getElementById("sub") ;

setInterval(function(){ //funzione per il fuoco sulla barra input
    num.focus();
},100);

function setCookie(name, value, expires) { //per impostare il cookie
    let expiresString = "";
    if (expires) {
        expiresString = "; expires=" + expires.toUTCString();
    }
    document.cookie = name + "=" + value + expiresString + "; path=/";
}

function changeContent(codice, callback) { //call ajax
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    };
    xhttp.open("GET", "https://corsproxy.io/?https%3A%2F%2Fmail.elesa.com%2Fmensa%2Ftest.php%3Fbadge%3D"+codice, true);
    xhttp.send();
  }

function getMidnight() { //per avere la mezzanotte in orario UTC quindi 2 ore in meno rispetto la nostra
    const now = new Date();
    const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0, 0
    );
    return midnight;
}

const expiresAtMidnight = getMidnight(); //variabile contenente la mezzanotte UTC

document.addEventListener("keydown",invio); //funzione per attivare il button anche se si schiaccia invio
function invio(event){
    switch(event.key){
        case "Enter": verifica();
    }
}

function getCookie(name) { //prendo il valore del cookie
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function trovacodice(name) { //vedo se un codice è già presente fra i cookie
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if((c.substring(0,nameEQ.length)) == nameEQ) return true;
    }
    return null;
}

function dopoRitardo() { //faccio tornare la pagina standard
    j.style.backgroundColor="rgb(255, 215, 82)";
    nome.textContent = "";
    sub.textContent = "";
    num.style.display = "";
    bottone.style.display = "";
    insert.style.display = "";
}

function verde(nomeuser, codice){ //schermata quando viene registrato il pasto di un utente
    j.style.backgroundColor="green";
    setCookie(codice, "true", expiresAtMidnight);
    nome.textContent = nomeuser;
    sub.textContent = "pasto registrato!";
    num.style.display = "none";
    bottone.style.display = "none";
    insert.style.display = "none";
}

function giallo(nomeuser){ //schermata quando il pasto di un utente è già stato registrato
    j.style.backgroundColor="yellow";
    nome.textContent = nomeuser;
    sub.textContent = "il tuo pasto è già stato registrato.";
    num.style.display = 'none';
    bottone.style.display = 'none'; 
    insert.style.display = 'none';
}

function rosso(){ //schermata quando l'utente è inesistente
    j.style.backgroundColor="red";
    nome.textContent = "utente non esistente";
    num.style.display = 'none';
    bottone.style.display = 'none';
    insert.style.display = 'none';
}

function verifica(){ //quando viene inserito il codice e viene premuto invio, verifica il codice
    var codice = num.value;
    num.value = "";
    changeContent(codice, function(response) {
        var jj=response.substring(0,1);
        if(jj!="#"){
            if(trovacodice(codice)==true && getCookie(codice)=="true"){
                giallo(response);
                setTimeout(dopoRitardo, 2500);
            }else if(trovacodice(codice)==null || (trovacodice(codice)==true && getCookie(codice)=="false")){
                verde(response, codice);
                setTimeout(dopoRitardo, 2500);
            }
        }else{
            rosso();
            setTimeout(dopoRitardo, 2500);
        }
    });
}
