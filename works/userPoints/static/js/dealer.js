import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";

import AMapLoader from "@/assets/AMap";
import AMapUILoader from "@/assets/AMapUI";
import select from '@/components/select';
import store from "../../src/vuex/store";
var map;
var geolocation;
export default {
  name: "dealer",

  data() {
    return {
      currentCity: '定位中...',
      defaultCity: '上海',
      dealerName: '',
      data: [],
      selectedDealer: '',
      totalDealer: '...',
      show: false,
      address: '',
      province: '',
      city: '',
      dealer: '',
      dealerIndex: '',
      selectedCity: '',
      selectedProvince: '',
      selectedData: [],
      selectedLocation: false,

    };
  },
  components: {
    'yz-select': select
  },
  mounted: function () {
    this.init()
  },

  methods: {
    init: function () {
      store.commit('showloading');
      AMapLoader().then(AMap => {
        map = new AMap.Map('container', {
          zoom: 9
        });
        this.getCurrentPosition();
      })
    },
    searchDealer: function () {
    },
    onComplete: function (result) {
      var city = result.addressComponent.city ? result.addressComponent.city : result.addressComponent.province,
        province = result.addressComponent.province;
      if (city.indexOf("市")) {
        city = city.split("市")[0];
      }
      if (province.indexOf("市")) {
        province = province.split("市")[0];
      }
      this.currentCity = city;
      this.selectedLocation = false;

      this.getDealerInfo(city, province, result.position.lng, result.position.lat)
    },
    onError: function (result) {
      this.currentCity = this.defaultCity;
      this.getCityLocation();
    },
    filterDealer: function (data, lng, lat) {
      var sortNum = function (type) {
        return function (a, b) {
          var val1 = a[type];
          var val2 = b[type];
          return val1 - val2;
        }
      }
      var newData = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].DealerNewVehicle.indexOf("JJ") > -1) {

          var filterData = [];
          var dealerLatitude = data[i]._location.split(",")[1];
          var dealerLongitude = data[i]._location.split(",")[0];

          filterData.distance = (new AMap.LngLat(lng, lat).distance(new AMap.LngLat(dealerLongitude, dealerLatitude))) / 1000;
          //console.log(filterData.distance);

          filterData._name = data[i]._name;
          filterData.value = data[i]._name;
          filterData._address = data[i]._address;
          //filterData.PrimaryPhone = data[i].PrimaryPhone;
          filterData.SalesPhoneNumber = data[i].SalesPhoneNumber;
          filterData.ServicePhoneNumber = data[i].ServicePhoneNumber;
          filterData.latitude = dealerLatitude;
          filterData.longitude = dealerLongitude;
          filterData.DealerID = data[i].DealerID;
          filterData.Locality = data[i].Locality;
          newData.push(filterData);
        }
      }

      newData.sort(sortNum("distance"));

      if (!this.selectedLocation) {
        this.data = newData;
        if (typeof (markerList) == 'object') {

          markerList.clearData();
        }
        this.initAMapUI2();

      } else {
        this.selectedData = newData;
      }
      store.commit('hideloading');

    },

    initAMapUI2: function () {
      var _this = this;
      AMapUILoader().then(AMapUI => {
        AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
          function (MarkerList, SimpleMarker, SimpleInfoWindow) {

            //即jQuery/Zepto
            var $ = MarkerList.utils.$;

            var defaultIconStyle = 'red', //默认的图标样式
              hoverIconStyle = 'green', //鼠标hover时的样式
              selectedIconStyle = 'blue' //选中时的图标样式
              ;

            var markerList = new MarkerList({
              map: map,
              //ListElement对应的父节点或者ID
              listContainer: "myList", //document.getElementById("myList"),
              //选中后显示

              //从数据中读取位置, 返回lngLat
              getPosition: function (item) {

                return [item.longitude, item.latitude];
              },
              //数据ID，如果不提供，默认使用数组索引，即index
              getDataId: function (item, index) {

                return item.id;
              },
              getInfoWindow: function (data, context, recycledInfoWindow) {
                /* var info = "<div>213</div>"*/

                if (recycledInfoWindow) {

                  recycledInfoWindow.setInfoTitle(data._name);
                  recycledInfoWindow.setInfoBody(data._address);
                  /* recycledInfoWindow.setContent(info);*/

                  return recycledInfoWindow;
                }

                return new SimpleInfoWindow({
                  infoTitle: data._name,
                  infoBody: data._address,
                  offset: new AMap.Pixel(0, -37),
                  /*content:info*/
                });
              },
              //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
              getMarker: function (data, context, recycledMarker) {

                //var label = String.fromCharCode('A'.charCodeAt(0) + context.index);
                //var iconStyle = defaultIconStyle;
                var label = 1 + context.index;
                if (recycledMarker) {
                  recycledMarker.setIconLabel(label);
                  return;
                }
                /*   if(context.index == 0){
                     iconStyle = selectedIconStyle;
                   }*/
                return new SimpleMarker({
                  containerClassNames: 'my-marker',
                  iconStyle: defaultIconStyle,
                  iconLabel: label,
                });
              },
              //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
              getListElement: function (data, context, recycledListElement) {

                /* var label = String.fromCharCode('A'.charCodeAt(0) + context.index);

                 //使用模板创建
                 var innerHTML = MarkerList.utils.template('<div class="poi-imgbox">' +
                   '    <span class="poi-img" style="background-image:url(<%- data.pic %>)"></span>' +
                   '</div>' +
                   '<div class="poi-info-left">' +
                   '    <h3 class="poi-title">' +
                   '        <%- label %>. <%- data._name %>' +
                   '    </h3>' +
                   '    <div class="poi-info">' +
                   '        <span class="poi-price">' +
                   '            <%= data.price %>' +
                   '        </span>' +
                   '        <p class="poi-addr"><%- data._address %></p>' +
                   '    </div>' +
                   '</div>' +
                   '<div class="clear"></div>', {
                   data: data,
                   label: label
                 });*/

                /*    if (recycledListElement) {
                      recycledListElement.innerHTML = innerHTML;
                      return recycledListElement;
                    }*/
                var className = 'mark' + (1 + context.index);
                return '<li class="poibox ' + className + '"></li>';

                /*return '<li class="poibox">' +
                  innerHTML +
                  '</li>';*/
              },
              //列表节点上监听的事件
              listElementEvents: ['click', 'mouseenter', 'mouseleave'],
              //marker上监听的事件
              markerEvents: ['click', 'mouseover', 'mouseout'],
              //makeSelectedEvents:false,
              selectedClassNames: 'selected',
              autoSetFitView: true
            });

            window.markerList = markerList;

            markerList.on('selectedChanged', function (event, info) {


              if (info.selected) {

                console.log(info);

                if (info.selected.marker) {
                  //更新为选中样式
                  info.selected.marker.setIconStyle(selectedIconStyle);
                }
                _this.selectedDealer = info.selected.data;
                _this.callServicePhoneNumber = "tel:销售:" + _this.selectedDealer.ServicePhoneNumber;
                _this.callSalesPhoneNumber = "tel:服务:" + _this.selectedDealer.SalesPhoneNumber;
                _this.selectedDealer.index = info.selected.index + 1;

                /*        //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
                        if (!info.sourceEventInfo.isListElementEvent) {

                          if (info.selected.listElement) {
                            scrollListElementIntoView($(info.selected.listElement));
                          }
                        }*/
              }

              if (info.unSelected && info.unSelected.marker) {
                //更新为默认样式
                info.unSelected.marker.setIconStyle(defaultIconStyle);
              }
            });

            markerList.on('listElementMouseenter markerMouseover', function (event, record) {

              if (record && record.marker) {

                forcusMarker(record.marker);

                //this.openInfoWindowOnRecord(record);

                //非选中的id
                if (!this.isSelectedDataId(record.id)) {
                  //设置为hover样式
                  record.marker.setIconStyle(hoverIconStyle);
                  //this.closeInfoWindow();
                }
              }
            });

            markerList.on('listElementMouseleave markerMouseout', function (event, record) {

              if (record && record.marker) {

                if (!this.isSelectedDataId(record.id)) {
                  //恢复默认样式
                  record.marker.setIconStyle(defaultIconStyle);
                }
              }
            });

            function forcusMarker(marker) {
              marker.setTop(true);

              //不在地图视野内
              if (!(map.getBounds().contains(marker.getPosition()))) {

                //移动到中心
                map.setCenter(marker.getPosition());
              }
            }

            function loadData(data) {

              markerList.render(data);


            }

            if (!_this.selectedLocation) {
              var data = _this.data;
              loadData(data);
              _this.selectedDealer = data[0];
              _this.totalDealer = data.length;
              $(".myList .poibox").eq(0).click()

            } else {
              var data = _this.selectedData;
              loadData(data);
              _this.selectedDealer = data[_this.dealerIndex];
              if (_this.dealerIndex >= 0) {

                $(".myList .poibox").eq(_this.dealerIndex).click()
              }
            }

            function scrollListElementIntoView($listEle) {

              if (!isElementInViewport($listEle.get(0))) {
                $('#panel').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
              }

              //闪动一下
              $listEle
                .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                  function (e) {
                    $(this).removeClass('flash animated');
                  }).addClass('flash animated');
            }
            function isElementInViewport(el) {
              var rect = el.getBoundingClientRect();

              return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
              );
            }





          });
      })
    },
    getDealerInfo: function (province, city, lng, lat) {
      var dealers = [];
      var _this = this;
      var urlGetDealers = 'https://yuntuapi.amap.com/datasearch/local?s=rsv3&key=1891d0f847c0a210a88015fdd4c3bc46&extensions=all&language=en&' +
        'enc=utf-8&output=jsonp&&sortrule=_distance:1&autoFitView=true&panel=result&keywords=&' +
        'limit=100&sortrule=_id:1&tableid=55adb0c7e4b0a76fce4c8dd6&radius=50000&platform=JS&logversion=2.0&' +
        'sdkversion=1.4.2&csid=6F094767-5285-454B-BC73-0D18F9C7223B',
        filter = '&city=' + city + '&filter=AdministrativeArea:' + province,
        center = '&center=' + lng + ',' + lat;
      urlGetDealers += '' + center + '' + filter;
      $.ajax({
        url: urlGetDealers,
        dataType: 'JSONP',
        type: 'GET',
        async: false
      }).done(function (response) {
        if (response.status == 1) {

          dealers = response.datas;
          _this.filterDealer(dealers, lng, lat);

        }
      }).fail(function (fail) {
        console.log(fail);
      });
    },
    getCityLocation: function (data) {
      var _this = this;
      var address;
      if (data) {
        _this.selectedCity = data[1];
        _this.selectedProvince = data[0];

        address = data[0] + data[1];
      } else {
        _this.selectedCity = '';
        _this.selectedProvince = '';
        address = this.defaultCity + this.defaultCity;
      }

      var urlGetCityLocation = '//restapi.amap.com/v3/geocode/geo?' +
        'key=1891d0f847c0a210a88015fdd4c3bc46&s=rsv3&' +
        'platform=JS&logversion=2.0&sdkversion=1.3&' +
        'csid=D6C889F7-2FF1-4EA5-8D60-494D42872518&address=' + address;
      $.ajax({
        url: urlGetCityLocation,
        dataType: 'JSONP',
        type: 'GET',
        async: false
      }).done(function (response) {
        if (response.status == 1) {
          var currentPosition = response.geocodes[0].location;
          if (_this.selectedProvince && _this.selectedCity) {

            _this.selectedLocation = true;

            _this.getDealerInfo(_this.selectedProvince, _this.selectedCity, currentPosition.split(",")[0], currentPosition.split(",")[1])
          } else {
            _this.selectedLocation = false;
            _this.getDealerInfo(_this.defaultCity, _this.defaultCity, currentPosition.split(",")[0], currentPosition.split(",")[1])
          }

        }
      }).fail(function (fail) {
        console.log(fail);
      });
    },
    getCurrentPosition: function () {
      store.commit('showloading');
      var _this = this;
      _this.data = [];
      map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 5000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: false,        //显示定位按钮，默认：true
          //buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
          //buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', _this.onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', _this.onError);      //返回定位出错信息


      });
    },
    jumpPage: function (selectedDealer) {
      console.log("jumpPage");
      var urlParam = this.$utils.getUrlKey("callBack");
      if (urlParam) {
        this.$router.push({ name: urlParam, params: { name: selectedDealer._name, address: selectedDealer._address, dealerID: selectedDealer.DealerID, } })
      }
    },
    select() {
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    isShow(msg) {
      this.show = msg.show;
      this.address = msg.result;
      this.province = msg.province;
      this.city = msg.city;
      this.dealer = msg.dealer;
      this.dealerIndex = msg.index;
      this.currentCity = this.selectedCity;
      markerList.clearData();
      this.initAMapUI2();

    }

  },

  created: function () {
/*
    if (!this.$utils.getUrlKey("callBack")) {
      document.title = "附近门店页面";
    } else {
      document.title = "经销商选择";
    }
*/

  }

};




