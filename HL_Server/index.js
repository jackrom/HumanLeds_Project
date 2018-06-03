// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
//var io = require('../..')(server);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// funcion de secunecialidad
let objD0 = [
  {"usu": 1,"color": "#ECFF33","tipo": 1,"eve": 0},
  {"usu": 2,"color": "#3348FF","tipo": 2,"eve": 0},
  {"usu": 3,"color": "#FF3333","tipo": 3,"eve": 0},
  {"usu": 4,"color": "#ECFF33","tipo": 1,"eve": 0},
  {"usu": 5,"color": "#3348FF","tipo": 2,"eve": 0},
  {"usu": 6,"color": "#FF3333","tipo": 3,"eve": 0},
  {"usu": 7,"color": "#ECFF33","tipo": 1,"eve": 0},
  {"usu": 8,"color": "#3348FF","tipo": 2,"eve": 0},
  {"usu": 9,"color": "#FF3333","tipo": 3,"eve": 0},
  {"usu": 10,"color": "","tipo": 0,"eve": 0},
];
let objD1 = [
  {"usu": 1,"color": "#ECFF33","tipo": 1,"eve": 0},
  {"usu": 2,"color": "#ECFF33","tipo": 1,"eve": 0},
  {"usu": 3,"color": "#ECFF33","tipo": 1,"eve": 0},
  {"usu": 4,"color": "#3348FF","tipo": 2,"eve": 0},
  {"usu": 5,"color": "#3348FF","tipo": 2,"eve": 0},
  {"usu": 6,"color": "#3348FF","tipo": 2,"eve": 0},
  {"usu": 7,"color": "#FF3333","tipo": 3,"eve": 0},
  {"usu": 8,"color": "#FF3333","tipo": 3,"eve": 0},
  {"usu": 9,"color": "#FF3333","tipo": 3,"eve": 0},
  {"usu": 10,"color": "","tipo": 0,"eve": 0},
];
let objD3 = [
  {"usu": 1,"color": "#FFFFFF","tipo": 1,"eve": 0},
  {"usu": 2,"color": "#FFFFFF","tipo": 1,"eve": 0},
  {"usu": 3,"color": "#FFFFFF","tipo": 1,"eve": 0},
  {"usu": 4,"color": "#FFFFFF","tipo": 2,"eve": 0},
  {"usu": 5,"color": "#FFFFFF","tipo": 2,"eve": 0},
  {"usu": 6,"color": "#FFFFFF","tipo": 2,"eve": 0},
  {"usu": 7,"color": "#FFFFFF","tipo": 3,"eve": 0},
  {"usu": 8,"color": "#FFFFFF","tipo": 3,"eve": 0},
  {"usu": 9,"color": "#FFFFFF","tipo": 3,"eve": 0},
  {"usu": 10,"color": "","tipo": 0,"eve": 0},
];


//eventos

let even0 = function(objD, j, ev) {
  //importante por que no si esto no se hace se reusa eñl objeto que se recibe
  let objx = JSON.parse(JSON.stringify(objD));
  objC = objx;
  switch (ev) {
    case 1:
      for (var i = 0; i < objx.length; i++) {
        switch (objC[i].tipo) {
          case 1:
            // #FF3333, #ECFF33, #3348FF
            if (j === 0) {
              console.log("case 1 j 0 //amarill0")
              objx[i].color = "#ECFF33";//amarillo
            } else if (j === 1) {
              console.log("case 1 j 1 //rojo")
              objx[i].color = "#FF3333";//rojo
            } else if (j === 2) {
              console.log("case 1 j 1 //azul")
              objx[i].color = "#3348FF";//azul
            }

            break;
          case 2:
            if (j === 0) {
              console.log("case 2 j 0 //azul")
              objx[i].color = "#3348FF";//azul
            } else if (j === 1) {
              console.log("case 2 j 1 //amarillo")
              objx[i].color = "#ECFF33";//amarillo
            } else if (j === 2) {
                console.log("case 2 j 2 //rojo")
              objx[i].color = "#FF3333";//rojo
            }

            break;
          case 3:
            // #FF3333, #ECFF33, #3348FF
            if (j === 0) {
              console.log("case 3 j 0 //rojo")
              objx[i].color = "#FF3333";//rojo
            } else if (j === 1) {
              console.log("case 3 j 1 //azul")
              objx[i].color = "#3348FF";//azul
            } else if (j === 2) {
              console.log("case 3 j 2 //amarillo")
              objx[i].color = "#ECFF33";//amarillo
            }
            break;
        }

      }
      return objx;
      break;
    case 2:
      for (var i = 0; i < objx.length; i++) {
        switch (objx[i].tipo) {
          case 1:
            // #FF3333, #ECFF33, #3348FF
            if (j === 0) {
              objx[i].color = "#ECFF33";
            } else if (j === 1) {
              objx[i].color = "#FF3333";
            } else if (j === 2) {
              objx[i].color = "#3348FF";
            }

            break;
          case 2:
            if (j === 0) {
              objx[i].color = "#3348FF";
            } else if (j === 1) {
              objx[i].color = "#ECFF33";
            } else if (j === 2) {
              objx[i].color = "#FF3333";
            }

            break;
          case 3:
            // #FF3333, #ECFF33, #3348FF
            if (j === 0) {
              objx[i].color = "#FF3333";
            } else if (j === 1) {
              objx[i].color = "#3348FF";
            } else if (j === 2) {
              objx[i].color = "#ECFF33";
            }
            break;
        }

      }

      return objx;
      break;
  }

};

io.on('connection', (socket) => {
  // when the client emits 'add user', this listens and executes

  socket.on('add user', (username) => {
    var result = objD0.filter(function(obj) {
      return obj.usu == username;
    });
    console.log("Servidor add user");
    console.log(username);
    socket.username = result[0].usu;
    socket.data = JSON.stringify(result);

    // echo globally (all clients) that a person has connected
    socket.emit('ingrese', {
      username: socket.username,
      data: socket.data
    });

  });

  socket.on('disconnect', function() {
    console.log("me desconecte")
    io.emit('user left', {
      username: socket.username
    });
  });
  socket.on('horizontal', function(eve, val) {
    console.log('horizontal');
    socket.data = JSON.stringify(even0(objD0, val, eve));
    io.emit('coloresHorizontal', {
      data: socket.data
    });
  });
  socket.on('vertical', function(eve, val) {
    console.log('vertical');
    socket.data = JSON.stringify(even0(objD1, val, eve));
    io.emit('coloresvertical', {
      data: socket.data
    });
  });

  socket.on('blanco', function() {
    console.log('blanco');
    socket.data = JSON.stringify(objD3);
    io.emit('colorBlanco', {
      data: socket.data
    });
  });

});
