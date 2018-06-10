  



define(['jquery'],function ($) {

var carouselPak = (function () {
  function Carousel(carousel) {
      this.carousel = carousel
      this.init()
      this.bind()
    }

    Carousel.prototype = {
      init:function () {
        var $imgCt = this.$imgCt = this.carousel.find('.img-ct'),
            $preBtn = this.$preBtn = this.carousel.find('.btn-pre'),
            $nextBtn = this.$nextBtn = this.carousel.find('.btn-next'),
            $bullet = this.$bullet = this.carousel.find('.bullet');

        var $firstImg = $imgCt.find('li').first(),
            $lastImg = $imgCt.find('li').last();

        this.curPageIndex = 0;
        this.imgLength = $imgCt.children().length;
        this.isAnimate = false;
        this.$firstImg = $firstImg

        $imgCt.prepend($lastImg.clone())
        $imgCt.append($firstImg.clone())

        $imgCt.width($firstImg.width() * $imgCt.children().length)
        $imgCt.css('left', '-1200px')

      },
      bind:function () {
       var _this = this
       this.$preBtn.on('click', function(e){
            e.preventDefault();
            _this.playPre();
       })

       this.$nextBtn.on('click', function(e){
          e.preventDefault();
          _this.playNext();
       })  
       function setInter() {
           setInterval(function () {
            _this.playNext()
        }, 2500)  
       }
      setInter()
    
    },
    playPre:function () {
      var _this = this
       if(this.isAnimate) return;
      this.isAnimate = true;
      this.$imgCt.animate({
        left: '+=1200'
      }, function(){
        _this.curPageIndex--;
        if(_this.curPageIndex < 0){
          _this.$imgCt.css('left', -(_this.imgLength*_this.$firstImg.width()));
            _this.curPageIndex = _this.imgLength - 1
        }
        _this.isAnimate = false;
        _this.setBullet();
      }) 
      
    },
    playNext:function () {
      var _this = this
      if(this.isAnimate) return;
      this.isAnimate = true;
      this.$imgCt.animate({
        left: '-=1200'
      }, function(){
        _this.curPageIndex++;
        if(_this.curPageIndex === _this.imgLength){
          _this.$imgCt.css({'left': '-1200px'})
          _this.curPageIndex = 0
        }
        _this.isAnimate = false;
        _this.setBullet();
      })
       
    },
    setBullet:function () {
      this.$bullet.children()
             .removeClass('active')
             .eq(this.curPageIndex)
             .addClass('active')
    }
  }
  return {
    init:function ($ct) {
     $ct.each(function(index, el) {
       new Carousel($(el))
     });
    }
  }
})()

// carouselPak.init($('.carousel'))
return carouselPak

})


