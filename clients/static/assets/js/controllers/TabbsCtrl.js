app.controller('TabsDemoCtrl', ["$scope", "SweetAlert", function ($scope, SweetAlert) {
    $scope.tabs = [{
        title: '1(510)-557-2282',
        content: '1(510)-557-2282'
    }, {
        title: '1(408)-460-0404',
        content: '1(408)-460-0404',
        disabled: false
    }];

    $scope.alertMe = function () {
        setTimeout(function () {
            SweetAlert.swal({
	        	title: 'You\'ve selected the alert tab!',
	        	confirmButtonColor: '#007AFF'
        	});
        });
    };
}])

app.controller('TabbsChatCtrl', ["$scope", function ($scope) {

    $scope.selfIdUser = 50223456;
    $scope.otherIdUser = 50223457;
    $scope.setOtherId = function (value) {

        $scope.otherIdUser = value;
    };
    var exampleDate = new Date().setTime(new Date().getTime() - 240000 * 60);

    $scope.chat = [{
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": exampleDate,
        "content": "Hi, Nicole",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "How are you?",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Nicole Bell",
        "avatar": "assets/images/avatar-2.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "Hi, i am good",
        "idUser": 50223457,
        "idOther": 50223456
    }];

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
        $scope.chatMessage = '';

    };
}]);