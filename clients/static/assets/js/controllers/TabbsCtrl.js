

app.controller('TabbsChatCtrl', ["$scope", "socket", function ($scope, socket) {

    //destroy listeners
    // $scope.$on('$destroy', function(even){
    //     socket.removeAllListeners();
    // })

        $scope.tabs = [{

        title: '1(510)-557-2282',
        content: '1(510)-557-2282'
    }, {
        title: '1(408)-460-0404',
        content: '1(408)-460-0404',
        disabled: false
    }];

    $scope.selfIdUser = 50223456;
    $scope.otherIdUser = 50223457;
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
            "idUser": $scope.selfIdUser,
            "idOther": $scope.otherIdUser
        };
        $scope.chat.push(newMessage);
        console.log("newmessage", newMessage)
        socket.emit("test_new_client", newMessage)
        $scope.chatMessage = '';

    };

    //testing receiving message from twilio and pushing it to chat
    console.log("tabbs controller socket:", socket);
        socket.on('twilio_test', function(data){
            console.log('hello', data);
            $scope.chat.push(data);
            socket.emit("client_resonse", "response");
        })

}]);


// app.factory('tabbSocketFactory', function(socketFactory){
//     console.log("tabbs factory sockets:", socket);
//         socket.on('twilio_test', function(data){
//             console.log("twilio controller:", data)
//              socket.emit('hello', "test");
//         })

//     return socketFactory();
// })

