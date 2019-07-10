$(function($){

define('electric-vehicle-map/component.evMap',
    [
    'jquery',
    'angular',
    'electric-vehicle-map/component.evMap.app',
    'electric-vehicle-map/component.evMap.controllers'
    ],
    function($, angular, app, controllers) {
      var api = {};

      function init() {
        $('#ev-map').each(function(index, component) {
          angular.bootstrap(component, ['evMap']);
        });
      }
      return {
        init: init
      };
    });
});