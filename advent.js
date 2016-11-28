function advent(){

    return this;

}

advent.prototype.scaleimg = function(){

    var w=$(window).width();
    var h=$(window).height() - 20;
    var el=$(".bgimg .bg");
    var scalex=w/el.outerWidth();
    var scaley=h/el.outerHeight();
    var scale = (scalex < scaley ? scalex : scaley);
    //console.log(w,h,scale);

    /*el.css({
	"width":parseInt(parseInt(el.css("width"))*scale)+"px",
	"height":"auto"
    })*/

    bgw=Math.round(parseFloat($(".bgimg").css("width"))*scale);
    bgh=Math.round(parseFloat($(".bgimg").css("height"))*scale);
    this.bgw=bgw
    this.bgh=bgh
    this.scale=scale
    this.ml=(w - this.bgw)/2
    $(".bgimg").css({
	"width":bgw+"px",
	"height":bgh+"px",
    })

    $(".advent").css({
	"left":this.ml+"px",
	"width":bgw+"px",
	"height":bgh+"px"
    })

    $(".title-bg").css({
	"height":parseFloat($(".title-bg").css("height"))*scale+"px",
	"width":bgw+"px"
    })

    $(".herlogo").css({
	"width":Math.round(parseFloat($(".herlogo").css("width"))*scale)+"px",
	"left":Math.round(parseFloat($(".herlogo").css("left"))*scale)+"px",
	"top":Math.round(parseFloat($(".herlogo").css("top"))*scale)+"px"
    })

    $("div.title").css({
	"font-size":parseFloat($(".title").css("font-size"))*scale+"px",
	"left":Math.round(this.ml+parseFloat($(".herlogo").css("width")))+"px",
	"width":Math.round(bgw - 2* parseFloat($(".herlogo").css("width")))+"px"
    })

    //$("span.title").css({
	//"margin-left":Math.round(parseFloat($(".herlogo").css("width")))+"px"
	//"width":Math.round(bgw - parseFloat($(".herlogo").css("width")))+"px"
    //})

    if ($(".title").css("display") != "none"){
	////console.log(title.css("display"));
	$(".logo").css({
	    "top":parseFloat($(".title").css("font-size"))*scale+16+"px"
	})
    }

    $("div.day").each(function(i){
	daynum=$(this).find('.num').html()
	//console.log($(this),$(this).css("left"),$(this).css("top"),daynum);
	$(this).css({
	    "left":(parseFloat($(this).css("left"))*scale)+"px",
	    "top":(parseFloat($(this).css("top"))*scale)+"px",
	    "width":(parseFloat($(this).css("width"))*scale)+"px",
	    "height":(parseFloat($(this).css("height"))*scale)+"px",
	    //"z-index":20,
	    //"border":"1px red solid"
	})
	if ($(this).hasClass("past")){
	    //console.log('in past')
	    $(this).find(".num").css({
		"left":(parseFloat($(this).css("width"))*scale)+"px"
	    })
	};
    });

}

advent.prototype.setup = function(){

    //this.scaleimg()

    // draw initial paper
    //bgw=parseInt($(".bgimg").css("width"));
    //bgh=parseInt($(".bgimg").css("height"));
    //bgw=this.bgw
    //bgh=this.bgh
    //this.drawlines();

}

$(document).ready(function(){

    //var irl;
    //var tirr;
    //var birr;

    adv = new advent()
    adv.setup()

    //Check current date

    var d = new Date();
    var yy = d.getFullYear();
    var mm = d.getMonth(); //month is 0-11 (so 11 is December)
    var dd = d.getDate();

    //Manually set date for testing
    /*yy=2012
    mm=11
    dd=25*/

    var months = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

    datestr=dd+'-'+months[mm]+'-'+yy
    //console.log(dd,mm,yy,datestr)

    $('span.date').html(datestr)

    $('div.day').each(function(i){
	daynum=$(this).find('.num').html()
	if (yy != thisyear){
	    $(this).addClass('past').removeClass('future')
	    //console.log(daynum+' past (later year)')
	} else if (mm == 11){ //month is 0-11 (so 11 is December)
	    //console.log(mm)
	    if (daynum < dd){
		$(this).addClass('past').removeClass('future')
		//$(this).find('.grey').removeClass('grey').addClass('black')
		//$(this).find('.num').css({
		//"color":"red"
		//})
		//console.log(daynum+' past')
	    } else if (daynum == dd){
		$(this).addClass('today').addClass('closed').removeClass('future')
		//$(this).find('.num').css({
		//"color":"blue"
		//})
		//console.log(daynum+' today')
	    } else{
		$(this).addClass('future')
		//console.log(daynum+' future')
	    }
	} else {
	    $(this).addClass('future')
	    //console.log(daynum+' future (wrong month)')
	}

    });

/*    $('div.past').each(function(i){
	$(this).on("mouseover",function(e){
	    $(this).find(".num").css({
		"font-size":"4em"
	    })
	    $(this).find(".numb").css({
		"font-size":"4em"
	    })
	}).on("mouseout",function(e){
	    $(this).find(".num").css({
		"font-size":"2em"
	    })
	    $(this).find(".numb").css({
		"font-size":"2em"
	    })
	})
    });*/

/*    $('div.future').each(function(i){
	$(this).on("mouseover",function(e){
	    $(this).find(".numb").css({
		"opacity":1
	    })
	    $(this).find("div.notyet").css({
		"opacity":0.5
	    })
	}).on("mouseout",function(e){
	    $(this).find(".numb").css({
		"opacity":0
	    })
	    $(this).find("div.notyet").css({
		"opacity":0
	    })
	})
    });*/

/*    $('div.today').each(function(i){
	$(this).on("mouseover",function(e){
	    $(this).css({
		"border":"1px solid #ff5555"
	    })
	    $(this).find(".numb").css({
		"opacity":1
	    })
	}).on("mouseout",function(e){
	    $(this).css({
		"border":"1px solid #ffffff"
	    })
	    $(this).find(".numb").css({
		"opacity":0
	    })
	})
    });*/

    $(window).on("resize",{me:adv},function(e){
	//e.data.me.scaleimg();
    });

    $('div.today').on("mouseenter mousedown",function(){
	$(this).addClass('open').removeClass('closed')
	$(this).find('.obj-img').fadeIn(500)
	$(this).find('div.obj-link').css({
	    "display":"block"
	})
	/*$(this).find('.numb').css({
	    "font-size":"2em"
	})*/
    })

    $(this).find(".fancybox").fancybox({
	'transitionIn': 'fade',
       	'transitionOut': 'fade',
       	'type': 'inline',

	'autoDimensions': 'true'
    });


})
