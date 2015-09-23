var chat=app.controller('UserlistController',function($scope,$state,$stateParams,socket,$sanitize,$ionicScrollDelegate,$timeout) {
	console.log('asdasdas');
	var self=this;
  	var typing = false;
  	var lastTypingTime;
  	var TYPING_TIMER_LENGTH = 400;

	socket.on('connect',function(){
		//Add user
  		socket.emit('add user', $stateParams.nickname);
  		// On login display welcome message
  	  	socket.on('login', function (data) {
  	  		console.log('htl');
	    	//Set the value of connected flag
	    	self.connected = true
	    	//self.number_message = message_string(data.numUsers)
	  	});
		// Whenever the server emits 'user joined', log it in the chat body
		socket.on('user joined', function (data) {
			console.log(data);
			console.log('asdadasd');
			$scope.usernames = data.usernames;
	  		//addMessageToList("",false,message_string(data.numUsers)) 
	  	});
	});

	$scope.gotoChat = function(username){
		console.log(username);
		$state.go('chat',{nickname:username})
	};
});