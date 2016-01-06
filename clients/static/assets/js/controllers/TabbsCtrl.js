app.controller('TabbsChatCtrl', ["$scope", "socket", "tabbsFactory", "$rootScope", function ($scope, socket, tabbsFactory, $rootScope) {
    socket.on("testing_connection", function(data){
        console.log("hello");
    })
    //destroy listeners
    // $scope.$on('$destroy', function(event){
    //     socket.removeAllListeners();
    // })

    $scope.tabs = [{
        title: '1(510)-557-2282',
        content: '1(510)-557-2282',
        chat: [{"user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "Hi, Nicole Whats good nigga",
        "idUser": +15106483326,
        "idOther": +15105572282}]
    }, {
        title: '1(408)-275-2282',
        content: '1(510)-557-2282',
        chat: [{"user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "AYYYYYYY",
        "idUser": +15106483326,
        "idOther": +15105572282}]
    }];


    $scope.selfIdUser = $rootScope.user.number;
    $scope.otherIdUser = +15105572282;


    $scope.setOtherId = function (value) {
        $scope.otherIdUser = value;
    };

    var exampleDate = new Date().setTime(new Date().getTime() - 240000 * 60);


    $scope.chat = [];

    $scope.sendMessage = function () {
        var newMessage = {
            "user": "Peter Clark",
            "avatar": "assets/images/avatar-1.jpg",
            "date": new Date(),
            "content": $scope.chatMessage,
            //swap IDS for testing
            "idOther": $scope.selfIdUser,
            "idUser": $scope.otherIdUser
        };

        $scope.tabs.chat[0].push(newMessage);
        console.log("newmessage", newMessage)
        socket.emit("test_new_client", newMessage)

        $scope.chatMessage = '';

    };


    //get tabbs/messages after any broadcast
    socket.on("user_to_business", function(data){
        console.log("rootscope user", $rootScope.user)

        //get stored messages from DB based on incoming user number
        tabbsFactory.all_tabb_messages($rootScope.user, function(data){

            var insert_index;
            var current_tabs = _.pluck($scope.tabs, 'title');
            if (current_tabs != undefined){
                for (var i = 0; i < current_tabs; i++){
                    if (i === data[tab].number){
                        insert_index = i
                    }
                }
                $scope.tabs.push({
                    title: data[tab].number,
                    content: data[tab].number,
                    chat:[]})
                insert_index = current_tabs.length;
            } else {
                $scope.tabs.push({
                    title: data[tab].number,
                    content: data[tab].number,
                    chat:[]})
                insert_index = 0;
            }

            for(var tab in data){
                for(var message in data[tab].messages){
                     console.log("message", data[tab].messages[message].body);
                // console.log("messages", data.messages[message])
                var incoming = {
                "user": $rootScope.user.number,
                "avatar": "assets/images/avatar-1.jpg",
                "to": data[tab].tabb_business_id,
                "date": exampleDate,
                "content": data[tab].messages[message].body,
                "idUser": 50223456,
                "idOther": 50223457
                }
                // if the title(phone number) is not in the scope then create a new tab, if it is then
                // push the messsages into the chat array
                $scope.tabs[insert_index].chat.push(incoming);
                }
            }
        })
    });

    //send outgoing messages from business to user
    $scope.send_message_to_user = function(message_info){
        var test_message = {
                "tabb_id": "567b1e821b60790d1ea8cb0a",
                "to": "+14084600740",
                "from": "+15106483326",
                "date": new Date(),
                "content": "testing message from business to user",
                //swap IDS for testing other = business, user = user
                "idOther": "",
                "idUser": ""
            };

        tabbsFactory.message_to_user($rootScope.user, test_message, function(data){
            console.log("return from message fact success message", data);
        })
    };

    //get messages when controller loads
    tabbsFactory.all_tabb_messages($rootScope.user, function(data){
        for(var tab in data){
            for(var message in data[tab].messages){
                 // console.log("message", data[tab].messages[message].body);
            var incoming = {
            "user": $rootScope.user.number,
            "avatar": "assets/images/avatar-1.jpg",
            "to": data[tab].tabb_business_id,
            "date": exampleDate,
            "content": data[tab].messages[message].body,
            "idUser": 50223456,
            "idOther": 50223457
            }
            $scope.chat.push(incoming);
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
