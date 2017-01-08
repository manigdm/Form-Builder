'use strict';

angularApp.controller('CreateFormController', function ($scope, $dialog, FormService) {

    // preview form mode
    $scope.previewMode = false;

    // new form
    $scope.form = {};
    $scope.form.form_id = 1;
    $scope.form.form_name = 'My Form';
    $scope.form.form_fields = [];
    $scope.newfield = {};

    $scope.previewForm = {};

    // add new field drop-down:
    $scope.addField = {};
    $scope.addField.types = FormService.fields;
    $scope.addField.new = $scope.addField.types[0];
    $scope.addField.lastAddedID = 0;

    // accordion settings
    $scope.accordion = {}
    $scope.accordion.oneAtATime = true;

    $scope.add_form_fields = [];
    // create new field button click
    $scope.addNewField = function(){
        // incr field_id counter
        $scope.addField.lastAddedID++;       
        $scope.newField = {
            "field_id" : $scope.addField.lastAddedID,
            "field_title" : "New field - " + ($scope.addField.lastAddedID),
            "field_type" : $scope.addField.new.name,
            "field_value" : "",
            "field_required" : true,
            "field_minlength": $scope.addField.new.minlength,
            "field_maxlength": $scope.addField.new.maxlength
        };
        $('#add_new_field').modal('toggle'); 
    }

    $scope.saveNewField = function(){
        // put newField into fields array
        $scope.form.form_fields.push($scope.newField);
    }
    $scope.closeForm = function(){
        $scope.addField.lastAddedID--;
    }

    // deletes particular field on button click
    $scope.deleteField = function (field_id){
        for(var i = 0; i < $scope.form.form_fields.length; i++){
            if($scope.form.form_fields[i].field_id == field_id){
                $scope.form.form_fields.splice(i, 1);
                break;
            }
        }
    }

    // add new option to the field
    $scope.addOption = function (field){
        if(!field.field_options)
            field.field_options = new Array();

        var lastOptionID = 0;

        if(field.field_options[field.field_options.length-1])
            lastOptionID = field.field_options[field.field_options.length-1].option_id;

        // new option's id
        var option_id = lastOptionID + 1;

        var newOption = {
            "option_id" : option_id,
            "option_title" : "Option " + option_id,
            "option_value" : option_id
        };

        // put new option into field_options array
        field.field_options.push(newOption);
    }

    // delete particular option
    $scope.deleteOption = function (field, option){
        for(var i = 0; i < field.field_options.length; i++){
            if(field.field_options[i].option_id == option.option_id){
                field.field_options.splice(i, 1);
                break;
            }
        }
    }


    // preview form
    $scope.generateForm = function(){
        if($scope.form.form_fields == null || $scope.form.form_fields.length == 0) {
            var title = 'Error';
            var msg = 'No fields added yet, please add fields to the form before generate a new form.';
            var btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];

            $dialog.messageBox(title, msg, btns).open();
        }
        else {
            $scope.previewMode = true;
            $scope.form.submitted = false;
            angular.copy($scope.form, $scope.previewForm);
        }
    }

    // // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (field){
        if(field != undefined){
            if(field.field_type == "radio" || field.field_type == "dropdown"){
                return true;
            }
            else{
                return false;
            }
        }
    }

    // deletes all the fields
    $scope.reset = function (){
        $scope.form.form_fields.splice(0, $scope.form.form_fields.length);
        $scope.addField.lastAddedID = 0;
    }
});
