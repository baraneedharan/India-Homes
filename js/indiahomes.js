$(document).ready(function() {

  var windoWidth = $(window).width();

  if(windoWidth >= 1024) {
    $('.prop-brief').waypoint('sticky');
  };

  if(windoWidth < 1024) {    
    $('.section-headers').click(function() {
        $(this).find('i').toggleClass('glyphicon-chevron-up');
        $(this).parent().find('.collapse-block').slideToggle();
    });
  };

	$("#owl-demo").owlCarousel({
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true 
  	});

  	$('.icon-neighbour').on('click', function() {
  		if($(this).parent().hasClass('open-arrow')) {
  			$(this).parent().removeClass('open-arrow');
  			$(this).parent().addClass('close-arrow');
  		} else if($(this).parent().hasClass('close-arrow')) {
  			$(this).parent().removeClass('close-arrow');
  			$(this).parent().addClass('open-arrow');
  		} else {
  			//do nothing
  		}
  	});

      var win_width=$(window).width();
      var foo_off=$("#contact_indiahomes").offset().top;
      var fil_wid=$(".prop-details-nav").width();
      var fm_off=$(".prop-details-nav").offset().top - 105;
      var fil_hei=$(".prop-details-nav").outerHeight(true);

      $(window).resize(function(){
          fil_wid=$(".prop-details-nav").width();
          fixFil();
      });
      fixFil();
      function fixFil() {
        $(window).scroll(function(){
            var foo_off = $("#contact_indiahomes").offset().top - 120;
            var m_off = $(".prop-details-nav").offset().top - 105;
            var win_scroll = $(window).scrollTop();
            if(win_scroll < foo_off-fil_hei) {        
              $(".prop-details-nav").css({"position":"fixed","top":"105px","width":fil_wid});
            };
            if(win_scroll < fm_off) {
               $(".prop-details-nav").css({"position":"relative","top":"0"});
            };
            if(win_scroll > foo_off-fil_hei) {              
              $(".prop-details-nav").css({"position":"relative","top":foo_off-fil_hei-fm_off});
            };
        });
      };

      $('.prop-navigation li > a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 105
            }, 500);
            $('.prop-navigation li').removeClass('active');
            $(this).parent().addClass('active');
            return false;
          }
        }
      });
});