 app.controller('LoginController',function($state,$sanitize) {
        var self=this;
        self.join=function()
        {
            //sanitize the nickname
            var nickname=$sanitize(self.nickname)
            if(nickname == 'admin'){
                if(nickname)
                {
                    $state.go('user_list',{username:nickname})
                }
            }else{
                if(nickname)
                {
                    $state.go('chat',{username: $stateParams.username, nickname: 'admin'})
                }
            }
        }
    });