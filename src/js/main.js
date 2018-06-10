define(['jquery','carousel','waterflow','gotop'],function ($,carouselPak,waterFlowPak,Gotop) {
	new Gotop(null,$('.gotop-cont'))
	waterFlowPak.init($('.newsFlow-cont'))
	carouselPak.init($('.carousel'))

})