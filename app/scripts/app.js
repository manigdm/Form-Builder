'use strict';

var angularApp = angular.module('formBuilderApp', ['ui.bootstrap', '$strap.directives']);

angularApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/create-form.html',
            controller: 'CreateFormController'
        })
        .otherwise({
            redirectTo: '/'
        });

})


