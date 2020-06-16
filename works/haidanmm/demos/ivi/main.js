(function () {

    var appendElement = function(node,html){
        var temp = document.createElement('div');
        temp.innerHTML = html;
        node.appendChild(temp.firstChild);
    }

    var hasClass = function(node,className){
        var n = node.classList;
        if(n && n.length > 0){
            return n.contains(className);
        }
        return false;
    }

    var closest = function(node,className){
        if(hasClass(node,className)){
            return node;
        }else{
            if(node.parentNode){
                return closest(node.parentNode,className);
            }
        }
        return null;
    }

    var carousel = function (config) {
        this.options = Object.assign({}, {
            datas: [],
            width : 1920,
            height : 720,
            cardsOnScreen: 4,
            initialIndex : 0,
            rootClassName : 'screen',
            containerClassName : 'carousel',
            warpperClassName : 'carousel-warpper',
            cardCurrentClassName : 'card-current'
        }, config);


        this.datas = this.options.datas;

        var root = document.getElementsByClassName(this.options.rootClassName)[0];
        appendElement(root,'<div class="carousel"></div>');
        appendElement(root,'<div class="carousel-warpper"><a class="close" href="javascript:void(0);"><img style="height: 43px;" src="./close.png"></a><div class="carousel-warpper-item"></div></div>');


        this.container = document.getElementsByClassName(this.options.containerClassName)[0];
        this.warpper = document.getElementsByClassName(this.options.warpperClassName)[0];

        this.cardsPositions = []; // 卡片位置
        this.carouselXPos = 0;

        // 控制当前最大化位置
        this.growStartLeft = 20;
        this.bigFullleft = this.growStartLeft + 70;
        this.bigEndRight = this.bigFullleft + 205;
        this.shrinkEndRight = this.bigEndRight + 120;
        this.datas = this.options.datas || [];
    
        if(!(this.datas && this.datas.length > 0)){
            return null;
        }

        this.carouselHeight = this.options.height / 2;
        this.bigWidth = 0.239 * this.options.width; // 卡片最大宽度
        this.bigHeight = .75 * this.carouselHeight; // 最大高度

        this.littleWidth = .146 * this.options.width; // 卡片最小宽度
        this.littleHeight = .462 * this.carouselHeight; // 最小高度
        this.activeIndex = 0;

        this.init();
    };

    carousel.prototype = {
        init: function () {
            var opt = this.options;

            for(var i = 0;i< this.datas.length; i++){
                var da = this.datas[i];
                var isVideo = da.type === 'video';

                appendElement(this.container,['<div class="card" data-index="'+i+'">',
                            '<div class="card-content">',
                                '<div class="card-content-title"><span>' + da.month + '</span></div>',
                                '<div class="card-content-' + da.type + '">',
                                    '<img ondragstart="return false;" src="' + da.image + '" />',
                                    isVideo ? '<button class="video-play-button" type="button" title="Play Video"><span class="play-button-img"></span></button>' : '',
                                '</div>',
                                '<div class="card-content-message">',
                                    '<div class="card-content-message-title"><span>' + da.title + '</span></div>',
                                    '<div class="card-content-message-times"><span>' + da.times + '</span></div>',
                                '</div>',
                            '</div>',
                        '</div>'].join(''));
            }
           
            var interval = (opt.width / opt.cardsOnScreen);
            this.cards = document.getElementsByClassName('card');

            for (var i = 0; i < this.cards.length; i++) {
                this.cardsPositions[i] = interval * i;
            }

            var that = this;
            // 更改位置
            var changePosition = function () {
                var cards = that.cards;

                for (var i = 0; i < cards.length; i++) {
                    var current = cards[i];
                    var position = that.cardsPositions[i];
                    that.setCardPosition2(current, position);
                }

                requestAnimationFrame(changePosition);
            }
            requestAnimationFrame(changePosition);
            // // changePosition();

            // // 绑定滑动事件
            this.bindEvents();

            this.updateActiveIndex(opt.initialIndex);
        },
        // // 初始化系统支持的绑定事件
        // initTouchEvents: function () {
        //     var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        //     var desktop = ['mousedown', 'mousemove', 'mouseup'];

        //     if (Support.pointerEvents) {
        //         desktop = ['pointerdown', 'pointermove', 'pointerup'];
        //     }

        //     this.touchEventsTouch = {
        //         start: touch[0],
        //         move: touch[1],
        //         end: touch[2],
        //         cancel: touch[3]
        //     };
        //     this.touchEventsDesktop = {
        //         start: desktop[0],
        //         move: desktop[1],
        //         end: desktop[2]
        //     };
        //     this.touchEvents = Support.touch ? this.touchEventsTouch : this.touchEventsDesktop;
        // },
        // /**
        //  * 设置卡片所在位置
        //  * @param {*} card 当前卡片
        //  * @param {*} position 当前卡片所在位置
        //  */
        // setCardPosition: function (card, position) {
        //     var h, w;
        //     var x = this.carouselXPos + position;

        //     if (x < this.growStartLeft) {
        //         h = this.littleHeight;
        //         w = this.littleWidth;
        //         x = x / 1.3;
        //     }

        //     if (x > this.growStartLeft && x <= this.bigFullleft) {
        //         var progess = (x - this.growStartLeft) / (this.bigFullleft - this.growStartLeft);
        //         h = this.littleHeight + ((this.bigHeight - this.littleHeight) * progess);
        //         w = this.littleWidth + ((this.bigWidth - this.littleWidth) * progess * progess);
        //         x = (x - (w / 3));
        //     }

        //     if (x > this.bigFullleft && x <= this.bigEndRight) {
        //         h = this.bigHeight;
        //         w = this.bigWidth;
        //         x = (x - (w / 3));
        //     }


        //     if (x > this.bigEndRight && x <= this.shrinkEndRight) {
        //         var progess = (x - this.bigEndRight) / (this.shrinkEndRight - this.bigEndRight);
        //         h = this.bigHeight - ((this.bigHeight - this.littleHeight) * progess);
        //         w = this.bigWidth - ((this.bigWidth - this.littleWidth) * (progess * progess));
        //         x = (x / .95);
        //     }

        //     if (x > this.shrinkEndRight) {
        //         h = this.littleHeight;
        //         w = this.littleWidth;
        //         x = x / 1.3;
        //     }

        //     card.style.height = h + "px";
        //     card.style.width = w + "px";
        //     card.style.left = x + "px";
        // },
        setCardPosition2: function (card, position) {
            var index = card.getAttribute('data-index');
            var h, w;
            var x = this.carouselXPos + position;
            if (x < this.growStartLeft) {
                h = this.littleHeight;
                w = this.littleWidth;
                x = x / 1.3;
            }

            if (x > this.growStartLeft && x < this.shrinkEndRight) {
                var scale = Math.sin(((x - this.growStartLeft) * Math.PI / ((this.shrinkEndRight - this.growStartLeft))));
                h = this.littleHeight + (100 * scale);
                w = this.littleWidth + (100 * scale);
                x = x / 1.3;
                this.updateBackGround(index);
            }

            if (x > this.shrinkEndRight) {
                h = this.littleHeight;
                w = this.littleWidth;
                x = x / 1.2;
            }

            card.style.height = h + "px";
            card.style.width = w + "px";
            card.style.left = x + "px";
        },
        updateActiveIndex: function (index) {
            var pos = this.cardsPositions[index];
            this.carouselXPos = this.bigEndRight - pos;
            this.activeIndex = index;
            this.updateBackGround(index);
        },
        updateBackGround: function (index) {
            var opt = this.options;
            var card = this.cards[index];
            if(!hasClass(card,opt.cardCurrentClassName)){
                var da = this.datas[index];
                da && (this.container.style['backgroundImage']='url("' + da.image + '")');

                this.activeIndex = index;
                var curr = document.getElementsByClassName(opt.cardCurrentClassName)[0];
                curr && (curr.classList.remove(opt.cardCurrentClassName));
                card.classList.add(opt.cardCurrentClassName);

                for (var i = 0; i < this.cards.length; i++) {
                    this.cards[i].classList.add("snap");
                }
            }
        },
        makeNotBouncy : function(){
            for (var i = 0; i < this.cards.length; i++) {
                this.cards[i].classList.remove("snap");
            }   
        },
        // /**
        //  * 添加卡片对应播放器
        //  * @param {*} card 卡片
        //  * @param {*} item 卡片隐藏项
        //  * @param {*} data 卡片数据
        //  * @param {*} index 卡片索引
        //  */
        // addPlayer : function(card,item,data,index){
        //     var videoId = 'video'+index;
        //     var videoOptions = data.options;

        //     item.append('<video-js id="'+videoId+'" style="width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;" data-video-id="'+videoOptions.videoId+'" data-account="'+videoOptions.accountId+'" data-player="'+videoOptions.playerId+'" data-embed="default" data-application-id class="video-js" controls muted preload="none"></video-js>');

        //     // Add and execute the player script tag
        //     var s = document.createElement('script');
        //     s.src = "https://players.brightcove.net/" + videoOptions.accountId + "/" + videoOptions.playerId + "_default/index.min.js";
        //     document.body.appendChild(s);
        //     s.onload = function(){
        //         var player = bc(videoId);
		// 	    // player.muted(true);
        //         player.autoplay(false); // 默认不自动播放
        //         card.data('player',player);
        //     };
        // },
        bindEvents: function () {
            // 初始化可绑定事件
            var that = this;
            var dragClickStartX = null; // if not dragging this is null
            var dragClickEndX = 0;
            var isMoving = false;

            /**
             * 触摸开始事件
             * @param {*} event 
             */
            function onTouchStart(event) {
                dragClickStartX = event.touches ? event.touches[0].clientX : event.clientX;
                isMoving = false;
                console.log('------------------on touch start --------------')
            }

            function onTouchMove(event) {
                this.makeNotBouncy();

                if (dragClickStartX == null) {
                    return;
                }

                if (event.cancelable) {
                    event.preventDefault();
                }

                // var rect = this.getBoundingClientRect();
                var dragClickCurrentX = event.touches ? event.touches[0].clientX : event.clientX;
                console.log('-> ' + dragClickCurrentX + "  " + dragClickStartX);
                if (dragClickCurrentX - dragClickStartX != 0) {
                    isMoving = true;
                    that.carouselXPos = dragClickCurrentX - dragClickStartX + dragClickEndX;
                }
                console.log('------------------on touch move --------------')
            }

            function onTouchEnd(event) {
                dragClickStartX = null;
                dragClickEndX = this.carouselXPos;
                
                console.log('------------------on touch end --------------')

                if (!isMoving) { // 非移动，点击
                    var target = event.target;

                    var card = closest(target,'card');
                    
                    if(card){
                        var index = card.getAttribute('data-index');
                        if (hasClass(card,this.options.cardCurrentClassName)) {
                            this.showCardInfo(index);
                        }else{
                            this.updateActiveIndex(index);
                        }
                    }
                }
            }

            /**
             * 绑定的click事件
             * @param {*} event 
             */
            function onClick(event) {
                // event.preventDefault();
                // event.stopPropagation();
                // event.stopImmediatePropagation();
                console.log('-------------------onClick----------------------: ' + dragClickStartX);
            }

            this.onTouchStart = onTouchStart.bind(this);
            this.onTouchMove = onTouchMove.bind(this);
            this.onTouchEnd = onTouchEnd.bind(this);
            this.onClick = onClick.bind(this);

            this.container.addEventListener('touchstart', this.onTouchStart, false);
            this.container.addEventListener('touchmove', this.onTouchMove, false);
            this.container.addEventListener('touchend', this.onTouchEnd, false);
            this.container.addEventListener('touchcancel', this.onTouchEnd, false);

            this.container.addEventListener('mousedown', this.onTouchStart, false);
            this.container.addEventListener('mousemove', this.onTouchMove, false);
            this.container.addEventListener('mouseup', this.onTouchEnd, false);

            // 关闭卡片详情
            this.warpper.getElementsByClassName('close')[0].onclick = function(){
                that.hideCardInfo();
            };
            // this.container.addEventListener('click', this.onClick, false);

        },
        showCardInfo : function(index){
            var da = this.datas[index];
            var isVideo = da.type === 'video';

            var item = this.warpper.getElementsByClassName('carousel-warpper-item');
            if(isVideo){
                var videoId = 'video'+index;
                var videoOptions = da.options;

                
                appendElement(item[0],'<video-js id="'+videoId+'" style="width: 100%; height: 100%; " data-video-id="'+videoOptions.videoId+'" data-account="'+videoOptions.accountId+'" data-player="'+videoOptions.playerId+'" data-embed="default" data-application-id class="video-js" controls muted preload="none"></video-js>');

                // Add and execute the player script tag
                var s = document.createElement('script');
                s.src = "https://players.brightcove.net/" + videoOptions.accountId + "/" + videoOptions.playerId + "_default/index.min.js";
                document.body.appendChild(s);
                s.onload = function(){
                    var player = bc(videoId);
                    // player.muted(true);
                    player.autoplay(true); // 默认不自动播放
                };
            }else{
                appendElement(item[0],'<img src="'+da.image+'" style="height:100%;"/>');
            }
            
            this.warpper.style.display = 'block';


            // var warpper = $(".carousel-warpper");
            // var index = card.data('index');
            // var type = card.data('type');

            // !warpper.hasClass('show') && warpper.addClass('show');

            // $('.carousel-warpper-item.current').removeClass('current');
            // warpper.find('.carousel-warpper-item').eq(index).css('display','block');
        },
        hideCardInfo : function(){
            this.warpper.style.display = 'none';
            var item = this.warpper.getElementsByClassName('carousel-warpper-item');
            var childNodes = item[0].childNodes;
            if(childNodes && childNodes.length > 0){
                for(var i = 0; i<= childNodes.length;i++){
                    var child = childNodes[i];
                    item[0].removeChild(child);
                }
            }
        }
    }

    var json = [{
        month: "10月2日",
        type: "video",
        image: "https://www.ford.com.cn/content/ford/cn/zh_cn/home/performance/2020-Mustang-NEWModel/_jcr_content/par/common_box_1608772476/generalParsys/brandgallery/image2/image.imgs.full.high.jpg/1576224774572.imgs.full.high.jpg/1576392637297.jpg",
        title: "用车小贴士",
        times: "2231次观看",
        options : {
            accountId: '5327370822001',
            playerId: 'default',
            videoId: '5717317594001'
        }
    }, {
        month: "9月11日",
        type: "image",
        image: "https://www.ford.com.cn/content/ford/cn/zh_cn/home/cars/allnewtaurus/gallery/_jcr_content/par/gallerycategory_1303674477/generalParsys,%20decorationTagName='div'/image_2100169546/image.imgs.full.high.jpg/1568097056663.imgs.full.high.jpg/1565761257565.jpg",
        title: "用车小贴士",
        times: "2231次观看"
    }, {
        month: "8月7日",
        type: "image",
        image: "https://www.ford.com.cn/content/ford/cn/zh_cn/home/cars/allnewtaurus/_jcr_content/par/common_box_211414444/generalParsys/brandgallery/image3/image.imgs.full.high.jpg/1568097055046.imgs.full.high.jpg/1565761413272.jpg",
        title: "用车小贴士",
        times: "2231次观看"
    }, {
        month: "7月6日",
        type: "image",
        image: "https://www.ford.com.cn/content/ford/cn/zh_cn/home/cars/allnewtaurus/_jcr_content/par/common_box_211414444/generalParsys/brandgallery/image4/image.imgs.full.high.jpg/1568097051131.imgs.full.high.jpg/1565761444087.jpg",
        title: "用车小贴士",
        times: "2231次观看"
    }, {
        month: "6月11日",
        type: "image",
        image: "https://www.ford.com.cn/content/ford/cn/zh_cn/home/cars/allnewtaurus/_jcr_content/par/common_box_211414444/generalParsys/brandgallery/image5/image.imgs.full.high.jpg/1568097048967.imgs.full.high.jpg/1590041541948.jpg",
        title: "用车小贴士",
        times: "2231次观看"
    }, {
        month: "5月25日",
        type: "image",
        image: "https://www.ford.com.cn/content/ford/cn/zh_cn/home/cars/allnewtaurus/_jcr_content/par/common_box_211414444/generalParsys/brandgallery/image6/image.imgs.full.high.jpg/1568097058425.imgs.full.high.jpg/1565761541932.jpg",
        title: "用车小贴士",
        times: "2231次观看"
    }, {
        month: "4月16日",
        type: "image",
        image: "https://www.ford.com.cn/content/ford/cn/zh_cn/home/cars/allnewtaurus/_jcr_content/par/common_box_211414444/generalParsys/brandgallery/image7/image.imgs.full.high.jpg/1568097052286.imgs.full.high.jpg/1565761571963.jpg",
        title: "用车小贴士",
        times: "2231次观看"
    }, {
        month: "3月20日",
        type: "image",
        image: "https://www.ford.com.cn/content/ford/cn/zh_cn/home/cars/allnewtaurus/gallery/jcr:content/par/gallerycategory_1303674477/generalParsys,%20decorationTagName='div'/image_861999811/image.imgs.full.high.jpg/1568097044078.imgs.full.high.jpg/1565762105297.jpg",
        title: "用车小贴士",
        times: "2231次观看"
    }, {
        month: "2月28日",
        type: "image",
        image: "https://www.ford.com.cn/content/ford/cn/zh_cn/home/cars/allnewtaurus/gallery/_jcr_content/par/gallerycategory_1303674477/generalParsys,%20decorationTagName='div'/image_1501186383/image.imgs.full.high.jpg/1568097066037.imgs.full.high.jpg/1565762253747.jpg",
        title: "用车小贴士",
        times: "2231次观看"
    }];

    new carousel({
        datas: json
    });

})()
