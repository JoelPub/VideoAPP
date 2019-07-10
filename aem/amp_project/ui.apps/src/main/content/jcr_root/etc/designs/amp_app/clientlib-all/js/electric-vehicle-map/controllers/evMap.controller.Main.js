$(function($){
    define('electric-vehicle-map/controllers/evMap.controller.Main', ['scrollify'], function(scrollify) {
        function EvController($scope, $rootScope) {
            //define variables
            var that = this;
            that.controllerResult = [];
            that.controllerLines = [];
            that.controllerStation = [];
            that.controllerJourney = 0;
            that.controllerDestinyCord = {};
            that.controllerAutoAdjust = false;
            that.controllerStartDrag = false;
            that.controllerStartPinch = false;
            var layoutJourney = {
                               "main":{
                                  "position":"absolute",
                                  "backgroundColor":"#ffffff",
                                  "left":"120px",
                                  "top":"56px",
                                  "min-width":"130px",
                                  "border-radius":"3px",
                                  "box-shadow":"0 6px 36px 0 rgba(0, 0, 0, 0.05), 0 4px 22px 0 rgba(0, 0, 0, 0.15)"
                               },
                               "arrow":{
                                  "background":"url("+$('#map-container').data('arrowimage-url') + ")",
                                  "width":"23px",
                                  "height":"23px",
                                  "float":"left",
                                   "top":"20%",
                                   "position":"absolute"
                               },
                               "staticDom":{
                                  "float":"right",
                                  "font-family":"PingFangSC",
                                  "font-size":"15px",
                                  "color":"#9b9b9b",
                                  "width":"100px",
                                  "white-space":"nowrap"
                               },
                               "dynamic":{
                                  "display":"block",
                                  "font-family":"FordSimplifiedChinese",
                                  "font-size":"24px",
                                  "font-weight":"bold",
                                  "color":"#073b69",
                                  "float":"left"
                               }
                            };
            var layoutStation = {
                               "main":{
                                  "position":"absolute",
                                  "backgroundColor":"#ffffff",
                                  "left":"120px",
                                  "top":"56px",
                                  "min-width":"220px",
                                  "border-radius":"3px",
                                  "box-shadow":"0 6px 36px 0 rgba(0, 0, 0, 0.05), 0 4px 22px 0 rgba(0, 0, 0, 0.15)"
                               },
                               "staticDom":{
                                  "font-family":"PingFangSC",
                                  "font-size":"11px",
                                  "color":"#9b9b9b",
                                  "margin":"14px 0",
                                  "float":"left",
                                  "text-align":"center",
                                   "width":"50%"
                               },
                               "dynamic":{
                                  "display":"block",
                                  "font-family":"FordSimplifiedChinese",
                                  "font-size":"24px",
                                  "font-weight":"bold",
                                  "color":"#073b69"
                               }
                            };
            var layoutRouteShadow = [{
                                          "range":1,
                                          "value":"#073B69"
                                     }];
            var layoutRoute = [
                               {
                                  "range":0.1,
                                  "value":"#3375BB"
                               },
                               {
                                  "range":0.2,
                                  "value":"#3178B7"
                               },
                               {
                                  "range":0.3,
                                  "value":"#2F7CB5"
                               },
                               {
                                  "range":0.4,
                                  "value":"#2C80B2"
                               },
                               {
                                  "range":0.5,
                                  "value":"#2983B0"
                               },
                               {
                                  "range":0.6,
                                  "value":"#2587AE"
                               },
                               {
                                  "range":0.7,
                                  "value":"#218BAB"
                               },
                               {
                                  "range":0.8,
                                  "value":"#1D8EA8"
                               },
                               {
                                  "range":0.9,
                                  "value":"#1792A5"
                               },
                               {
                                  "range":1,
                                  "value":"#1095A2"
                               }
                            ];
            //initial map
            require.config({
                paths: {
                    'async': '/etc/designs/guxfoap/clientlibs/re-ap-guxfoap-electric-vehicle/js/electric-vehicle-map/async',
                    'BMap': 'https://api.map.baidu.com/api?v=2.0&ak='+$('#map-container').data('baiduid')
                }
            });
            require(['async!BMap'], function() {
                $rootScope.GlobalMap = BMap;
                that.controllerMap = new $rootScope.GlobalMap.Map("allmap", {enableMapClick: false});
                that.controllerMap.setMapStyle({style: 'grayscale'});
                that.controllerStartCord = new $rootScope.GlobalMap.Point($('#map-container').data('startcord').split(",")[0],$('#map-container').data('startcord').split(",")[1]);
                that.controllerMap.centerAndZoom(that.controllerStartCord, 9);
                that.controllerMap.addControl(new $rootScope.GlobalMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT,type: BMAP_NAVIGATION_CONTROL_ZOOM}));
                if($(window).width()<=768) {
                    that.controllerMap.disableDragging();
                    that.controllerMap.disablePinchToZoom();
                }
                $('#allmap').height($(window).innerHeight());
                //$(window).resize(function(){
                //   $('#allmap').height($(window).innerHeight());
                //})
                //event listener
                setTimeout(function(){
                    $rootScope.startName = '上海' ;
                    $rootScope.destinyName = '杭州' ;
                    $rootScope.range = 5000 ;
                    $rootScope.offside = 200 ;
                    $rootScope.tinyStn = true ;
                    $rootScope.$broadcast('filtersApplyed'); 
                },3000)
                var initListiner = $scope.$on('filtersApplyed', function(event) {
                        console.log('filtersApplyed',(new Date()).getMinutes() +':'+(new Date()).getSeconds() );
                        $rootScope.searching = true;
                        that.controllerJourneyDone = false;
                        that.controllerMap.clearOverlays();
                        var citySearch = new $rootScope.GlobalMap.LocalSearch($rootScope.startName, {
                            renderOptions: {
                                map: that.controllerMap,
                                autoViewport: false,
                                selectFirstResult: true
                            }
                        });
                        var searchResult  = 0;
                        citySearch.setMarkersSetCallback(function(searchResults){
                            console.log(searchResults[0].point);
                            that.controllerMap.clearOverlays();
                            that.controllerStartCord = searchResults[0].address.indexOf($rootScope.startName)>-1 ?searchResults[0].point:that.controllerStartCord;
                            that.controllerDestinyCord= searchResults[0].address.indexOf($rootScope.destinyName)>-1?searchResults[0].point:that.controllerDestinyCord;
                            searchResult++;
                            if(searchResult>1) {
                                var driving = new $rootScope.GlobalMap.DrivingRoute(that.controllerMap, {
                                    renderOptions: {
                                        map: that.controllerMap,
                                        autoViewport: true
                                    }
                                });
                                driving.setPolylinesSetCallback(function(lines) {
                                    var overlaysArr = that.controllerMap.getOverlays();
                                    overlaysArr.forEach(function(element){
                                        that.controllerMap.removeOverlay(element);
                                    });
                                    that.controllerResult = driving.getResults();
                                    that.controllerLines = lines;
                                    if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
                                        console.log('got route',(new Date()).getMinutes() +':'+(new Date()).getSeconds() );
                                        setRouteSearchCallback();
                                    }
                                });
                                driving.clearResults();
                                console.log('found start and destiny',(new Date()).getMinutes() +':'+(new Date()).getSeconds() );
                                driving.search(that.controllerStartCord, that.controllerDestinyCord);

                            }
                        });
                        citySearch.search($rootScope.startName);
                        citySearch.search($rootScope.destinyName);
                });
            })

            function setRouteSearchCallback() {
                that.controllerJourney = that.controllerResult.getPlan(0).getDistance(true);
                console.log(that.controllerJourney);
                that.controllerLines[0].getPolyline().setStrokeOpacity(0.0001);
                addIcon($('#map-container').data('startimage-url'), 37, 52, that.controllerStartCord);
                addIcon($('#map-container').data('destinyimage-url'), 77, 77, that.controllerDestinyCord);
                drawStation(that.controllerLines, that.controllerMap, true);
                drawPolyLine(that.controllerLines,  {
                    x: 6,
                    y: 3
                }, layoutRouteShadow , 0.25, 5);
                drawPolyLine(that.controllerLines,  {
                    x: 0,
                    y: 0
                }, layoutRoute, 1, 6);
                setZoomEvent();
            }

            function drawStation(lines, refresh) {
                var stepsnum = lines[0].getNumSteps();
                var pp, local;
                var finished = false;
                console.log('draw station',(new Date()).getMinutes() +':'+(new Date()).getSeconds() );
                if (refresh) {
                    that.controllerStation = [];
                    for (var p = 0; p < stepsnum; p++) {
                        pp = lines[0].getStep(p).getPosition();
                        if (that.controllerMap.getDistance(pp, that.controllerStartCord) > $rootScope.offside) {
                            local = new $rootScope.GlobalMap.LocalSearch(pp, {
                                renderOptions: {
                                    map: that.controllerMap,
                                    autoViewport: false
                                }
                            });
                            local.setMarkersSetCallback(function(pois) {
                                for (var i = 0; i < pois.length; i++) {
                                    that.controllerMap.removeOverlay(pois[i].marker);
                                    if (
                                        that.controllerStation.findIndex(function(ele) {
                                            return ele.uid == pois[i].uid
                                        }) == -1
                                    ) {
                                        that.controllerStation.push(pois[i]);
                                        addIcon($('#map-container').data('stationimage-url'), $(window).width()>768&&$rootScope.tinyStn?14.5:29, $(window).width()>768&&$rootScope.tinyStn?14.5:29, pois[i].point);
                                    }
                                }
                                if (!finished&&local.getResults()&&local.getResults().center.lng==pp.lng && local.getResults().center.lat==pp.lat) {
                                    console.log('draw station completed',(new Date()).getMinutes() +':'+(new Date()).getSeconds());
                                    finished = true;
                                    $rootScope.searching = false;
                                    addInfoWindow({'x':$(window).width()>768?100:($(window).width()-220)/2,'y':$(window).width()>768?100:40}, $rootScope.startName + $('#map-container').data('daolabel').padStart($('#map-container').data('daolabel').length+1,' ').padEnd($('#map-container').data('daolabel').length+2,' ') + $rootScope.destinyName, that.controllerJourney, layoutJourney, 0, refresh);
                                    var initListinerJourney = $scope.$on('journeyDone', function(event) {
                                        console.log('journeyDone');
                                        if(!that.controllerJourneyDone) {
                                            console.log('drawJourney');
                                            addInfoWindow({'x':$(window).width()>768?100:($(window).width()-220)/2,'y':$(window).width()>768?200:120},'', that.controllerJourney, layoutStation, that.controllerStation.length, refresh);
                                            that.controllerJourneyDone = true;
                                        }
                                    });
                                }
                            });
                            local.searchNearby($('#map-container').data('stationname'), pp, $rootScope.range);

                        }
                        if(that.controllerMap.getDistance(pp, that.controllerDestinyCord) < $rootScope.offside) break;
                    }
                } else {
                    for (var i = 0; i < that.controllerStation.length; i++) {
                        addIcon($('#map-container').data('stationimage-url'), $(window).width()>768&&$rootScope.tinyStn?14.5:29, $(window).width()>768&&$rootScope.tinyStn?14.5:29, that.controllerStation[i].point);
                    }
                	console.log('#station before',$(window).width()>768?100:($(window).width()-220)/2, $(window).width()>768?200:120);
                    addInfoWindow({'x':$(window).width()>768?100:($(window).width()-220)/2,'y':$(window).width()>768?200:120},'', that.controllerJourney, layoutStation, that.controllerStation.length, refresh);
                }

            }

            function addInfoWindow(pos, txt, journey, layout, station, refresh) {
                console.log(station>0?'#station':'#journey',pos);
                var mouseTop = 0,mouseLeft = 0,thumbTop = 0, thumbLeft = 0, fingerTop = 0, fingerLeft = 0,thumbUp = false;
                that.controllerStartDrag = false;
                that.controllerStartPinch = false;
                function ComplexCustomOverlay(point, text, mouseoverText) {
                    this._point = point;
                    this._text = text;
                    this._overText = mouseoverText;
                }
                ComplexCustomOverlay.prototype = new $rootScope.GlobalMap.Overlay();
                ComplexCustomOverlay.prototype.initialize = function() {
                    var mainDiv = this._mainDiv = document.createElement("div");
                    $(mainDiv).css(layout.main)
                    if (station > 0) {
                        var staticDom = this._staticDom = document.createElement("div");
                        $(staticDom).css(layout.staticDom);
                        var span = this._span = document.createElement("span");
                        span.appendChild(document.createTextNode(refresh ? '0' : station));
                        $(span).css(layout.dynamic);
                        staticDom.appendChild(span);
                        staticDom.appendChild(document.createTextNode($('#map-container').data('stationlabel')));
                        mainDiv.appendChild(staticDom);
                        var timeWrapper = document.createElement("div");
                        $(timeWrapper).css(layout.staticDom);
                        var timeNo = document.createElement("span");
                        timeNo.appendChild(document.createTextNode(Math.ceil(parseInt(journey)/350)));
                        $(timeNo).css(layout.dynamic);
                        timeWrapper.appendChild(timeNo);
                        timeWrapper.appendChild(document.createTextNode($('#map-container').data('stationtimelabel')));
                        mainDiv.appendChild(timeWrapper);

                    }
                    else if (parseFloat(journey) > 0) {
                        var arrow = this._arrow = document.createElement("div");
                        $(arrow).css(layout.arrow)
                        mainDiv.appendChild(arrow);
                        var staticDom = this._staticDom = document.createElement("div");
                        staticDom.appendChild(document.createTextNode(this._text));
                        $(staticDom).css(layout.staticDom)
                        var span = this._span = document.createElement("span");
                        span.appendChild(document.createTextNode(refresh ? '0' : parseInt(journey)));
                        $(span).css(layout.dynamic)
                        staticDom.appendChild(span);
                        var km = document.createElement("span");
                        km.appendChild(document.createTextNode($('#map-container').data('kmlabel')));
                        $(km).css(layout.dynamic);
                        staticDom.appendChild(km);
                        mainDiv.appendChild(staticDom);

                    }

                    that.controllerMap.getPanes().labelPane.appendChild(mainDiv);
                    if($(window).width()>768) {

                        $(mainDiv).mousedown(function(event){
                            //console.log('mousedown',$(mainDiv).position());
                            mouseLeft = event.pageX;
                            mouseTop = event.pageY;
                            startDrag = true;
                            that.controllerMap.disableDragging();

                        });

                        $(mainDiv).mousemove(function(event){
                            //console.log('mousemove',event.pageX-mouseLeft,event.pageY-mouseTop);
                            //if(startDrag) $(mainDiv).css({left:($(mainDiv).position().left+event.pageX-mouseLeft),top:($(mainDiv).position().top+event.pageY-mouseTop)});
                            if(startDrag) {
                                if(event.pageY-mouseTop>0&&
                                   ($(mainDiv).position().top+$(mainDiv).height()+$('#map-container').height()/4)<($('#map-container .BMap_mask').position().top+$('#map-container').height())&&
                                   ($(mainDiv).siblings().position().top+$(mainDiv).siblings().height()+$('#map-container').height()/4)<($('#map-container .BMap_mask').position().top+$('#map-container').height())
                                  ) {
                                    $(mainDiv).css({top:($(mainDiv).position().top+$('#map-container').height()/4)});
                                    $(mainDiv).siblings().css({top:($(mainDiv).siblings().position().top+$('#map-container').height()/4)});
                                }
                                else if(event.pageY-mouseTop<0&&
                                        ($(mainDiv).position().top-$('#map-container').height()/4)>$('#map-container .BMap_mask').position().top&&
                                        ($(mainDiv).siblings().position().top-$('#map-container').height()/4)>$('#map-container .BMap_mask').position().top) {
                                    $(mainDiv).css({top:($(mainDiv).position().top-$('#map-container').height()/4)});
                                    $(mainDiv).siblings().css({top:($(mainDiv).siblings().position().top-$('#map-container').height()/4)});
                                }

                            }

                        });
                        that.controllerMap.addEventListener('mouseup',function(event){
                            //console.log('mouseup',$(mainDiv).position());
                            startDrag = false;
                            that.controllerMap.enableDragging();

                        });

                    }
                    else {
                        that.controllerMap.addEventListener('touchstart',function(event){
                            //console.log('touchstart',$(mainDiv).position(),event.changedTouches[0].clientX,event.changedTouches[0].clientY);
                            console.log('touchstart event.touches.length',event.touches.length);
                            console.log('event.touches[0].clientX',event.touches[0].clientX);
                            console.log('event.touches[0].clientY',event.touches[0].clientY);
                            mouseLeft = event.touches[0].clientX;
                            mouseTop = event.touches[0].clientY;
                            if(event.touches.length==1&&
                               mouseLeft>=$(mainDiv).position().left&&
                               mouseLeft<=$(mainDiv).position().left+$(mainDiv).width()&&
                               mouseTop>=$(mainDiv).position().top&&
                               mouseTop<=$(mainDiv).position().top+$(mainDiv).height() ) {
                                that.controllerStartDrag = true;
                                that.controllerMap.disableDragging();
                                scrollify.disable();
							}
                            else if(event.touches.length==2){
                            	console.log('!2 touchstart event.touches',event.touches);
                                that.controllerStartPinch = true;
                                scrollify.disable();
                                thumbLeft = event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientX:event.touches[1].clientX;
                                thumbTop = event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientY:event.touches[1].clientY;
                                fingerLeft = event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientX:event.touches[0].clientX;
                                fingerTop = event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientY:event.touches[0].clientY;
                                thumbUp = thumbTop <= fingerTop;
                            }

                        });
                        that.controllerMap.addEventListener('touchmove',function(event){
                            //console.log('touchmove',$(mainDiv).position(),event.changedTouches[0].clientX,event.changedTouches[0].clientY);
                            //if(startDrag) $(mainDiv).css({left:($(mainDiv).position().left+event.pageX-mouseLeft),top:($(mainDiv).position().top+event.pageY-mouseTop)});

                            console.log('touchmove event.touches.length',event.touches.length);
                            console.log('event.touches[0].clientX',event.touches[0].clientX);
                            console.log('event.touches[0].clientY',event.touches[0].clientY);
                            if(event.touches.length==1&&that.controllerStartDrag&&!that.controllerStartPinch) {
                                console.log('start drag');
                                if(event.touches[0].clientY-mouseTop>0&&
                                   $(mainDiv).siblings().length>0&&
                                   ($(mainDiv).position().top+$(mainDiv).height()+$('#map-container').height()/4)<($('#map-container .BMap_mask').position().top+$('#map-container').height())&&
                                   ($(mainDiv).siblings().position().top+$(mainDiv).siblings().height()+$('#map-container').height()/4)<($('#map-container .BMap_mask').position().top+$('#map-container').height())
                                  ) {
                                    $(mainDiv).css({top:($(mainDiv).position().top+$('#map-container').height()/4)});
                                    $(mainDiv).siblings().css({top:($(mainDiv).siblings().position().top+$('#map-container').height()/4)});
                                }
                                else if(event.touches[0].clientY-mouseTop<0&&
                                        $(mainDiv).siblings().length>0&&
                                        ($(mainDiv).position().top-$('#map-container').height()/4)>$('#map-container .BMap_mask').position().top&&
                                        ($(mainDiv).siblings().position().top-$('#map-container').height()/4)>$('#map-container .BMap_mask').position().top) {
                                    $(mainDiv).css({top:($(mainDiv).position().top-$('#map-container').height()/4)});
                                    $(mainDiv).siblings().css({top:($(mainDiv).siblings().position().top-$('#map-container').height()/4)});
                                }

                            }
                            else if(event.touches.length==2&&that.controllerStartPinch) {
                                console.log('start pinch');
                            	console.log('event.touches[1].clientX',event.touches[1].clientX);
                            	console.log('event.touches[1].clientY',event.touches[1].clientY);
                                that.controllerStartDrag=false;
                                if(
                                    (!thumbUp&&
                                   	  (
                                   		(event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientX:event.touches[1].clientX)-thumbLeft>5||
                                  		(event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientY:event.touches[1].clientY)-thumbTop<-5||
                                  		(event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientX:event.touches[0].clientX)-fingerLeft<-5||
                                  		(event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientY:event.touches[0].clientY)-fingerTop>5
                                      )
                                    )||
                                    (thumbUp&&
                                   	  (
                                   		(event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientX:event.touches[1].clientX)-thumbLeft>5||
                                  		(event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientY:event.touches[1].clientY)-thumbTop>5||
                                  		(event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientX:event.touches[0].clientX)-fingerLeft<-5||
                                  		(event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientY:event.touches[0].clientY)-fingerTop<-5
                                      )
                                    )
                                   ) {
                                    that.controllerStartPinch = false;
                            		console.log('!2 touchpinch event.touches',event.touches);
                            		console.log('!2 touchpinch thumbLeft',thumbLeft);
                            		console.log('!2 touchpinch thumbTop',thumbTop);
                            		console.log('!2 touchpinch fingerLeft',fingerLeft);
                            		console.log('!2 touchpinch fingerTop',fingerTop);
                                    console.log('!Zoom out');
                                    that.controllerMap. zoomOut();
                                }
                                else if(
                                    	(!thumbUp&&
                                          (
                                        	(event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientX:event.touches[1].clientX)-thumbLeft<-5||
                                  			(event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientY:event.touches[1].clientY)-thumbTop>5||
                                  			(event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientX:event.touches[0].clientX)-fingerLeft>5||
                                  			(event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientY:event.touches[0].clientY)-fingerTop<-5
                                          )
                                        )||
                                   		(thumbUp&&
                                          (
                                        	(event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientX:event.touches[1].clientX)-thumbLeft<-5||
                                  			(event.touches[0].clientX<event.touches[1].clientX?event.touches[0].clientY:event.touches[1].clientY)-thumbTop<-5||
                                  			(event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientX:event.touches[0].clientX)-fingerLeft>5||
                                  			(event.touches[0].clientX<event.touches[1].clientX?event.touches[1].clientY:event.touches[0].clientY)-fingerTop>5
                                          )
                                        )
                                       ){
                                    that.controllerStartPinch = false;
                            		console.log('!2 touchpinch event.touches',event.touches);
                            		console.log('!2 touchpinch thumbLeft',thumbLeft);
                            		console.log('!2 touchpinch thumbTop',thumbTop);
                            		console.log('!2 touchpinch fingerLeft',fingerLeft);
                            		console.log('!2 touchpinch fingerTop',fingerTop);
                                    console.log('!zoom in');
                                    that.controllerMap.panTo(that.controllerMap.pixelToPoint(new $rootScope.GlobalMap.Pixel((thumbLeft+fingerLeft)/2, (thumbTop+fingerTop)/2)));
                                    that.controllerMap. zoomIn();
                                }
                            }


                        });
                        that.controllerMap.addEventListener('touchend',function(event){
                            //console.log('touchend',$(mainDiv).position(),event.changedTouches[0].clientX,event.changedTouches[0].clientY);
                            console.log('touchend event.touches.length',event.touches.length);
                            if(event.touches.length>0) {
                            	console.log('event.touches[0].clientX',event.touches[0].clientX);
                            	console.log('event.touches[0].clientY',event.touches[0].clientY);
                            }
                            if(event.touches.length>1) {
                            	console.log('event.touches[1].clientX',event.touches[1].clientX);
                            	console.log('event.touches[1].clientY',event.touches[1].clientY);
                            }
                            startDrag = false;
                            scrollify.enable();

                        });

                    }
                    return mainDiv;
                }
                ComplexCustomOverlay.prototype.draw = function() {
                	console.log(station>0?'#station draw':'#journey draw',this._point);
                    this._mainDiv.style.left = $('.BMap_mask').position().left+this._point.x + "px";
                    this._mainDiv.style.top = $('.BMap_mask').position().top+this._point.y + "px";
                }

                var myCompOverlay = new ComplexCustomOverlay(pos, txt);

                that.controllerMap.addOverlay(myCompOverlay);
                var event = new CustomEvent('build', {
                    'detail': station > 0 ? station : parseInt(journey)
                });
                myCompOverlay.addEventListener('build', function(event) {
                    $this = $(this._span)
                    $({
                        countNum: 0
                    }).animate({
                        countNum: event.detail
                    }, {
                        duration: 1000,
                        easing: 'linear',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        },
                        always: function() {
                            if(station == 0) $scope.$broadcast('journeyDone');
                        }
                    })
                }, false);
                if (refresh) myCompOverlay.dispatchEvent(event);

            }

            function drawPolyLine(lines, offset, color, opacity, width) {
                var polyline, pois, poisDistance;
                var poisArr = [],
                    changePoint = 0,
                    accumulated = 0,
                    j = 0;
                var stepsnum1 = lines[0].getNumSteps();
                for (var i = 0; i < color.length; i++) {
                    poisArr = [];
                    j = 0;
                    for (var p = changePoint; p < stepsnum1; p++) {

                        pois = lines[0].getStep(p).getPosition();
                        poisDistance = lines[0].getStep(p).getDistance();
                        accumulated += poisDistance.indexOf($('#map-container').data('milabel')) > -1 ? parseFloat(poisDistance) / 1000 : parseFloat(poisDistance);
                        if (accumulated / parseFloat(that.controllerJourney) < color[i].range || color[i].range == 1) {
                            pixelX = that.controllerMap.pointToPixel(pois).x + offset.x;
                            pixelY = that.controllerMap.pointToPixel(pois).y + offset.y;
                            poisArr[j++] = that.controllerMap.pixelToPoint(new $rootScope.GlobalMap.Pixel(pixelX, pixelY));
                        } else {
                            changePoint = p > 1 ? p - 1 : 0;
                            break;
                        }
                    }
                    polyline = new $rootScope.GlobalMap.Polyline(poisArr, {
                        strokeWeight: width,
                        strokeOpacity: opacity,
                        strokeColor: color[i].value
                    });
                    that.controllerMap.addOverlay(polyline);

                }

            }

            function setZoomEvent() {
                that.controllerMap.addEventListener("zoomstart", function(evt) {
                    that.controllerMap.clearOverlays();
                });

                that.controllerMap.addEventListener("zoomend", function(evt) {
                    if (!that.controllerAutoAdjust) {
                		console.log('#journey before',$(window).width()>768?100:($(window).width()-220)/2, $(window).width()>768?100:40);
                        addInfoWindow({'x':$(window).width()>768?100:($(window).width()-220)/2,'y':$(window).width()>768?100:40},  $rootScope.startName + $('#map-container').data('daolabel').padStart($('#map-container').data('daolabel').length+1,' ').padEnd($('#map-container').data('daolabel').length+2,' ') + $rootScope.destinyName, that.controllerJourney, layoutJourney, 0, false);
                        drawPolyLine(that.controllerLines,  {
                            x: 6,
                            y: 3
                        }, layoutRouteShadow , 0.25, 5);
                        drawPolyLine(that.controllerLines,  {
                            x: 0,
                            y: 0
                        }, layoutRoute, 1, 6);
                        drawStation(that.controllerLines,  false);
                        addIcon($('#map-container').data('startimage-url'), 37, 52, that.controllerStartCord);
                        addIcon($('#map-container').data('destinyimage-url'), 77, 77, that.controllerDestinyCord);
                    }
                });
            }

            function addIcon(iconUrl, iconWidth, iconLength, Position) {
                var marchIcon = new $rootScope.GlobalMap.Icon(iconUrl, new $rootScope.GlobalMap.Size($(window).width()>768?iconWidth:iconWidth/2, $(window).width()>768?iconLength:iconLength/2));
                var marchMarker = new $rootScope.GlobalMap.Marker(Position, {
                    icon: marchIcon
                });
                that.controllerMap.addOverlay(marchMarker);
                marchMarker.setAnimation(BMAP_ANIMATION_DROP);
            }
        }
        return EvController;
    });

});