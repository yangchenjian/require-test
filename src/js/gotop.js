

define(['jquery'],function ($) {
  

  
  // ----------封装返回顶部---------
function Gotop($cont,$ele) {
  this.$cont = $cont||$('body ,html')
  this.$ele = $ele
  this.bind()
}
Gotop.prototype = {
  bind:function () {
    this.showOrhide()
    this.action()
  },
  showOrhide:function () {
    var _this = this
    $(window).on('scroll',function () {
      var bodyScrTop = _this.$cont.scrollTop()
      if (bodyScrTop>300) {
        _this.$ele.fadeIn(300)
      }else{
        _this.$ele.fadeOut(300)
      }
    })
  },
  action:function () {
    var _this = this
    this.$ele.on('click',function () {
      _this.$cont.animate({
        scrollTop: 0
      },500);
    })
  }
} 

// new Gotop(null,$('.gotop-cont'))
return Gotop








})



