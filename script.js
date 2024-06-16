var num = document.getElementById("searchbar") ;
var bottone = document.getElementById("bottone") ;
var insert = document.getElementById("insert") ;
var j = document.getElementById("j");
var nome = document.getElementById("nome") ;
var sub = document.getElementById("sub") ;
var wifi = document.getElementById("wifi") ;
var ospiti = document.getElementById("ospiti");
var piu = document.getElementById("piu");
var meno = document.getElementById("meno");

togli();

setInterval(function(){
    num.focus();
},200);

var rosg = false;
var clicked = false;
var personaatt="";
var inserizione = false;
var contospiti=0;
var tempname = "";
var minusco = false;

function togli(){
    ospiti.style.display = "none";
    piu.style.display = "none";
    meno.style.display = "none";
}

function mostra(){
    if(inserizione==true){
        if(clicked==true){
            if(rosg==false){
                ospiti.style.display = "";
                piu.style.display = "";
                meno.style.display = "";
            }
        }
    }
    
}

var ret="";

function piuu(code){
    if(inserizione==true){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var og = this.responseText.substring(0,1);
                if(og == "#"){
                    ret = this.responseText;
                    minusco = false;
                    piu.style.display = "none";
                    meno.style.display = "none";
                    rossoguest(this.responseText);
                    setTimeout(dopoRitardo, 3500);
                }else{
                    contospiti++;
                    ospiti.textContent = "OSPITI UTENTE " + tempname + ": "  + contospiti;
                    minusco = true;
                }
            }else if (this.readyState == 4 && this.status != 200) st("errore");
        };
        xhttp.open("GET", "webservice.php?badge="+code+"&data_ins="+oggis+"&osp=piu", true);
        xhttp.send();
    }
}

function menoo(code){
    if(inserizione==true){
        if(minusco==true){
            if(contospiti>0) contospiti--;
            ospiti.textContent = "OSPITI UTENTE " + tempname + ": "  + contospiti;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    
                }
            }
            xhttp.open("GET", "webservice.php?badge="+code+"&data_ins="+oggis+"&osp=meno", true);
            xhttp.send();
        }
    }
}


function piuuint(code, expires){
    contospiti++;
    if(inserizione==true){
        let expiresString = "";
        if (expires) {
            expiresString = "; expires=" + expires.toUTCString();
        }
        document.cookie = code + "=" + JSON.stringify({val: 'true', ospiti: contospiti}) + expiresString + "; path=/";
    }
}

function menooint(code, expires){
    if(contospiti>0) contospiti--;
    if(inserizione==true){
        let expiresString = "";
        if (expires) {
            expiresString = "; expires=" + expires.toUTCString();
        }
        document.cookie = code + "=" + JSON.stringify({val: 'true', ospiti: contospiti}) + expiresString + "; path=/";
    }
}


function setCookie(name, value, expires) {
    let expiresString = "";
    if (expires) {
        expiresString = "; expires=" + expires.toUTCString();
    }
    document.cookie = name + "=" + value + expiresString + "; path=/";
}

const og = new Date();
var oggis="";
var giorno = "";
var mese = "";
if(og.getDate()<10) giorno = giorno + "0" + og.getDate();
if(og.getMonth()<10) mese = mese + "0" + (og.getMonth()+1);
oggis= oggis + og.getFullYear() + mese + giorno;

function changeContent(codice, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }else if (this.readyState == 4 && this.status != 200) callback("errore");
    };
    xhttp.open("GET", "webservice.php?badge="+codice+"&data_ins="+oggis, true);
    xhttp.send();
}

function getMidnight() {
    const now = new Date();
    const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0, 0
    );
    return midnight;
}

const expiresAtMidnight = getMidnight();

document.addEventListener("keydown",invio);
function invio(event){
    if (document.activeElement == num) {
        switch(event.key){
            case "Enter": 
                verifica();
                break;
            case "+":
                event.preventDefault();
                clicked=true;
                if (rosg == false) {
                    if (trovacodice("err" + personaatt)) {
                        piuuint("err"+personaatt, expiresAtMidnight);
                    } else {
                        piuu(personaatt);
                    }
                }
                break;
            case "-": 
                event.preventDefault();
                clicked=true;
                if (rosg == false) {
                    if(trovacodice("err"+personaatt)){
                        menooint("err"+personaatt, expiresAtMidnight);
                    } else {
                        menoo(personaatt);
                    }
                }
                break;
            case "e":
            case ".":
            case ",":
                event.preventDefault();
                break;
        }
    }
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function trovacodice(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if((c.substring(0,nameEQ.length)) == nameEQ) {
            return true;
        }
    }
    return false;
}

function dopoRitardo() {
    j.style.backgroundColor="rgb(255, 215, 82)";
    nome.textContent = "";
    sub.textContent = "";
    num.style.display = "";
    bottone.style.display = "";
    insert.style.display = "";
    wifi.style.display = "none";
    if(inserizione==true){
        mostra();
    }
    if(inserizione==false){
        togli();
        clicked=false;
    }
}

