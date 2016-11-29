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
    // var scale=scaley;
    this.scale=scale;
    this.scalex=scalex;
    this.scaley=scaley;
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

    $(".logo").css({
	// "width":Math.round(parseFloat($(".logo").css("width"))*scale)+"px",
	"left":Math.round(parseFloat($(".logo").css("left"))*scale)+"px",
	"top":Math.round(parseFloat($(".logo").css("top"))*scale)+"px"
    })

    $("div.title").css({
	"font-size":parseFloat($(".title").css("font-size"))*scale+"px",
	// "left":Math.round(this.ml+parseFloat($(".logo").css("width")))+"px",
    // "height":Math.round(parseFloat($(".title").css("height"))*scale)+"px",
	"width":Math.round(0.96*bgw)+"px"
    })

    // $("span.title").css({
	// "margin-left":Math.round(parseFloat($(".logo").css("width")))+"px",
	// "width":Math.round(bgw - parseFloat($(".logo").css("width")))+"px"
    // })

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
	    // "left":(parseFloat($(this).css("left"))*scale)+"px",
	    // "top":(parseFloat($(this).css("top"))*scale)+"px",
	    // "width":(parseFloat($(this).css("width"))*scale)+"px",
	    // "height":(parseFloat($(this).css("height"))*scale)+"px",
	    //"z-index":20,
	    //"border":"1px red solid"
	})
	if (($(this).hasClass("past"))||($(this).hasClass("today"))){
	    //console.log('in past')
        console.log(parseFloat($(this).find(".num").css("line-height")));
	    $(this).find(".num").css({
		// "left":(parseFloat($(this).css("width"))*scale)+"px",
        // "font-size":(parseFloat($(this).css("font-size"))*(scale))+"px",
        // "line-height":(parseFloat($(this).css("line-height"))*(scale))+"px"
	    })
        console.log($(this).find(".num").css("line-height"));
        $(this).find(".numb").css({
		// "left":(parseFloat($(this).css("width"))*scale)+"px",
        // "font-size":(parseFloat($(this).css("font-size"))*(scale))+"px"
	    })
	};
    });

}

advent.prototype.setup = function(){

    //this.scaleimg()
    console.log('setting up');
    var _ad=this;
    _ad.dayinfo_url="./dayinfo.json";
    console.log(_ad.dayinfo_url);
    $.ajaxSetup({async:true,'beforeSend': function(xhr){
        // console.log(this);
        if (xhr.overrideMimeType) xhr.overrideMimeType("text/plain"); },
        datatype:'json',
        success:function(json){}
    });
    // Get the JSON file
    $.getJSON(_ad.dayinfo_url,function(data){
        _ad.daydata=data;
        _ad.makeimgs();
        _ad.scaleimg();
    })

    console.log('set up');


}

advent.prototype.makeimgs = function(){
    var _ad=this;
    console.log(this.daydata);
    var dat=this.daydata;
    bgimg=$(".bgimg");
    for(day in dat){
        d=dat[day];
        d.n=parseInt(d.n);
        daybox='<!--Day '+d.n+'-->'+
        '<div class="day" id="d'+d.n+'">\n'+
        '<div class="grey"></div>\n'+
        '<div class="day-img"><img class="day-img" src="empty_door.png"></div>\n'+
      	'<div class="notyet">'+
        // '<img class="notyet" src="not_yet.png">'+
        '</div>\n'+
      	'<div class="obj-img"><img class="obj-img" src="'+d.thumbsrc+'"></div>\n'+
      	'<a class="fancybox" href="#fb'+d.n+'">\n'+
        '<div class="obj-link"></div></a>\n'+
      	'<div class="numb">'+d.n+'</div></a>\n'+
        '<div class="num">'+d.n+'</div>\n'+
        '</div>\n\n';

        // infobox='<div class="fbouter">\n'+
    	// '  <div class="fbday" id="fb'+d.n+'">\n'+
    	// '    <h1 class="info">'+d.name+'</h1>\n'+
    	// '    <div class="infoimg">'+
    	// '<a alt="More information" target="_top" href="'+d.infolink+'">'+
        // '<img class="infoimg" alt="'+d.name+'" src="'+d.imgsrc+'"></a>'+
    	// '</div>\n'+
    	// '    <div class="infotxt">\n'+
        // '      <p class="notes">'+d.text+'</p>'+
        // '<p class="more"><a alt="More information" target="_blank" href="'+d.infolink+'">Read more...</a></p>\n'+
    	// '    </div>\n'+
    	// '    <div class="fbclear"></div>\n'+
    	// '  </div>\n'+
    	// '</div>\n\n';
        infobox='<div class="fbouter">\n'+
    	'  <div class="fbday" id="fb'+d.n+'">\n'+
    	'    <h1 class="info">'+d.name+'</h1>\n'+
        '    <div class="infotxt">\n'+
        '      <div class="infoimg">'+
    	'        <a alt="More information" target="_top" href="'+d.infolink+'">'+
        '<img class="infoimg" alt="'+d.name+'" src="'+d.imgsrc+'"></a>'
        if (d.imgcredit){
            infobox=infobox+
            '<p class="credit">Credit: '+d.imgcredit+'</p>'
        }
        infobox=infobox+'</div>'+
    	'      <p class="notes">'+d.text+'</p>'+
        '<p class="more"><a alt="More information" target="_blank" href="'+d.infolink+'">Read more...</a></p>\n'+
    	'    </div>\n'+
    	'    <div class="fbclear"></div>\n'+
    	'  </div>\n'+
    	'</div>\n\n';
        bgimg.append(daybox);
        bgimg.append(infobox);
    }

    // figure out which images are today
    $('div.day').each(function(i){
	daynum=$(this).find('.num').html()
	if (_ad.yy != thisyear){
	    $(this).addClass('past').removeClass('future')
	    //console.log(daynum+' past (later year)')
	} else if (_ad.mm == 12){
	    //console.log(mm)
	    if (daynum < _ad.dd){
		$(this).addClass('past').removeClass('future')
		//$(this).find('.grey').removeClass('grey').addClass('black')
		//$(this).find('.num').css({
		//"color":"red"
		//})
		//console.log(daynum+' past')
    } else if (daynum == _ad.dd){
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

    //define links
    $('div.today').on("mouseenter mousedown",function(){
	$(this).addClass('open').removeClass('closed')
	$(this).find('.obj-img').fadeIn(500)
	$(this).find('div.obj-link').css({
	    "display":"block"
	})
    })

    // set fancybox settings
    $(document).find(".fancybox").fancybox({
	'transitionIn': 'fade',
       	'transitionOut': 'fade',
       	'type': 'inline',

	'autoDimensions': 'true'
    });

};

$(document).ready(function(){

    $(window).on("resize",{me:adv},function(e){
	//e.data.me.scaleimg();
    });



})
