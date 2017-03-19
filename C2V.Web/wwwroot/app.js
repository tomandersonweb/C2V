(function () {
    var angular = require('angular');

    var module = angular.module("app", []);

    module.config(function ($locationProvider) {

        $locationProvider.html5Mode(false);

    });

})(window.angular);