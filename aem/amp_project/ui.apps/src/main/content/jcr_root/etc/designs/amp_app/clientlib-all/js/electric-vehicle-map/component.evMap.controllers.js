$(function($){
    define('electric-vehicle-map/component.evMap.controllers',
      [
        'electric-vehicle-map/component.evMap.app',
        'electric-vehicle-map/controllers/evMap.controller.Main'
      ],
      function(app, EvController) {
        app.controller('EvController', ['$scope', '$rootScope', EvController]);
    });
});