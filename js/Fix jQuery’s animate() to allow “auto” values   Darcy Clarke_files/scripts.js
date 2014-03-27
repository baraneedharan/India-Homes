/*******************************************************************
     _                             _            _
  __| | __ _ _ __ ___ _   _    ___| | __ _ _ __| | _____ 
 / _` |/ _` | '__/ __| | | |  / __| |/ _` | '__| |/ / _ \
| (_| | (_| | | | (__| |_| | | (__| | (_| | |  |   <  __/
 \__,_|\__,_|_|  \___|\__, |  \___|_|\__,_|_|  |_|\_\___|
                      |___/                              

/********************************************************************/

/**
 * Default Application Architecture
 *
 * @param {Object} window Object
 * @param {Object} document Object 
 * @param {undefined} undefined value
 *
 */
(function(window, document, $, undefined){

    /*************************************************************/
    /* Defaults
    /*************************************************************/

    var App             = {};
    App.subscriptions   = {}; 
    App.utils           = [];
    App.cache    		    = {};

    /*************************************************************/
    /* Methods
    /*************************************************************/
    
    /**
     * Publishes event with arguments
     * 
     * @param {String} topic 
     */
    App.utils.publish = function(topic, args){
        App.subscriptions[topic] && jQuery.each(App.subscriptions[topic], function(){
            this.apply(App, args || []);
        });
    };
 
    /**
     * Subscribe to event with callback
     * 
     * @param {String} topic
     * @param {Function} callback
     * 
     * @return {Object} unique subscription handler 
     */
    App.utils.subscribe = function(topic, callback){
        if(!App.subscriptions[topic])
            App.subscriptions[topic] = [];
        App.subscriptions[topic].push(callback);
        return [topic, callback];
    };
    
    /**
     * Unsubscribe to event using returned subscription handler
     * 
     * @param {Object} subscription handler
     */
    App.utils.unsubscribe = function(handle){
        var t = handle[0];
        App.subscriptions[t] && jQuery.each(App.subscriptions[topic], function(idx){
            if(this == handle[1])
                App.subscriptions[topic].splice(idx, 1);
        });
    };

    /*************************************************************/
    /* Subscriptions
    /*************************************************************/
    
    /**
     * Subscribe to application initialization
     */
    App.utils.subscribe('init', function(){ 

    	// Cache elements
      window.App              = App; // expose App into the windo object
      App.cache.window 				= $(window);
      App.cache.document			= $(document);
    	App.cache.body					= $('body');
    	App.cache.header 				= App.cache.body.find('#header');
    	App.cache.pre 					= App.cache.body.find('pre');
    	App.cache.social 				= App.cache.body.find('#social');
    	App.cache.social_link 	= App.cache.body.find('#group-social');
    	App.cache.catgories 		= App.cache.body.find('#nav');
    	App.cache.category_link = App.cache.body.find('#group-categories');
      App.cache.welcome       = App.cache.body.find('.page.home .hero h1');
      App.cache.search        = App.cache.catgories.find('.search');
      App.cache.search_input  = App.cache.search.find('input');
      App.cache.search_button = App.cache.search.find('span');

    	// Bind to DOM ready
		  jQuery(function($){
	        App.utils.publish('load'); 
	    });

		  // Bind to grouped social
	    App.cache.social_link.on('click', function(e){
	    	e.preventDefault();
            if(!App.cache.header.hasClass('open')){
	    		App.cache.header.addClass('open');	    	
	    	} else {
                App.cache.header.removeClass('open');
            }
	    });

      // Bind to search container
      App.cache.search.on('hover', function(e){
          App.utils.publish('check_search');
      }, function(e){
          App.utils.publish('check_search');
      }).on('click', function(e){
          if(!App.cache.search_input.has(':focus'))
              App.cache.search_input.focus();
      });

      // Bind to search input
      App.cache.search_input.on('focus', function(e){
          if($(this).val() == 'Search')
              $(this).val('');
      }).on('blur', function(e){
          if($(this).val() == '')
              $(this).val('Search');
      }).on('keydown', function(e){
          App.utils.publish('check_search');
      });

      // Bind search button submit
      App.cache.search_button.on('click', function(e){
          App.cache.search_input.parents('form').submit();
      });

      // Subscribe to Check Search
      App.utils.subscribe('check_search', function(){
          var val = App.cache.search_input.val()
          if(val != '' && val != 'Search'){
              App.cache.search_button.css('opacity','1');
          } else {
              App.cache.search_button.css('opacity','0');
          }
      });
    });

    /**
     * Subscribe to DOM load event
     */
    App.utils.subscribe('load', function(){
        App.cache.pre.vanGogh();
        App.cache.welcome.lettering().fitText(0.5, { minFontSize: '100px', maxFontSize: '160px' });

    });

    /**
     * Initialize application
     */
    App.utils.publish('init');

})(window, document, jQuery);
