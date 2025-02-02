const bg = document.querySelector('.background-img')
const loadText = document.querySelector('.loading-text')

let load = 0

let int = setInterval(blurring, 30)

function blurring() {
    load++

    if ( load > 99 ) {
        clearInterval(int)
    }

    loadText.innerText = `${load}%`
    loadText.style.opacity = scale(load, 0, 100, 1, 0)
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
    bg.style.filter = `contrast(${scale(load, 0, 200, 30, 0)}px)`
    bg.style = `grayscale(${scale(load, 0, 50, 30, 0)}px)`
    bg.style.filter = `opacity(${scale(load, 0, 40, 30, 0)}px)`
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }


jQuery(window).on('load', function() {
        
    // HIDE PRELAODER
    $(".preloader").addClass("preloader-hidden");

    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function(){

        $(".hero .animation-container").each(function(){

            var e = $(this);

            setTimeout(function(){

                e.addClass("run-animation");

            }, e.data("animation-delay") );

        });

    }, 900 );

});


jQuery(document).ready(function($) {
	"use strict";
    
    
    // INIT PARALLAX PLUGIN
    $(".hero .background-content.parallax-on").parallax({
        scalarX: 24,
        scalarY: 15,
        frictionX: 0.1,
        frictionY: 0.1,
    });
    
    
    // SCROLL TOP BUTTON
    $(".scroll-top").click(function() {
        
      $("html, body").animate({ scrollTop: 0 }, 400);
      return false;
        
    });
    
    
    // SCROLL REVEAL SETUP
    window.sr = ScrollReveal();
    sr.reveal(".scroll-animated-from-bottom", { 
        duration: 600,
        delay: 500,
        origin: "bottom",
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        distance: "20vh",
        viewFactor: 0.4,
        scale: 1,
        useDelay: 'onload',
    });
    
    
    // IMAGE CAROUSEL
    $('.image-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        margin: 0,
        autoplay: true,
        responsive:{
            800:{
                items: 2,
            },
        }
    });
    
    
    // HERO/BUTTON ON SCROLL ANIMATING
    function onScrollAnimating() {
		
		var windowHeight = $( ".hero" ).height(),
            frontContent = $(".hero .front-content"),
            backContent = $(".hero .background-content"),
            navigationButton = $( ".navigation-button" ),
			scrollOffset,
			calculatedOpacityFrontContent,
			calculatedScaleFrontContent,
			calculatedTranslateHeader,
			calculatedOpacityBackground;
        
		
		function navigationButtonHide() {
			
			if ( calculatedTranslateHeader <= 200 ) {
                
			    navigationButton.css( "transform", "translateX(" + calculatedTranslateHeader + "%) translateY(-50%)");

			} else if ( scrollOffset > windowHeight ) {
                
			    navigationButton.css( "transform", "translateX(200%) translateY(-50%)");
				
			}
		}
		
		function frontContentMargin() {
			
			if ( scrollOffset <= windowHeight ) {

				frontContent.css( "margin-top", scrollOffset );

			} else if ( scrollOffset > windowHeight ) {
				
				frontContent.css( "margin-top", windowHeight );
				
			}
			
		}
		
		function frontContentOpacity() {
			
			if ( calculatedOpacityFrontContent >= 0 ) {

				frontContent.css( "opacity", calculatedOpacityFrontContent);

			} else if ( scrollOffset > windowHeight ) {
				
				frontContent.css( "opacity", "0");
				
			}
		}
		
		function frontContentScale() {
			
			if ( calculatedScaleFrontContent >= 0.4 ) {
				
				frontContent.css( "transform", "scale(" + calculatedScaleFrontContent + ")");

			} else if ( scrollOffset > windowHeight ) {
				
				frontContent.css( "transform", "scale(0.6)");
				
			}
			
		}
		
		function backgroundOpacity() {
			
			if ( calculatedOpacityBackground >= 0 ) {

				backContent.css( "opacity", calculatedOpacityBackground );

			} else if ( scrollOffset > windowHeight ) {
				
				backContent.css( "opacity", "0" );
				
			}
			
		}
		
		function runStep() {
			
			scrollOffset = $( window ).scrollTop();
            
            if(windowHeight > scrollOffset && scrollOffset >= 0) {
			
                calculatedTranslateHeader = ( scrollOffset / windowHeight) * 650;
                calculatedOpacityFrontContent = 1 - ( scrollOffset / windowHeight) * 4.2;
                calculatedScaleFrontContent = 1 - ( scrollOffset / windowHeight) * 1.2;
                calculatedOpacityBackground = 1 - ( scrollOffset / windowHeight) * 1.4;

                navigationButtonHide();
                frontContentMargin();
                frontContentOpacity();
                frontContentScale();
                backgroundOpacity();
                
            }
			
		}
		
		$( window ).on( 'resize', function(){

			windowHeight = $( ".hero" ).height();

		});

		$( window ).scroll(function() {
            
			runStep();

		});
		
		runStep();
		
	}
	
	onScrollAnimating();
    
    
});