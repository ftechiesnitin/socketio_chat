var chat=app.controller('UserlistController',function($stateParams,socket,$sanitize,$ionicScrollDelegate,$timeout) {
	console.log('asdasdas');
	socket.on('connect',function(){
		// Whenever the server emits 'user joined', log it in the chat body
		socket.on('user joined', function (data) {
			console.log(data);
	  		//addMessageToList("",false,message_string(data.numUsers)) 
	  	});
	});
});