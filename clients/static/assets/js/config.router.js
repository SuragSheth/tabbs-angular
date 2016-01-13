'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/app/dashboard");
    //
    // Set up the states
    $stateProvider.state('app', {
        url: "/app",
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl', 'truncate', 'htmlToPlaintext', 'angular-notification-icons'),
        abstract: true
    })

    // Admin ROUTES
    // -----------------------------------

    .state('app.dashboard', {
        url: "/dashboard",
        templateUrl: "assets/views/dashboard.html",
        controller: 'dashboardController',
        resolve: loadSequence('jquery-sparkline', 'dashboardCtrl'),
        title: 'Dashboard',

        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    })

    .state('app.tabbs', {
        url: '/tabbs/',
        templateUrl: "assets/views/tabbs.html",
        controller: 'TabbsChatCtrl'

    })

    .state('app.messages', {
        url: "/messages",
        templateUrl: "assets/views/pages_messages.html",
        resolve: loadSequence('truncate', 'htmlToPlaintext', 'inboxCtrl'),
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    })

    .state('app.contacts', {
        url: '/contacts',
        templateUrl: "assets/views/contacts.html",
        controller: 'contactsCtrl',
        resolve: loadSequence('dynamicTableCtrl')

    })

    .state('app.settings', {
        url: '/settings',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Settings',
        resolve: loadSequence('toasterCtrl', 'sweetAlertCtrl', 'NotificationIconsCtrl')
    })


    .state('app.settings.manage', {
        url: '/manage',
        templateUrl: "assets/views/employeemanage.html",
        title: 'Settings'
    })


    .state('app.settings.user', {
        url: '/user',
        templateUrl: "assets/views/pages_user_profile.html",
        title: 'User Profile',
        ncyBreadcrumb: {
            label: 'User Profile'
        },
        resolve: loadSequence('flow', 'userCtrl')

    })







    // .state('error', {
    //     url: '/error',
    //     template: '<div ui-view class="fade-in-up"></div>'
    // }).state('error.404', {
    //     url: '/404',
    //     templateUrl: "assets/views/utility_404.html",
    // }).state('error.500', {
    //     url: '/500',
    //     templateUrl: "assets/views/utility_500.html",
    // })





    //Start: routes for login and signup ========================
    .state('home', {
        url: '/home',
        templateUrl: 'assets/views/home.html'
    }).state('login', {
        url: '/login',
        templateUrl: 'assets/views/login_login.html',
        controller: 'businessCtrl'
    }).state('signup', {
        url: '/signup',
        templateUrl: 'assets/views/login_signup.html',
        controller: 'businessCtrl'
    }).state('login.lockscreen', {
        url: '/lock',
        templateUrl: "assets/views/login_lock_screen.html"
    }).state('login.forgot', {
        url: '/forgot',
        templateUrl: "assets/views/login_forgot.html"
    }).state('signup_wizard', {
        url: '/signup_wizard',
        templateUrl: 'assets/views/signup_wizard.html',
        controller: "wizardCtrl"
    })
     //End: routes for login and signup ========================


    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);
