var myApp = new Framework7({
    pushState: true,
    pushStateSeparator: '',
    material: true,
    materialRipple: true,
    swipePanel: 'left',
    uniqueHistory: true,
});
var myApp = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'HLAppUser',
    // App id
    id: 'com.aplios.hlappuser',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
        {
            path: '/index/',
            url: 'index.html',
        },
        {
            path: '/evento/',
            url: 'evento.html',
        },
        {
            path: '/consola/',
            url: 'consola.html',
        },
    ],
    // ... other parameters
});

// VARIABLES GLOBALES
var $$ = Dom7;
var conectado;
var nombreUsuario;
var loggedin = false;

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="evento"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    e.preventDefault();
    console.log('evento');
    var page = e.detail.page;

    console.log(device);

    console.log('estamos logueado');

    socket.on('coloresHorizontal', (data) => {
        var t = JSON.parse(JSON.stringify(data));
        var animacion = eval('(' + t.data + ')');
        console.log(animacion);
        //console.log(eval('(' + t.data + ')'));
        animacion.forEach(function(obj){
            if(obj.usu === nombreUsuario && nombreUsuario !== 10){
                document.getElementById("ejem1").style.backgroundColor = obj.color;
                $("#titulo").fadeOut();
            }
        });

    });

    socket.on('coloresvertical', (data) => {
        var t = JSON.parse(JSON.stringify(data));
        var animacion = eval('(' + t.data + ')');
        console.log(animacion);
        //console.log(eval('(' + t.data + ')'));
        animacion.forEach(function(obj){
            if(obj.usu === nombreUsuario && nombreUsuario !== 10){
                document.getElementById("ejem1").style.backgroundColor = obj.color;
                $("#titulo").fadeOut();
            }
        });
    });

    socket.on('desconectado', () => {
        console.log('desconectado');
        $("#titulo").fadeIn();
        if (nombreUsuario) {
            socket.emit('ingreso usuario', nombreUsuario);
        }
    });

    socket.on('reconnect_error', () => {
        $("#titulo").fadeIn();
        console.log('intentar reconectar ha fallado!');
    });
});

$$(document).on('page:init', '.page[data-name="consola"]', function (e) {

    console.log('consola');
    var page = e.detail.page;
    var intervaloH = null;
    var intervaloV = null;

    console.log(device);
    $("#iniciarAnimacionHorizontal").on('click', function(){
        console.log('iniciando animacion');
        intervaloH = setInterval(function(){
            setTimeout(function(){
                socket.emit('horizontal', 2, 0);
            }, 700);

            setTimeout(function(){
                socket.emit('horizontal', 2, 1);

            }, 1400);

            setTimeout(function(){
                socket.emit('horizontal', 2, 2);
            }, 2100);
        }, 2800);
    });

    $("#terminarAnimacionHorizontal").on('click', function(){
        $("#ejem1").css('background', '#ffffff');
        console.log('terminando animacion');
        clearInterval(intervaloH);
        intervaloH = null;

    });

    $("#iniciarAnimacionVertical").on('click', function(){
        console.log('iniciando animacion');
        intervaloV = setInterval(function(){
            setTimeout(function(){
                socket.emit('vertical', 2, 0);
            }, 700);

            setTimeout(function(){
                socket.emit('vertical', 2, 1);

            }, 1400);

            setTimeout(function(){
                socket.emit('vertical', 2, 2);
            }, 2100);
        }, 2800);
    });

    $("#terminarAnimacionVertical").on('click', function(){
        console.log('terminando animacion');
        clearInterval(intervaloV);
        intervaloV = null;
        $("#ejem1").css('background', 'transparent');
    });

    $("#amarillo").on('click', function(){
        console.log('iniciando amarillo');
        socket.emit('horizontal', 1, 0);
        socket.emit('horizontal', 1, 0);
        socket.emit('horizontal', 1, 0);
    });

    $("#azul").on('click', function(){
        console.log('iniciando azul');
        socket.emit('horizontal', 1, 2);
        socket.emit('horizontal', 1, 2);
        socket.emit('horizontal', 1, 2);
    });

    $("#rojo").on('click', function(){
        console.log('iniciando rojo');
        socket.emit('horizontal', 1, 1);
        socket.emit('horizontal', 1, 1);
        socket.emit('horizontal', 1, 1);
    });

    $("#bandera").on('click', function(){
        console.log('iniciando bandera');
        setTimeout(function(){
            socket.emit('horizontal', 1, 0);
        }, 700);

        setTimeout(function(){
            socket.emit('horizontal', 1, 2);

        }, 1400);

        setTimeout(function(){
            socket.emit('cordova', 1, 1);
        }, 2100);
    });
})


var mainView = myApp.views.create('.view-main');

$( document ).ready(function() {
    $(window).load(function() {
        document.addEventListener("deviceready",this.onDeviceReady.bind(this),false);
    });
});

var onDeviceReady = function() {
    console.log('arrancando');
}

var socket = io('http://HumanLeds.mybluemix.net:80');

console.log(socket);

function entrar(localidad){
    socket.emit('add user', localidad);

    socket.on('ingrese', (data) => {

        var recibido = JSON.parse(JSON.stringify(data));
        console.log(recibido.username);
        var dataRecibida = JSON.parse(recibido.data);
        console.log(dataRecibida);
        conectado = true;
        nombreUsuario = data.username;
        loggedin = true;

        if(recibido.nombreUsuario == 10){

        }
    });
}

