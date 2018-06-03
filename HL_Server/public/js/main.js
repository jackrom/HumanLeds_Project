$(function() {
  // VARIABLES GLOBALES
  var $home = $('.home.page');
  var $evento = $('.evento.page');
  var $consola = $('.consola.page');
  var conectado;
  var nombreUsuario;
  var loggedin = false;
  var socket = io();



    $("#1").click(function() {
      entrar(1);
    });
    $("#2").click(function() {
      entrar(2);
    });
    $("#3").click(function() {
      entrar(3);
    });
    $("#4").click(function() {
      entrar(4);
    });
    $("#5").click(function() {
      entrar(5);
    });
    $("#6").click(function() {
      entrar(6);
    });
    $("#7").click(function() {
      entrar(7);
    });
    $("#8").click(function() {
      entrar(8);
    });
    $("#9").click(function() {
      entrar(9);
    });

    //admin
    $("#10").click(function() {
      entrar(10);
    });

  // Option 2. Using live 'page:init' event handlers for each page
  console.log('estamos logueado');
  socket.on('coloresHorizontal', (data) => {
    var t = JSON.parse(JSON.stringify(data));
    var animacion = eval('(' + t.data + ')');
    console.log(animacion);
    //console.log(eval('(' + t.data + ')'));
    animacion.forEach(function(obj) {
      if (obj.usu === nombreUsuario && nombreUsuario !== 10) {
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
    animacion.forEach(function(obj) {
      if (obj.usu === nombreUsuario && nombreUsuario !== 10) {
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

  var intervaloH = null;
  var intervaloV = null;

  $("#iniciarAnimacionHorizontal").on('click', function() {
    console.log('iniciando animacion');
    intervaloH = setInterval(function() {
      setTimeout(function() {
        socket.emit('horizontal', 2, 0);
      }, 700);

      setTimeout(function() {
        socket.emit('horizontal', 2, 1);

      }, 1400);

      setTimeout(function() {
        socket.emit('horizontal', 2, 2);
      }, 2100);
    }, 2800);
  });

  $("#terminarAnimacionHorizontal").on('click', function() {
    $("#ejem1").css('background', '#ffffff');
    console.log('terminando animacion');
    clearInterval(intervaloH);
    intervaloH = null;

  });

  $("#iniciarAnimacionVertical").on('click', function() {
    console.log('iniciando animacion');
    intervaloV = setInterval(function() {
      setTimeout(function() {
        socket.emit('vertical', 2, 0);
      }, 700);

      setTimeout(function() {
        socket.emit('vertical', 2, 1);

      }, 1400);

      setTimeout(function() {
        socket.emit('vertical', 2, 2);
      }, 2100);
    }, 2800);
  });

  $("#terminarAnimacionVertical").on('click', function() {
    console.log('terminando animacion');
    clearInterval(intervaloV);
    intervaloV = null;
    $("#ejem1").css('background', 'transparent');
  });

  console.log(socket);

  function entrar(localidad) {
      $home.fadeOut();
      $home.off('click');
      if (localidad === 10) {
        $consola.show();
      } else {
        $evento.show();
      }
    socket.emit('add user', localidad);
    socket.on('ingrese', (data) => {

      var recibido = JSON.parse(JSON.stringify(data));
      console.log(recibido.username);
      var dataRecibida = JSON.parse(recibido.data);
      console.log(dataRecibida);
      conectado = true;
      nombreUsuario = data.username;
      loggedin = true;

      if (recibido.nombreUsuario == 10) {

      }
    });
  }
});
