app.controller('TabbsChatCtrl', ["$scope", "socket", "tabbsFactory", "$interval", "$rootScope", function ($scope, socket, tabbsFactory, $interval, $rootScope) {

    var autoCounter = function(index, start, steps, delay) {
        var numIterations = 2;
        $scope.autoPending[index] = start;
        $interval(function() {
            if (++numIterations > steps) {
                $scope.autoPending[index] = start;
                numIterations = 0;
            } else {
                $scope.autoPending[index] = $scope.autoPending[index] + 1;
            }
        }, delay);
    };

    $scope.autoPending = [0, 0];
    autoCounter(0, 1, 4, 1000);
    autoCounter(1, 98, 4, 1000);

    $scope.selfIdUser = $rootScope.user.number;
    $scope.otherIdUser = +000;

    $scope.setOtherId = function (value) {
        $scope.otherIdUser = value;
    };

    var exampleDate = new Date().setTime(new Date().getTime() - 240000 * 60);

    $scope.tabs = [];

    $scope.sendMessage = function (tab, message) {
        console.log("TABBB for send message", tab, "tabbb id", tab.tabb_id)
        console.log("SELF AND OTHER CHECK:", $scope.selfIdUser, $scope.otherIdUser)
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
                break
            };
        };
        $scope.tabs[insert_index].chat.push(newMessage);
        console.log("newmessage", newMessage)
        tabbsFactory.message_to_user($rootScope.user, newMessage, function(data){
            console.log("return from message fact success message", data);
        })
        $scope.business_to_user_message = '';
        tabbsFactory.all_tabb_messages($rootScope.user, function(data){
            fill_tabs_and_messages(data);
        })
    };

    //get tabbs/messages after any broadcast
    socket.on("user_to_business", function(data){
        console.log("USER TO BUSINESS DATA:", data)

        //get stored messages from DB based on incoming user number
        tabbsFactory.all_tabb_messages($rootScope.user, function(data){
            console.log("SOCKET.ON TABBS FAC GET MESSAGES=====", data)
            fill_tabs_and_messages(data);
        })
    })

    //get stored messages from DB based on incoming user number
    tabbsFactory.all_tabb_messages($rootScope.user, function(data){
    console.log("Controller TABBS FAC GET MESSAGES=====", data)
        fill_tabs_and_messages(data);
    })

    var fill_tabs_and_messages = function(data){
        $scope.tabs = [];
        console.log("Controller TABBS FAC GET MESSAGES=====", data)
            var insert_index;
            var index_set;
            //checks if there are any tabbs
            console.log("CHECKKKKK", $scope.tabs.length == 0, data)
            if ($scope.tabs.length == 0){
                $scope.tabs.push({
                    title: data[0].tabb_user_id,
                    content: data[0].tabb_user_id,
                    tabb_id: data[0]._id,
                    chat:[]
                })
                // console.log("first index set")
                insert_index = 0;
            }
            //loops through tabs in data.
            for(var tab in data){
                var current_tabs = _.pluck($scope.tabs, 'title');
                if (current_tabs){
                    for ( t in current_tabs){
                        // console.log("Found = ", data[tab].tabb_user_id === current_tabs[t]);
                        if (current_tabs[t] === data[tab].tabb_user_id){
                            insert_index = t;
                            index_set = true;
                            // console.log("first index set", insert_index)
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
                 //   console.log("third index set sonnnnnnnn", insert_index)
                }
                for(var message in data[tab].messages){
                   // console.log("message", data[tab].messages[message]);
                    var incoming = {
                    "user": "",
                    "avatar": "assets/images/avatar-1.jpg",
                    "to": "",
                    "date": exampleDate,
                    "content": data[tab].messages[message].body
                    }
                    //message from user to business
                    if(data[tab].messages[message].to === $rootScope.user.number){
                        incoming.user = data[tab].messages[message].from;
                        incoming.to = data[tab].messages[message].to;
                        incoming.idUser = +000;
                        incoming.idOther = $rootScope.user.number;
                    } else{  //message from business to user
                        incoming.user = data[tab].messages[message].from;
                        incoming.to = data[tab].messages[message].to
                        incoming.idUser = $rootScope.user.number;
                        incoming.idOther = +000;
                    }
                    // if the title(phone number) is not in the scope then create a new tab, if it is then
                    // push the messsages into the chat array
                    $scope.tabs[insert_index].chat.push(incoming);
                }
            index_set = false;
            }
    };
}]);

app.factory('tabbsFactory', function($http){
    var factory = {};

    factory.all_tabb_messages = function(data, callback){
        $http.get('/business_tabbs/'+data.number).success(function(data){
        callback(data);
        })
    }

    factory.message_to_user = function(user, message, callback){
        console.log("inside factory for sending message", user, message);
        $http.post('/send_message_to_user', {rootuser: user, message: message}).success(function(data){
            callback(data);
        })
    }
    factory.last_incoming_message = function(data, callback){
        $http.get('/last_incoming_message/' + data.number).success(function(data){
            console.log("business tabb on success last added message after SORT", data);
            callback(data);
        })
    }
    return factory;
})
