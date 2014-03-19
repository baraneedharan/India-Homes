 $(document).ready(function() {

      //Odometer Timer
      setTimeout(function(){
          odometer.innerHTML = 11509;
          odometer1.innerHTML = 10346;
          odometer2.innerHTML = 8837;
          odometer3.innerHTML = 3636;
      }, 1000);


      // Banner height
      win_width = $(window).width();
      if(win_width < 767 ) {
        $(".banner, .banner .container").css("height", $(window).height() - 35);
      } else {
        $(".banner, .banner .container").css("height", $(window).height() - 90);
      }

      //Banner typed text Enabling 
      $(".banner-text h1").typed({
        strings: ["Property made simple."],
        typeSpeed: 30,
        backDelay: 500,
        loop: false,
        // defaults to false for infinite loop
        loopCount: false,
        callback: function(){ 
            $(" #typed-cursor ").fadeOut();
        }
      });      

      //Testimonial Carousal
      $("#owl-testimonial").owlCarousel({
        items : 2, //10 items above 1000px browser width
        itemsDesktop : [1000,2], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,2], // 3 items betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0;
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
      });

      //Animation for Why-us 
      $('.orange-buttons-holder').waypoint(function(direction) {
        $(".why-us-animation").addClass("animate-whyus");
        setTimeout(function() {
            $('.sub-circle-one, .sub-circle-two, .sub-circle-three').addClass('animated bounceIn');
            $(".lines").addClass('animation-done');
        }, 1000);
      });


      //Skroller parallax initialization
      if ($(window).width() > 767) {
         skrollr.init({
          forceHeight: false
        });
      }


      //Custom select Initialization

      $('.selectpicker').selectpicker();

      $(".btn.selectpicker").click(function(){
      if($(this).parent().hasClass("open")) {
        $(".buying-phases .popup").removeClass("allow-overflow");
      }else {
        $(".buying-phases .popup").addClass("allow-overflow");
      }
      });

      $('html').on('click', function(e) {
       if ($( ".selectpicker[data-id='city_selection']" ).parent().hasClass("open")) {
          $(".buying-phases .popup").removeClass("allow-overflow");
        } else {
           console.log("no");
        }
      });


      // Prevent Why us animation for mobile devices 

      if($(window).width() < 450 ) {
          $(".why-us-animation").addClass("animate-whyus");
          $('.sub-circle-one, .sub-circle-two, .sub-circle-three').addClass('animated bounceIn');
          $(".stand-alone-text").find("br").remove();
      }


      // UI Auto Select 


      var availableTags = [
            "BTM Layout,",
            "Hebbal",
            "HSR Layout",
            "Indra Nagar",
            "Jaya Nagar",
            "K R PURAM",
            "Koramangal",
            "Marthahalli",
            "Richmond Town",
            "Sadashivnagar",
            "Ulsoor"
          ];
          $( "#search_area, .selling-phases #prop_area_select, .renting-phases #prop_area_select" ).autocomplete({
            source: availableTags,
            select: function( event, ui ) {
              $(this).parents(".popup-content").find(".next-link").fadeIn();
            }
          });



      //General Pop up script

      $(".popup a").click(function(){
        var attr = $(this).attr('go-to');
        console.log(attr);
        if (typeof attr !== 'undefined' && attr !== false) {
            var goto_id = $(this).attr('go-to');
            $(".popup-content").hide();
            $("#"+goto_id).fadeIn("slow");
            $(".popup").animateAuto("height", 100);
        }
      });


      $(".selected-items a").click(function(){
        if($(this).parent().hasClass("completed")) {
          $('.selected-items li').removeClass('active');
          $(this).parent().addClass('active');
          var attr = $(this).attr('go-to');
          if (typeof attr !== 'undefined' && attr !== false) {
              var goto_id = $(this).attr('go-to');
              $(".popup-content").hide();
              $("#"+goto_id).fadeIn("slow");
              $(".popup").animateAuto("height", 100);
          }
        }
        else {
          event.preventDefault();
        }
      });


      $(".close-popup, .listing-requsted").click(function(){
         $(".buying-phases, .popup-content, .selling-phases, .renting-phases").fadeOut();
         $(".banner-text, .orange-buttons-holder").fadeIn();
      });

      $(".upload-click").click(function(){
         $(".hidden-input").trigger("click");
      });



      $(".buying-phases .back-link").click(function(){
          $(".buying-phases .selected-items .active").removeClass("active").prev().addClass("active");
      });

      $(".selling-phases .back-link").click(function(){
          $(".selling-phases .selected-items .active").removeClass("active").prev().addClass("active");
      });      


      //Buy Pop Up scripts 

      $(".buy-btn").click(function(){
        $(".banner-text").fadeOut();
        $(".popup-content, .orange-buttons-holder").hide();
        $("#select_city").show();
        $(".user-selections").hide();
        $(".buying-phases").fadeIn();
        $(".popup").animateAuto("height", 100);
      });


      $(".buying-phases .change-search").click(function(){
        $(".popup-content, .orange-buttons-holder").hide();
        $("#select_where").show();
        $(".popup").animateAuto("height", 100);
        $(".user-selections").fadeIn();
        $(".selected-items li").removeClass("active");
        $(".selected-location").parent().addClass("active");        
      });   

      $(".more-filters").click(function(){
        $(".selected-items li.active").addClass("completed");
        $(".selected-items li").removeClass("active");
        $(".selected-more-option").parent().addClass("active");   
      });  

        // $(".user-selections").show();
        // $(".selected-items li").removeClass("active");
        // $(".selected-from").parent().addClass("active");


        //Requirements gathered for Buy 

        $(".select-from-whom a").click(function() {
          var selected_from = $(this).text();
          $(".selected-from").text(selected_from);
          $(".selected-from").parent().addClass("completed");
          $(".selected-from").parent().removeClass("active").next().addClass("active");
        });


        $("#select_where .next-link").click(function() {
          if($(".buying-phases .area-textbox").val() == "") {
            var selected_place = $(".buying-phases .selected-city").text();
          } else {
            var selected_place = $(".buying-phases .area-textbox").val() + " , " + $(".buying-phases .selected-city").text();
          }
          $(".selected-location").text(selected_place);
          $(".selected-location").parent().addClass("completed");
          $(".selected-location").parent().removeClass("active").next().addClass("active");
        });


        $("#select_prop_type .next-link").click(function() {
          var selected_place = $("#property_type .active").text();

          $(".selected-from").text(selected_place);
          $(".selected-from").parent().addClass("completed");
          $(".selected-from").parent().removeClass("active").next().addClass("active");
        });

        $("#bh_preference .next-link").click(function() {
          $(".selected-bhk").text("");
          $('#bh_preference input[type=checkbox]').each(function () {
             if (this.checked) {
                var selected_bhk = $(this).val();
                $(".selected-bhk").append(selected_bhk + ", ");
             }
          });
          var new_bhks = $(".selected-bhk").html().slice(0,-2);
          $(".selected-bhk").html(new_bhks);
          $(".selected-bhk").parent().addClass("completed");
          $(".selected-bhk").parent().removeClass("active").next().addClass("active");          
        });


        $("#select_budjet .next-link").click(function() {
          $('.selected-budjet').text("");
          $('#select_budjet input[type=checkbox]').each(function () {
             if (this.checked) {
                var selected_budj = $(this).val();
                $(".selected-budjet").append(selected_budj + ", ");
             }
          });
          var new_budj = $(".selected-budjet").html().slice(0,-2);
          $(".selected-budjet").html(new_budj);          
          $(".selected-budjet").parent().addClass("completed").removeClass("active");
          $(".selected-loan").parent().addClass("active");            
        });

        $("#filter_preference .next-link").click(function() {
          $(".selected-budjet").parent().addClass("completed");
          $(".selected-budjet").parent().removeClass("active").next().addClass("active");            
        });

        $("#pref_sqfeet_rate .next-link").click(function() {
          $(".selected-more-option").parent().addClass("completed");
          $(".selected-more-option").parent().removeClass("active").next().addClass("active");            
        });

        $("#property_preference .back-link").click(function() {
          $(".predefined-aminities").show();
          $(".custom-aminities").hide();          
        });




        $("#bh_preference input:checkbox").change(
            function(){
                $("#bh_preference .next-link").fadeIn();  
            }
        );

        $("#select_budjet input:checkbox").change(function(){
          $("#select_budjet .next-link").fadeIn();  
          if($('#select_budjet input[type=checkbox]:checked').length < 1) {
            $(".booking-description p").css("visibility","hidden");
          } else {
            $(".booking-description p").css("visibility","visible");
          }
        });

        $("#select_prop_type input:radio").change(
            function(){
                $("#select_prop_type .next-link").fadeIn();  
            }
        );        


        $("#from_where input:radio").change(function(){
           $("#from_where .next-link").fadeIn(); 
        });   

        $(".next-proptype-select").click(function() { 
           var selected_prop_type = $("#from_where .btn-custom.active input").val()
           if(selected_prop_type == "Resale Property") {
              $(".popup-content").hide();
              $("#select_where").show();
              $(".popup").animateAuto("height", 100);
              $(".user-selections").fadeIn();
           } else {
              $(".popup-content").hide();
              $("#find_developer").show();
              $(".popup").animateAuto("height", 100);            
           }
        });


        $('.select-availability :radio').change(function() {
          var category = $(this).filter(':checked').val();
          if(category == "Ready To move") {
            $(".select-posession").hide();
            $(".select-prop-age").show();
          } else {
            $(".select-posession").show();
            $(".select-prop-age").hide();
          }
          $(".popup").animateAuto("height", 100);   
        });    


        $('.select-is-developerproj :radio').change(function() {
          var category = $(this).filter(':checked').val();
          if(category == "yes") {
            $(".if-developer-proj").fadeIn(); 
          } else {
            $(".if-developer-proj").hide(); 
          }
          $(".popup").animateAuto("height", 100);   
        }); 

        $('.non-list input[type=checkbox]').click(function(){
          if (this.checked) {
              $(".non-listed-textarea").fadeIn();
          } else {
              $(".non-listed-textarea").hide();
          }
          $(".popup").animateAuto("height", 100);
        })


        $("#loan_requirement input:radio").change(
            function(){
              $(".user-selections").fadeOut();
              $(".popup-content").hide();
              $("#search_confirm").fadeIn("slow");

              var selected_from = $(".selected-from").text();
              var selected_location = $(".selected-location").text();
              var selected_bhk = $(".selected-bhk").text();
              var selected_budjet = $(".selected-budjet").text();
              var selected_pref = $('#loan_requirement input:radio:checked').val();


              $(".selected-pref-list p.selected-pref").html("<b>" + selected_from + "</b> in <b>" + selected_location + "</b> with <b>" + selected_bhk + "</b> between <b>" + selected_budjet + "</b>");
              $(".selected-pref-list p.selected-loan-pref").html(selected_pref);
              $(".popup").animateAuto("height", 100);
            }
        ); 

        $(".show-user-selection") .click(function() { 
          $(".user-selections").fadeIn();
        });


        $(".buying-phases .confirm-search-btn").click(function() {   
          $(".popup-content").hide();
          $("#search_loading").fadeIn();
          $(".popup").animateAuto("height", 100);
          setTimeout(function() {
            $(".popup-content").hide();
            $("#completed_result").fadeIn();
            $(".popup").animateAuto("height", 100);
          },3500);

          setTimeout(function() {
            $("#completed_result").addClass("active");
            $(".popup").animateAuto("height", 100);
          },6500);
        });   


        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          $(".popup").animateAuto("height", 100);
        });        

        //Range slider Demo

        $("#sq-feet-slider").slider({
          range: true,
          min: 0,
          max: 50,
          values: [ 10, 50 ],
          slide: function( event, ui ) {
            $(".sqft-start").html(ui.values[0]);
            $(".sqft-end").html(ui.values[1]);
          }
        });

        $("#possession-slider").slider({
          range: true,
          min: 1,
          max: 36,
          values: [ 1, 36 ],
          slide: function( event, ui ) {
            $(".poss-start").html(ui.values[0]);
            $(".poss-end").html(ui.values[1]);
          }
        });

        $("#prop-age-slider").slider({
          range: true,
          min: 0,
          max: 10,
          values: [ 0, 10 ],
          slide: function( event, ui ) {
            $(".propage-start").html(ui.values[0]);
            $(".propage-end").html(ui.values[1]);
          }
        });

        //Animation for Pop up transition
        jQuery.fn.animateAuto = function(prop, speed, callback){
            var elem, height, width;
            return this.each(function(i, el){
                el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
                height = elem.css("height"),
                width = elem.css("width"),
                elem.remove();
                
                if(prop === "height")
                    el.animate({"height":height}, speed, callback);
                else if(prop === "width")
                    el.animate({"width":width}, speed, callback);  
                else if(prop === "both")
                    el.animate({"width":width,"height":height}, speed, callback);
            });  
        }


        //Script for sell popup


        //$(".collapsed").click(function(){
        $('a[data-toggle="collapse"]').on( "click", function() {
          
          if($(this).parent().hasClass("active")) {
            $(".panel-title").removeClass("active");   
          }
          else {
            $(".panel-title").removeClass("active");
            $(this).parent().addClass("active");
          }
        });


      //Sell Popup navigation

       $(".sell-btn").click(function(){
          $(".banner-text").fadeOut();
          $(".popup-content, .orange-buttons-holder, .preview-prop").hide();
          $("#how_to_sell").show();
          $(".selling-phases").fadeIn();
          $(".popup").animateAuto("height", 100);
        });



       $(".start-button, .change-sell-search").click(function(){
          $(".popup-content").hide();
          $("#prop_city").show();
          //$(".property-location-li").parent().addClass("active")
          $(".selling-phases").fadeIn();
          $(".popup").animateAuto("height", 100);
        });

        $(".change-details").click(function(){
          $(".popup-content, .preview-prop").hide();
          $("#prop_location").show();
          $(".selling-phases").fadeIn();
          $(".popup").animateAuto("height", 100);
        });



       $(".open-preview").click(function(){
          $(".selling-phases, .renting-phases").hide();
          $(".preview-prop").fadeIn();
          //Carousal Plugins initialization 
          $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 107,
            itemMargin: 15,
            asNavFor: '#slider'
          });

          $('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel",
          });    

        //$(".preview-prop").animateAuto("height", 100);

       });



       $('#request_photographer .open-preview, #email_photo .open-preview').click(function(){
          $("#slider li img, #carousel li img").attr("src","css/images/sample.jpg");
       });

       $(".open-map-preview").click(function(){
        $(".normal-preview").hide();
        $(".map-preview").fadeIn();
        //$(".preview-prop").animateAuto("height", 100);
      });


       $(".open-confirmation").click(function(){
        $(".preview-prop, .user-selections").hide();
        $(".popup-content").hide();
        $(".selling-phases, #thank_you").fadeIn();
        $(".popup").animateAuto("height", 100);
      });


       $(".add-more-aminity").click(function(){
        $(".predefined-aminities").hide();
        $(".custom-aminities").fadeIn();
      });

       $('.hidden-input').change(function(){
            $("#upload_photo").hide();
            $("#identify_photo").show();
            $(".popup").removeAttr("style");
        });


       $(".upload-btn").click(function(){
            $("#upload_photo").fadeIn();
            $("#identify_photo").hide();
            $(".popup").animateAuto("height", 100);
            $(".uploaded-numbers li:first-child").addClass("active animate");
            setTimeout(function() {
              $(".uploaded-numbers li:first-child").removeClass("animate");
            },500);
       });


       //Sell Next link enabling


       $(".location-form input[type=text]").keypress(function(){
          $("#prop_location .next-link ").fadeIn();
       });

       $(".prop-price").keypress(function(){
          $("#property_budjet .next-link ").fadeIn();
       });

        $("#sellingprop_type input:radio").change(
            function(){
                $("#sellingprop_type .next-link ").fadeIn();  
            }
        );

        $("#property_bedbath .select-bath input:radio, #property_bedbath .select-bed input:radio").change(
            function(){
              if($("#property_bedbath .select-bath input:radio:checked").length > 0 && $("#property_bedbath .select-bed input:radio:checked").length > 0 )
                $("#property_bedbath .next-link ").fadeIn();  
            }
        );


       //Sell Gathering informations

       $("#prop_owner .next-link").click(function() {
        $(".user-selections").fadeIn();
       });


       $("#prop_location .next-link").click(function() {
          var selected_from = $('.selling-phases .area-textbox').val();
          $(".selling-phases .property-location-li").text(selected_from);
          $(".selling-phases .property-location-li").parent().addClass("completed");
          $(".selling-phases .property-location-li").parent().removeClass("active").next().addClass("active");
        });

       $("#sellingprop_type .next-link").click(function() {
          var selected_from = $("#sellingprop_type .select-prop-type .btn-custom.active").text();
          $(".selling-phases .property-type-li").text(selected_from);
          $(".selling-phases .property-type-li").parent().addClass("completed");
          $(".selling-phases .property-type-li").parent().removeClass("active").next().addClass("active");
        });

       $("#property_bedbath .next-link").click(function() {
          
          var selected_bed = $(".select-bed .btn-custom.active").text();
          var selected_bath = $(".select-bath .btn-custom.active").text();

          $(".selling-phases .property-bhk-li").text(selected_bed + " Bed, " + selected_bath + " Bath");
          $(".selling-phases .property-bhk-li").parent().addClass("completed");
          $(".selling-phases .property-bhk-li").parent().removeClass("active").next().addClass("active");
        });

       $("#property_budjet .next-link").click(function() {
          var selected_from = $('.prop-price').val();
          $(".selling-phases .property-budget-li").text(selected_from);
          $(".selling-phases .property-budget-li").parent().addClass("completed");
          $(".selling-phases .property-budget-li").parent().removeClass("active").next().addClass("active");
        });

       
       $("#email_photo .next-link, #upload_photo .next-link").click(function() {
          $(".selling-phases .property-email-li").parent().addClass("completed");
          $(".selling-phases .property-email-li").parent().removeClass("active").next().addClass("active");
        });

        $("#property_preference .next-link").click(function() {
          $(".selling-phases .property-pos-amenity").parent().addClass("completed");
          $(".selling-phases .property-pos-amenity").parent().removeClass("active").next().addClass("active");
        });


       $(".open-preview").click(function() {
          $(".selling-phases .property-adddetails-li").parent().addClass("completed");
          $(".selling-phases .property-adddetails-li").parent().removeClass("active").next().addClass("active");
        });

       $(".request-visit").click(function() {
          $(".ask-request").hide();
          $(".request-accepted").fadeIn();
        });


       $(".submit-review").click(function() {
           var selected_review = $("#thank_you .btn-custom.active input").val()
           if(selected_review == "good") {
            $(".select-and-submit").hide();
            $(".social-box").show();            
           } 
           else {
            $(".select-and-submit").hide();
            $(".suggestion-box").show();
           }
       });



        $('#far-clouds').pan({fps: 30, speed: 0.7, dir: 'left', depth: 30});
        $('#near-clouds').pan({fps: 30, speed: 1.5, dir: 'left', depth: 70});
        $('#top-clouds').pan({fps: 30, speed: 0.3, dir: 'left', depth: 70});
                

        //Renting


       $(".rent-btn").click(function(){
          $(".banner-text").fadeOut();
          $(".popup-content, .orange-buttons-holder, .preview-prop").hide();
          $("#rent_to_or_out").show();
          $(".renting-phases").fadeIn();
          $(".popup").animateAuto("height", 100);
        });

        $(".rent-start-button, .change-rent-search").click(function(){
          $(".popup-content").hide();
          $("#rent_prop_city").show();
          $(".renting-phases .user-selections").show();
          $(".property-location-li").parent().addClass("active")
          $(".renting-phases").fadeIn();
          $(".popup").animateAuto("height", 100);
        });



        $('.select-furnishing-state :radio').change(function() {
          var category = $(this).filter(':checked').val();
          if(category == "Unfurnished") {
            $(".select-furnished").hide(); 
          } else {
            $(".select-furnished").show(); 
          }
          $(".popup").animateAuto("height", 100);   
        }); 


       //Rent Location

       // $(".location-form input[type=text]").keypress(function(){
       //    $("#rent_prop_location .next-link ").fadeIn();
       // });

       $("#rent_prop_location .next-link").click(function() {
          var selected_from = $('.renting-phases .area-textbox').val();
          $(".renting-phases .property-location-li").text(selected_from);
          $(".renting-phases .property-location-li").parent().addClass("completed");
          $(".renting-phases .property-location-li").parent().removeClass("active").next().addClass("active");
        });

       //Rent Propert Type

        $("#rentingprop_type input:radio").change(
            function(){
                $("#rentingprop_type .next-link").fadeIn();  
            }
        );         

       $("#rentingprop_type .next-link").click(function() {
          var selected_from = $("#rentingprop_type .select-prop-type .btn-custom.active").text();
          $(".renting-phases .property-type-li").text(selected_from);
          $(".renting-phases .property-type-li").parent().addClass("completed");
          $(".renting-phases .property-type-li").parent().removeClass("active").next().addClass("active");
        });


       //rent Bed and bath select 
        $("#rent_property_bedbath .select-bath input:radio, #rent_property_bedbath .select-bed input:radio").change(
            function(){
              if($("#rent_property_bedbath .select-bath input:radio:checked").length > 0 && $("#rent_property_bedbath .select-bed input:radio:checked").length > 0 )
                $("#rent_property_bedbath .next-link ").fadeIn();  
            }
        );     

       $("#rent_property_bedbath .next-link").click(function() {
          
          var selected_bed = $(".renting-phases .select-bed .btn-custom.active").text();
          var selected_bath = $(".renting-phases .select-bath .btn-custom.active").text();

          $(".renting-phases .property-bhk-li").text(selected_bed + " Bed, " + selected_bath + " Bath");
          $(".renting-phases .property-bhk-li").parent().addClass("completed");
          $(".renting-phases .property-bhk-li").parent().removeClass("active").next().addClass("active");
        });


       //Rent Propert size, Rent Propert Age, Rent Propert furnishing status

        $("#rent_property_size input:radio, #rentprop_posession_status input:radio,#rent_furnishing_status input:radio, #prop_rent_amount input:radio ").change(
            function(){
                $(this).parents(".popup-content").find(".next-link").fadeIn();  
            }
        );     


        $("#rent_furnishing_status .next-link").click(function() {
          $(".renting-phases .property-pos-amenity").parent().addClass("completed");
          $(".renting-phases .property-pos-amenity").parent().removeClass("active").next().addClass("active");
        });


        $("#prop_rent_amount .next-link").click(function() {
          
          var selected_rent = $(".renting-phases .amount-textbox:first").val();
          var selected_deposit = $(".renting-phases .amount-textbox:last").val();

          $(".renting-phases .property-budget-li").text("Rent: " + selected_rent);
          $(".renting-phases .property-budget-li").parent().addClass("completed");
          $(".renting-phases .property-budget-li").parent().removeClass("active").next().addClass("active");
        });


       $(".rent-open-confirmation").click(function(){
        $(".preview-prop, .user-selections").hide();
        $(".popup-content").hide();
        $(".renting-phases, #thank_you").fadeIn();
        $(".popup").animateAuto("height", 100);
      });


       $(".rent-in-btn").click(function(){
        $("#rent_prop_city h2").text("Select the city in which you are searching a property to rent");
        $("#rent_prop_location h2").text("Where do you want to rent property in Bangalore?");
        $("#rent_prop_location .location-form").hide();
        $("#rent_property_bedbath .next-link").attr("go-to","prop_rent_amount");
        $("#prop_rent_amount .next-link").attr("go-to","rent_search_confirm");

        $("#prop_rent_amount h2").text("What is your rental budget ? what kind of lease you can furnish?");
        $("#prop_rent_amount .amount-textbox:last-child, #rent_property_preference .add-more-aminity").hide();
        $(".lease-type-select .btn-custom:first-child span").text("None"); 

        $("#rent_property_bedbath .more-option").show();
        $(".renting-phases .selected-items li:last-child").hide();
        $(".renting-phases").addClass("rent-in");
       })


       $(".rent-out-btn").click(function(){
        $("#rent_prop_city h2").text("Select the city in which your property is located");
        $("#rent_prop_location h2").text("Where is your property located in Bangalore?");
        $("#rent_prop_location .location-form").show();
        $("#rent_property_bedbath .next-link").attr("go-to","rent_property_size");
        $("#prop_rent_amount .next-link").attr("go-to","rent_property_photo");

        $("#prop_rent_amount h2").text("What is your rental budjet ? Also specify any leasing restrictions");
        $("#prop_rent_amount .amount-textbox:last-child, #rent_property_preference .add-more-aminity").show();
        $(".lease-type-select .btn-custom:first-child span").text("No Restriction"); 

        $("#rent_property_bedbath .more-option").hide();
        $(".renting-phases .selected-items li:last-child").show();
        $(".renting-phases").addClass("rent-out");
       });


        $(document).on("click", ".rent-in #prop_rent_amount .next-link", function(){
          $(".user-selections").hide();
          var selected_from = $(".renting-phases .property-location-li").text();
          var selected_location = $(".renting-phases .property-type-li").text();
          var selected_bhk = $(".renting-phases .property-bhk-li").text();
          var selected_budjet = $(".renting-phases .property-budget-li").text();
          var rent_budjet = selected_budjet.substring(selected_budjet.indexOf(':') +1);

          $("#rent_search_confirm .selected-pref-list p.selected-pref").html("<b>" + selected_location + "</b> in <b>" + selected_from + "</b> with <b>" + selected_bhk + "</b> with a minimum rent of <b>" + rent_budjet + "</b>");
          $(".popup").animateAuto("height", 100);
       });


       $(document).on("click", ".rent-in #rent_property_bedbath .next-link", function(){
          $(".renting-phases .property-bhk-li").parent().addClass("completed");
          $(".renting-phases li").removeClass("active")
          $(".renting-phases .property-budget-li").parent().addClass("active");
       });       

       $(".rent-in-btn").click(function(){
          $(".renting-phases .user-selections").show();
          $(".property-location-li").parent().addClass("active");
       });


      $(".renting-phases .change-search").click(function(){
        $("#rent_prop_city").show();
        $(".popup").animateAuto("height", 100);
        $(".user-selections").fadeIn();
        $(".selected-items li").removeClass("active");
        $(".property-location-li").parent().addClass("active");        
      });  

       $("#rent_property_bedbath .more-option").click(function(){
          var selected_bed = $(".renting-phases .select-bed .btn-custom.active").text();
          var selected_bath = $(".renting-phases .select-bath .btn-custom.active").text();

          $(".renting-phases .property-bhk-li").text(selected_bed + " Bed, " + selected_bath + " Bath");
          $(".renting-phases .property-bhk-li").parent().addClass("completed");
          $(".renting-phases .property-bhk-li").parent().removeClass("active").next().addClass("active");
       });

        $(".renting-phases .confirm-search-btn").click(function() {   
          $(".popup-content").hide();
          $(".renting-phases #search_loading").fadeIn();
          $(".popup").animateAuto("height", 100);
          setTimeout(function() {
            $(".popup-content").hide();
            $(".renting-phases #completed_result").fadeIn();
            $(".popup").animateAuto("height", 100);
          },3500);

          setTimeout(function() {
            $(".renting-phases #completed_result").addClass("active");
            $(".popup").animateAuto("height", 100);
          },6500);
        });  

    });