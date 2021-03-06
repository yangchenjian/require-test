define(['jquery'],function ($) {

  function WaterFlow($cont) {
    this.$cont = $cont
    this.init()    
    this.bind()
}

WaterFlow.prototype = {
  init:function () {
    var newsList = this.newsList = this.$cont.find('.news-ct'),
        nodeWidth = this.nodeWidth = this.$cont.find('.news-ct>li').outerWidth(true),
        colNum = this.colNum = parseInt(this.$cont.find('.news-ct').width()/nodeWidth),
        loadFlag = this.loadFlag = this.$cont.find('#load'),
        colSumHeight = this.colSumHeight = [];
        this.newsNum = 8;
        this.pageIndex = 0;
        for (var i = 0; i<colNum;i++) {
          colSumHeight[i] = 0
        }
  },
  bind:function () {
    var _this = this
    this.process()
    $(window).scroll(function() {
      if (_this.isShow(_this.loadFlag)) {
        _this.process()
      }
    });
  },
  getData:function (callbak) {
    var _this = this
     $.ajax({
      url: 'https://platform.sina.com.cn/slide/album_tech',
      type: 'GET',
      dataType: 'jsonp',
      jsonp:'jsoncallback',
      data: {
       app_key: '1271687855',
       num: this.newsNum,
       page: this.pageIndex
      }
    })
    .done(function(resText) {
      if (resText && resText.status && resText.status.code === '0') {
        callbak(resText.data)
         _this.pageIndex++
      } else {
        console.log('服务器没问题，请求有问题')
      } 
    })
    .fail(function() {
      console.log("服务器异常");
    })
  },
  getNode:function (news) {
     var html = ''
     html+='<li>'
     html+='<a href="'+news.url+'"><img src="'+news.img_url+'"></a>'
     html+='<h4>'+news.short_name+'</h4>'
     html+='<p class="summary">'+news.short_intro+'</p>'
     html+='</li>'
     return $(html) 
  },
  render:function ($nodes) {
       var _this = this
       var idx = 0
       var minSumHeight = this.colSumHeight[0];

       for(var i = 0;i<_this.colSumHeight.length;i++){
        if ( _this.colSumHeight[i]<minSumHeight) {
          idx = i;
          minSumHeight = _this.colSumHeight[i];
        }
      }
      $nodes.css({
        left: _this.nodeWidth*idx,
        top: minSumHeight
      })
    this.colSumHeight[idx] =  $nodes.outerHeight(true)+this.colSumHeight[idx]
    this.newsList.height(Math.max.apply(null,this.colSumHeight))

  },
  process:function () {
      var _this = this
      this.getData(function(newsList){
        $.each(newsList,function (indx,item) {
          var $node = _this.getNode(item)
          $node.find('img').load(function() {
            _this.newsList.append($node)
            _this.render($node)
          });
        })
      })
  },
  isShow:function ($node) {
        var windowHeight = $(window).height(),
        offsetTop = $node.offset().top,
        scrollTop = $(window).scrollTop(),
        nodeHeight = $node.outerHeight()
        if( windowHeight + scrollTop > offsetTop && offsetTop + nodeHeight>scrollTop){
          return true
        }
        return false
      }
}

var  waterFlowPak = (function () {
  return{
    init:function ($cont) {
      $cont.each(function (idx,ele) {
        new WaterFlow($(ele))
      })
    }
  }
})()
// waterFlowPak.init($('.newsFlow-cont'))


return waterFlowPak



})  


// -------------------瀑布流封装----------------------








