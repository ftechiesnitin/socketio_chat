var chat=app.controller('ChatController',function($scope,$stateParams,socket,$sanitize,$ionicScrollDelegate,$timeout) {
  	
  	var self=this;
  	var typing = false;
  	var lastTypingTime;
  	var TYPING_TIMER_LENGTH = 400;
  	
  	//Add colors
  	var COLORS = [
	    '#e21400', '#91580f', '#f8a700', '#f78b00',
	    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
	    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
	  ];

	 //initializing messages array
	self.messages = []
  if($stateParams.username != 'admin'){
    //Add user
    socket.emit('add user', $stateParams.username);
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
  }
	socket.on('private'+$stateParams.username, function (data) {
		console.log(data);
		if(data.message&&data.username){
 			addMessageToList(data.username,true,data.message)
 		}
    var input = document.getElementById("message");
    input.value = '';
	});
//   	socket.on('connect',function(){
//   		/*// /socket.emit('new_user', {username: $stateParams.nickname});
//   		connected = true
//   	 	console.log('connected');
//   		//Add user
//   		socket.emit('add user', $stateParams.nickname);

//   	  	// On login display welcome message
//   	  	socket.on('login', function (data) {
// 	    	//Set the value of connected flag
// 	    	self.connected = true
// 	    	self.number_message= message_string(data.numUsers)
// 	  	});
// */
// 	  	// Whenever the server emits 'new message', update the chat body
// 	  	socket.on('private'+$stateParams.username, function (data) {
// 	  		console.log(data);
// 	  		/*if(data.message&&data.username){
// 	   			addMessageToList(data.username,true,data.message)
// 	   		}*/
// 	  	});

// 		// Whenever the server emits 'user joined', log it in the chat body
// 		/*socket.on('user joined', function (data) {
// 			addMessageToList("",false,data.username + " joined")
// 	  		addMessageToList("",false,message_string(data.numUsers)) 
// 	  	});

// 	  	// Whenever the server emits 'user left', log it in the chat body
// 	  	socket.on('user left', function (data) {
// 	    	addMessageToList("",false,data.username+" left")
// 	    	addMessageToList("",false,message_string(data.numUsers))
// 	  	});

// 	  	//Whenever the server emits 'typing', show the typing message
// 	  	socket.on('typing', function (data) {
// 	    	addChatTyping(data);
// 	  	});

// 	  	// Whenever the server emits 'stop typing', kill the typing message
// 	  	socket.on('stop typing', function (data) {
// 	    	removeChatTyping(data.username);
// 	  	});	*/
//   	})

  	//function called when user hits the send button
  	$scope.sendMessage=function(){
  		var data ={
  			message: this.message,
  			nickname: $stateParams.nickname,
  			username: $stateParams.username
  		}
  		socket.emit('new message', data)
  		addMessageToList($stateParams.username,true,this.message)
  		/*socket.emit('stop typing');
  		self.message = ""*/
  	}

  	//function called on Input Change
  	// self.updateTyping=function(){
  	// 	sendUpdateTyping()
  	// }

  	// Display message by adding it to the message list
  	function addMessageToList(username,style_type,message){
  		console.log(username)
  		username = $sanitize(username)
  		removeChatTyping(username)
  		var color = style_type ? getUsernameColor(username) : null
  		self.messages.push({content:$sanitize(message),style:style_type,username:username,color:color})
  		$ionicScrollDelegate.scrollBottom();
  	}

  	//Generate color for the same user.
  	function getUsernameColor (username) {
	    // Compute hash code
	    var hash = 7;
	    for (var i = 0; i < username.length; i++) {
	       hash = username.charCodeAt(i) + (hash << 5) - hash;
	    }
	    // Calculate color
	    var index = Math.abs(hash % COLORS.length);
	    return COLORS[index];
  	}

  	// Updates the typing event
  	// function sendUpdateTyping(){
  	// 	if(connected){
  	// 		if (!typing) {
		 //        typing = true;
		 //        socket.emit('typing');
		 //    }
  	// 	}
  	// 	lastTypingTime = (new Date()).getTime();
  	// 	$timeout(function () {
	  //       var typingTimer = (new Date()).getTime();
	  //       var timeDiff = typingTimer - lastTypingTime;
	  //       if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
	  //         socket.emit('stop typing');
	  //         typing = false;
	  //       }
   //    	}, TYPING_TIMER_LENGTH)
  	// }

	// Adds the visual chat typing message
	function addChatTyping (data) {
	    addMessageToList(data.username,true," is typing");
	}

	// Removes the visual chat typing message
	function removeChatTyping (username) {
	  	self.messages = self.messages.filter(function(element){return element.username != username || element.content != " is typing"})
	}

  	// Return message string depending on the number of users
  	function message_string(number_of_users)
  	{
  		return number_of_users === 1 ? "there's 1 participant":"there are " + number_of_users + " participants"
  	}
});