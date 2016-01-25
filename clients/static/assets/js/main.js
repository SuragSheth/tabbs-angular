var app = angular.module('tabbs_app', ['clip-two']);
app.run(['$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams, $location, $route, AuthService) {

    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    FastClick.attach(document.body);

    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
    // if (AuthService.isLoggedIn() === false) {
    //   $location.path('/login');
    // }
        console.log("state is transitionaing")
    });
 

    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
        name: 'Tabbs', // name of your project
        author: 'Steven Lam & Surag Sheth', // author's name or company name
        description: 'Real-time messaging for businesses & consumers', // brief description
        version: '0.2', // current version
        year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
        isMobile: (function () {// true if the browser is a mobile device
            var check = false;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                check = true;
            };
            console.log("ON MOBILE", check);
            return check;
        })(),
        layout: {
            isNavbarFixed: true, //true if you want to initialize the template with fixed header
            isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
            isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
            isFooterFixed: false, // true if you want to initialize the template with fixed footer
            theme: 'theme-2', // indicate the theme chosen for your project
            logo: 'assets/images/logo.png', // relative path of the project logo
        }
    };

    $rootScope.user = {

    };
}]);

// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;


}]);
