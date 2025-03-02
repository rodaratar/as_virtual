function start() {
    if (annyang) {
        annyang.setLanguage("es-MX")
        annyang.start({ autoRestart: true, continuous: false }); 
        console.log("Listening...")
        annyang.addCommands(comandos);
        annyang.debug()
        document.getElementById("btn").style.display = "none"   
}
}

let bandera = false;
annyang.addCallback('soundstart', function () {
    if (!bandera){
        document.getElementById("all2").style.display="block"
        setTimeout(() => {
            voz('Bienvenido de nuevo, señor')
            bandera = true;
        }, 1000);
    }
    console.log("sound detected")
});

annyang.addCallback('result', function () {
    console.log('sound stopped');
});


const comandos = {
    // SALUDO

    "hola": function () {
        voz("hola, cual es tu nombre?");
        //Guarda el nombre que le decimos por voz.
        annyang.addCallback("result", function (phrases) {
        //Para el evento result.
        annyang.removeCallback('result');
        //Nos dice hola + el nombre que le digamos por voz.
        voz("Hola, " + phrases[0] +"un gusto conocerte");
    });
    },

    "okey Lucy": () => {
        voz("Bienvenido de nuevo, señor");
    },

    "hey Lucy": () => {
        voz("Bienvenido de nuevo, señor");
    },

    "Buenos días Lucy": () => {
        voz("Buenos dias, señor");
    },

    "Buenas tardes Lucy": () => {
        voz("Buenas tardes, señor");
    },

    "Buenas noches Lucy": () => {
        voz("Buenas noches, señor");
    },

    // DESPEDIDA

    "Hasta mañana Lucy": () => {
        voz("Hasta mañana, señor");
        annyang.abort()
    },

    "Hasta luego Lucy": () => {
        voz("Hasta luego, señor");
        annyang.abort()
    },

    "Adios Lucy": () => {
        voz("Hasta luego, señor");
        annyang.abort()
    },

    "apágate Lucy": () => {
        voz('ok, hasta luego, señor')
        annyang.abort();
    },

    "apágate por *tiempo minutos": tiempo => {
        voz('ok, vuelvo en' + tiempo + 'minutos');
        annyang.abort();
        setTimeout(() => {
            annyang.start();
            voz('Hola, he vuelto, ¿me extrañaste?')
        }, tiempo * 60000);
    },

    // PREGUNTAS

    "qué hora es": () => {
        var date = new Date;
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        voz('señor, son las ' + strTime)
    },

    "quién te creo": () => {
        voz("El desarrolador rodman araoz tarco");
    },

    "qué eres": () => {
        voz("soy una asistente virtual");
    },

    "cuál es tu nombre": () => {
        voz("mi nombre es Lucy");
    },

    "qué fecha es hoy": () => {
        var date = new Date;
        var mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
        voz("hoy es " + date.getDate() + " de "+ mes[date.getMonth()] + "del" + date.getFullYear());
    },

    "qué día es hoy": () => {
        var date = new Date;
        var dia = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
        voz("hoy es "+ dia[date.getDay()-1]);
    },

    // ORDENES

    "cuéntame un chiste": () => {
        var chistes = ["¿Por qué las focas del circo miran siempre hacia arriba?, Porque es donde están los focos",
            "¡Estás obsesionado con la comida!, No sé a que te refieres croquetamente",
            "¿Por qué estás hablando con esas zapatillas?, Porque pone converse",
            "¿Sabes cómo se queda un mago después de comer?, magordito",
            "Me da un café con leche corto, Se me ha roto la máquina, cambio",
            "¡Camarero! Este filete tiene muchos nervios, Normal, es la primera vez que se lo comen",
            "Hola, ¿está Agustín?, No, estoy incomodín",
            "¿Cuál es la fruta más divertida?, la naranja ja ja", 
            "Por qué las focas del circo miran siempre hacia arriba?   Porque es donde están los focos.",
            "Estas obsesionado con la comida!   No se a que te refieres croquetamente.",
            "Por que estás hablando con esas zapatillas?   Porque pone converse",
            "Buenos dias, me gustaria alquilar Batman Forever.   No es posible, tiene que devolverla tumorrou."];

        var ran = Math.floor(Math.random() * chistes.length);
        voz(chistes[ran])
    },

    "quiero un numero": () => {
        var numero = ["uno","dos","tres","cuatro", "cinco", "seis", "siete", "ocho", "nueve", "dies"];

        var ran = Math.floor(Math.random() * numero.length);
        voz(numero[ran])
    },

    "reiniciate": () => {
        voz("entendido");
        location.reload();
    },

    "limpia la consola": () => {
        voz("entendido");
        console.clear();
    },

    "busca *busqueda": busqueda => {
        voz("ok, buscando " + busqueda +" para ti");
        window.open("https://www.google.com/search?q=" + busqueda)
    },

    "escuchar *busqueda": busqueda => {
        voz("ok, buscando " + busqueda + "para ti");
        window.open("https://radiosperu.net/"+ busqueda)
    },

    "abrir *busqueda": busqueda => {
        voz("ok, buscando " + busqueda + "para ti");
        window.open("https://web.facebook.com/"+ busqueda)
    },

    "quiero escuchar *busqueda": busqueda => {
        voz("ok, buscando " + busqueda + "para ti");
        window.open("https://www.youtube.com/results?search_query=" + busqueda)
    },


    'man' : function() {
      alert("man");
    },



    "llama al *telefono": telefono => {
        voz("ok, con gusto llamando al" + telefono);
        window.open("tel:" + telefono)
    },

    "di *frase": frase => {
        voz(frase);
    },
    "escribe *dicto": dicto =>{
        document.getElementById("text").innerHTML = dicto;
    },

    // AMABILIDAD

    "gracias": () => {
        voz("Para servirte");
    },

    "ulala": () => {
        voz('Me hace sonrojar, señor')
    },

    "Cómo estás": () => {
        voz('mejor que ayer, espero que usted tambien lo esté, señor')
    },

    "Te presento a *nombre": nombre => {
        voz("Hola" + nombre +", mi nombre es Lucy, es un placer conocerte");
    },

    // LLAMADA A LA ACCIÓN
    
    "Lucy": () => {
        voz("aquí estoy, señor");
    },

    "Hey": () => {
        voz("aquí estoy, señor");
    },


    "Me puedes ayudar": () => {
        voz("claro que sí");
    },

    "Oye": () => {
        voz("aquí estoy, señor");
    },

    "Estás ahí": () => {
        voz("aquí estoy, señor");
    }

}

function voz(texto) {
    document.getElementById("all2").style.visibility = "hidden";
    var textoAEscuchar = texto;
    var mensaje = new SpeechSynthesisUtterance();
    mensaje.text = textoAEscuchar;
    mensaje.volume = 1;
    mensaje.rate = 0.9;
    mensaje.pitch = 1;
    // ¡Parla!
    document.getElementById("all").style.visibility = "visible";
    setTimeout(() => {
        document.getElementById("all").style.visibility = "hidden";  
        document.getElementById("all2").style.visibility = "visible";      
    }, 4000);
    speechSynthesis.speak(mensaje);
}
