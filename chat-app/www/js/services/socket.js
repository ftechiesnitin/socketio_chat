app.factory('socket',function(socketFactory){
        //Create socket and connect to http://chat.socket.io 
         var myIoSocket = io.connect('http://n2.transparent.sg:4500/');

          mySocket = socketFactory({
            ioSocket: myIoSocket
          });

        return mySocket;
    })