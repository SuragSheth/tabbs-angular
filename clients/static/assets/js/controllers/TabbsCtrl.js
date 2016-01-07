app.controller('TabbsChatCtrl', ["$scope", "socket", "tabbsFactory", "$rootScope", function ($scope, socket, tabbsFactory, $rootScope) {

    //destroy listeners
    // $scope.$on('$destroy', function(event){
    //     socket.removeAllListeners();
    // })

    $scope.selfIdUser = $rootScope.user.number;
    $scope.otherIdUser = +000;

    $scope.setOtherId = function (value) {
        $scope.otherIdUser = value;
    };

    var exampleDate = new Date().setTime(new Date().getTime() - 240000 * 60);

    $scope.tabs = [];

    $scope.sendMessage = function (tab, message) {
        var newMessage = {
            "tabb_id": tab.tabb_id,
            "to": tab.title,
            "from": $rootScope.user.number,
            "date": new Date(),
            "content": message,
            //swap IDS for testing other = business, user = user
            "idOther": $scope.selfIdUser,
            "idUser": $scope.otherIdUser
        };

        var current_tabs = _.pluck($scope.tabs, 'title');
        for (t in current_tabs){
            if (current_tabs[t] === tab.title){
                insert_index = t;
                console.log("first index set")
                break
            };
        };


        $scope.tabs[insert_index].chat.push(newMessage);
        console.log("newmessage", newMessage)
        socket.emit("test_new_client", newMessage)

        tabbsFactory.message_to_user($rootScope.user, newMessage, function(data){
            console.log("return from message fact success message", data);
        })
        $scope.business_to_user_message = '';
    };

    //get tabbs/messages after any broadcast
    socket.on("user_to_business", function(data){
        //get stored messages from DB based on incoming user number
        tabbsFactory.all_tabb_messages($rootScope.user, function(data){

            var insert_index;
            var index_set;

            console.log("CHECKKKKK", $scope.tabs.length == 0, data)
            if ($scope.tabs.length == 0){
                $scope.tabs.push({
                        title: data[0].tabb_user_id,
                        content: data[0].tabb_user_id,
                        tabb_id: data[0]._id,
                        chat:[]
                    })
                    console.log("first index set")
                    insert_index = 0;
            } 
            
            for(var tab in data){
                var current_tabs = _.pluck($scope.tabs, 'title');
                if (current_tabs){
                    for ( t in current_tabs){
                        console.log("Found = ", data[tab].tabb_user_id === current_tabs[t]); 
                        if (current_tabs[t] === data[tab].tabb_user_id){
                            insert_index = t;
                            index_set = true;
                            console.log("first index set", insert_index)
                        }
                    }
                }
                if (index_set === false){
                    $scope.tabs.push({
                        title: data[tab].tabb_user_id,
                        content: data[tab].tabb_user_id,
                        tabb_id: data[tab]._id,
                        chat:[]
                    })
                    insert_index = $scope.tabs.length-1;
                    console.log("third index set sonnnnnnnn", insert_index)
                }             
            
                    for(var message in data[tab].messages){
                            console.log("message", data[tab].messages[message].body);
                            // console.log("messages", data.messages[message])
                            var incoming = {
                            "user": "Peter Clark",
                            "avatar": "assets/images/avatar-1.jpg",
                            "to": "Nicole Bell",
                            "date": exampleDate,
                            "content": data[tab].messages[message].body,
                            "idUser": $rootScope.user.number,
                            "idOther": +000
                            }
                    // if the title(phone number) is not in the scope then create a new tab, if it is then
                    // push the messsages into the chat array
                    console.log("MYYYYYYYIHNDEX", insert_index)
                    $scope.tabs[insert_index].chat.push(incoming);
                }
            index_set = false;
            }
        })
    });

    //get messages when controller loads
    tabbsFactory.all_tabb_messages($rootScope.user, function(data){
        var insert_index;
        for(var tab in data){
            $scope.tabs.push({
                title: data[tab].tabb_user_id,
                content: data[tab].tabb_user_id,
                tabb_id: data[tab]._id,
                chat:[]
            })
            for(var message in data[tab].messages){

                var incoming = {
                "user": "Peter Clark",
                "avatar": "assets/images/avatar-1.jpg",
                "to": "Nicole Bell",
                "date": exampleDate,
                "content": data[tab].messages[message].body,
                "idUser": $rootScope.user.number,
                "idOther": +000
                }
            $scope.tabs[tab].chat.push(incoming);
            }
        }
    })
}]);


app.factory('tabbsFactory', function($http){
    var factory = {};

    factory.all_tabb_messages = function(data, callback){
        $http.get('/business_tabbs/'+data.number).success(function(data){
        console.log("business tabs on success", data);
        callback(data);
        })
    }

    factory.message_to_user = function(user, message, callback){
        console.log("inside factory for sending message", user, message);
        $http.post('/send_message_to_user', {rootuser: user, message: message}).success(function(data){
            callback(data);
        })
    }
    return factory;
})
