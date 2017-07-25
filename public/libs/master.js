$(document).ready(function(){

	(function (){

		/*
		|----------------------------------------------
		| comment
		| @author: jahid haque <jahid.haque@yahoo.com>
		| @copyright: comany name, 2017
		|----------------------------------------------
		*/
		$(document).on('click', "[data-ui-opt='setupPromo']", function(event){
			event.preventDefault();
			// add active state class.
			$(this).toggleClass('active-state');
			// search for common div.
			$("[data-ui-target='common']").toggleClass('hidden');
		});

		
		/*
		|----------------------------------------------------------------
		| disble link href action on click.
		|----------------------------------------------------------------
		*/
		$(document).on('click', "[data-btn-default='disabled']", function(event){
			event.preventDefault();
		});

		
		/*
		|----------------------------------------------------------------
		| [data-command='settings']
		|----------------------------------------------------------------
		 */
		$(document).on('click', "[data-command='settings']", function(){
			
			$(".welcome_to_profile").css({"width": "100%"});

			// toggle open class.
			$(".settings_sidebar_left").toggleClass('open');
			
			// animating 
			if($(".settings_sidebar_left").hasClass('open')){

				$(".settings_sidebar_left").animate({left: "0px"}, 500)
				$("[data-slide='true']").animate({left: "240px"}, 500);
				$(".welcome_to_profile").animate({left: "220px"}, 500);
				$(".welcome_to_profile").css({"width": "1200px"});
			}
			else{
				$(".settings_sidebar_left").animate({left: "-240px"}, 500);
				$("[data-slide='true']").animate({left: "0px"}, 500);
				$(".welcome_to_profile").animate({left: "0px"}, 500);
				$(".welcome_to_profile").css({"width": "100%"});
			}			
		});


		/*
		|----------------------------------------------------------------
		| data-editable="true"
		|----------------------------------------------------------------
		*/
		$("[data-editable='true']").on('click', function(event){
			event.preventDefault();
			console.log('checked in');
		});


		/*
		|----------------------------------------------
		| active settings.
		|----------------------------------------------
		*/
		$(document).on('click', "[data-js='active']", function(){
			$(this).toggleClass('settings-active');
		});
		

		/*
		|----------------------------------------------------------------
		| Expandable menu for settings.
		|----------------------------------------------------------------
		*/
		$(document).on('click', "[data-command-child]", function(){
			var commandName = $(this).attr("data-command-child");

			if(commandName === "profile_settings"){
				// toggle the chevron.
				$("[data-ux='profile_settings_chevron_up']").toggleClass("fa-chevron-down").toggleClass("fa-chevron-up");

				// removing the collapse class.
				$(".profile_settings_nav").toggleClass("collapse").animate(500);

				// adding dynamic class to container ul.
				$(".side_bar_menu").toggleClass("active_collapse");
			}
			
		});

		

	})();

});


