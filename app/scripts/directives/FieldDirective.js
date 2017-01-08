'use strict';

var __indexOf = [].indexOf || function(item) {
    console.log(item)
        for (var i = 0, l = this.length; i < l; i++) {
            console.log("ind") 
            if (i in this && this[i] === item)
                
                return i;
        }
        return -1;
    };

angularApp.directive('fieldDirective', function($http, $compile) {

    var getTemplateUrl = function(field) {

        var type = field.field_type;
        var templateUrl = './views/directive-templates/field/';
        var supported_fields = [
            'textfield',
            'email',
            'textarea',
            'checkbox',
            'date',
            'dropdown',
            'hidden',
            'password',
            'radio'
        ]

        return templateUrl += type + '.html';
    }

    var linker = function(scope, element) {
        // GET template content from path
        var templateUrl = getTemplateUrl(scope.field);
        $http.get(templateUrl).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    }

    return {
        template: '<div ng-bind="field"></div>',
        restrict: 'E',
        scope: {
            field: '='
        },
        link: linker
    };
});