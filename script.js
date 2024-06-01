
var num = document.getElementById("searchbar") ;
var bottone = document.getElementById("bottone") ;
var insert = document.getElementById("insert") ;
var j = document.getElementById("j");
var nome = document.getElementById("nome") ;
var sub = document.getElementById("sub") ;
var persona = new Array();
persona[0]={nome: 'Reda Lazaar', codice: '500928', mangiato: false};
persona[1]={nome: 'Alessio Campiti', codice: '111111', mangiato: false};
persona[2]={nome: 'Mauro Panzeri', codice: '222222', mangiato: false};

addEventListener("keydown",invio);

function invio(event){
    switch(event.key){
        case "Enter": verifica();
    }
}

function dopoRitardo() {
    window.location.href = 'main.html';
}

function scrivisufile(text){
    fs.writeFile("boolean.txt", text, (err) => {
        if (err) {
          console.error("Si è verificato un errore durante la scrittura su file:", err);
          return;
        }
        console.log("Dati scritti con successo su file.");
    });
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
            document.cookie = "username="+persona[i].nome+"; expires=Thu, 18 Dec 2024 12:00:00 UTC";
            setTimeout(dopoRitardo, 2500);
            cont=1;
        }else if(codice==persona[i].codice && persona[i].mangiato==true){
            giallo(persona[i].nome);
            setTimeout(dopoRitardo, 2500);
            cont=1;
        }
    }
    if(cont==0){
        rosso();
        setTimeout(dopoRitardo, 2500);
    }
}