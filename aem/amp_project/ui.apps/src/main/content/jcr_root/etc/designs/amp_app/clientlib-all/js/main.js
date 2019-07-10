$(function($){
  require(['electric-vehicle-map/component.evMap'], function (evMap) {

    
    if ($('#ev-map').length) {
        evMap.init();
    }
  });
})