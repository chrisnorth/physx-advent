$(document).ready(function(){
	
	
	startup();
	
	$("*").disableTextSelect();
	
	$("video").media();
	
	$("video").css("display","none"),1000;
	
	$("a.fancybox").fancybox();

	
	//back button
	$('a.button.back').live('click',function(){
		//Move back
		if(snum > 0){
			goTo(snum - 1);
			return false;
		}else{
			return false;
		}
	});
	
	//next button
	$("a.button.next").live('click',function(){
		//move forward
		if(snum < (smax -1)){
			goTo(snum + 1);
			return false;
		}else{
			return false;
		}
	});
	
	//go to section
	$('.main-menu').click(function(){
		var section = "section-" + $(this).attr('id');// Section name
		var sectionNum = $('.slide.' + section+":first").attr('id');
		sectionNum = sectionNum.replace("slide","");
		//alert(sectionNum);
		goTo(sectionNum);
		return false;
	});
	
	$(".nav").click(function(){
		var navItem = $(this);
		var Nav = $(this).attr("class").split(" ");
		var NavID = Nav[1].split("-");
		
		var navSection = $(".slide").filter(function(index){
			return $(this).hasClass($(navItem).parent().attr("id")) == true;
		}).filter(function(index){
			return $(this).children(".nav-id").text() == NavID[1];
		}).attr("id");
		
		var slideID = navSection.replace("slide", "");
		
		goTo(slideID)
	});   
	
//End of document.ready	
});

//undate the navigation side menu when slide is changed.
function updateNav(cs){
	
	//Reset
	$('#section-nav').css("visibility","hidden");
	$("#section-nav").find(".nav").css("visibility","hidden");
	$('.nav').removeClass('highlight');
	
	//Set Variables for current Slide
	var slide = "slide"+cs;
	var navName = '';
	var navID = '';
	navName = $("#"+slide).attr('class');
	navName = navName.replace("slide ", "");
	
	if(cs != 0){
		//If not slide0 then display the appropriate section-nav
		$('#section-nav').css("visibility","visible");
		$("#section-nav #"+navName+" .nav").css("visibility","visible");
		
		//Get Nav ID
		navID = $("#"+slide+" .nav-id").text();
		
		if(navID != ''){
			//If there is a nav ID set, make it highlighted...
			$("#section-nav #"+navName+" .nav-"+navID).addClass("highlight");	
		}
	}
	$("video").css("display","none");
	$("#"+slide+ " video").css("display","block");
	
}