function verde(nomeuser, codice){
    j.style.backgroundColor="green";
    setCookie(codice, "true", expiresAtMidnight);
    nome.textContent = nomeuser;
    sub.style.color = "white";
    sub.textContent = "pasto registrato!";
    num.style.display = "none";
    bottone.style.display = "none";
    insert.style.display = "none";
    wifi.style.display = "none";
    togli();
    clicked=false;
    inserizione=true;
    personaatt=codice;
}

function giallo(nomeuser){
    j.style.backgroundColor="yellow";
    nome.textContent = nomeuser;
    sub.style.color = "rgb(0, 110, 255)";
    sub.textContent = "il tuo pasto è già stato registrato.";
    num.style.display = 'none';
    bottone.style.display = 'none'; 
    insert.style.display = 'none';
    wifi.style.display = "none";
    togli();
    clicked=false;
    inserizione=false;
    personaatt="";
}

function rosso(){
    j.style.backgroundColor="red";
    nome.textContent = "utente non esistente";
    num.style.display = 'none';
    bottone.style.display = 'none';
    insert.style.display = 'none';
    togli();
    clicked=false;
    inserizione=false;
    personaatt="";
}

function rossoguest(stampa){
    j.style.backgroundColor="red";
    nome.textContent = stampa;
    num.style.display = 'none';
    bottone.style.display = 'none';
    insert.style.display = 'none';
    clicked=false;
    inserizione=false;
    personaatt="";
    ospiti.textContent = "";
}

function errore(codice){
    j.style.backgroundColor="green";
    setCookie("err"+codice, "true", expiresAtMidnight);
    nome.textContent = "utente numero "+codice;
    sub.style.color = "white";
    sub.textContent = "pasto registrato!";
    num.style.display = "none";
    bottone.style.display = "none";
    insert.style.display = "none";
    wifi.style.display = "inline";
    togli();
    clicked=false;
    inserizione=true;
    personaatt=codice;
}

function verifica(){
    if(num.value != ""){
        var codice = num.value;
        num.value = "";
        changeContent(codice, function(response) {
            if(response=="errore"){
                if(codice=="7654321"){
                    console.log("anto");
                    j.style.backgroundColor="yellow";
                    wifi.style.display = "inline";
                    nome.textContent = "";
                    sub.textContent = "";
                    bottone.style.display = "none";
                    insert.style.display = "none";
                    num.style.display = "none";
                    contospiti=0;
                    tempname = "";
                    inserizione=false;
                    personaatt="";
                    togli();
                    clicked=false;
                    setTimeout(dopoRitardo, 3500);
                }
                if(trovacodice(codice)==false && trovacodice("err"+codice)==false && codice!="7654321"){
                    errore(codice);
                    contospiti=0;
                    tempname=codice;
                    rosg=false;
                    setTimeout(dopoRitardo, 3500);
                }else if((trovacodice(codice)==true || trovacodice("err"+codice)==true) && (getCookie(codice)=="true" || getCookie("err"+codice)=="true") && codice!="7654321"){
                    giallo(codice);
                    contospiti=0;
                    tempname = "";
                    rosg=true;
                    wifi.style.display = "inline";
                    setTimeout(dopoRitardo, 3500);
                }
            }
            if(response!="errore"){
                var jj=response.substring(0,1);
                if((jj=="!") || (trovacodice(codice)==true && getCookie(codice)=="true" || trovacodice("err"+codice)==true && getCookie("err"+codice)=="true")){
                    giallo(response);
                    contospiti=0;
                    tempname = "";
                    sub.textContent = "";
                    rosg=true;
                    setTimeout(dopoRitardo, 3500);
                }
                if((jj!="#") && (jj!="!") && (trovacodice(codice)==false && trovacodice("err"+codice)==false) || (trovacodice(codice)==true && getCookie(codice)=="false") || (trovacodice("err"+codice)==true && getCookie("err"+codice)=="false")){
                    verde(response, codice);
                    contospiti=0;
                    tempname=response;
                    rosg=false;
                    setTimeout(dopoRitardo, 3500);
                }
                if(jj=="#"){
                    rosso();
                    tempname = "";
                    contospiti=0;
                    rosg=true;
                    setTimeout(dopoRitardo, 3500);
                }
            }
        });
    }
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}

setInterval(function(){ 
    let err = "err";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.startsWith(err)) {
            let codice = c.split('=')[0].substring(err.length);
            changeContent(codice, function (response) {
                    if(response!="errore"){
                        var jj=response.substring(0,1);
                        if((jj!="#") && (jj!="!")){
                            deleteCookie("err"+codice);
                            setCookie(codice,"true", expiresAtMidnight);
                        }
                        if(jj=="#"){
                            deleteCookie("err"+codice);
                        }
                    }
                });
            }
        }
    },60000);
