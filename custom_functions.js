/* Custom js functions for Help Scout Docs */

/* document ready wrappers commented out because Help Scout adds the event listeners
 * Per Help Scout documentation (http://docs.helpscout.net/article/436-custom-javascript),
 * add scripts to the <head> in this format:
 * 
 * <script type="text/javascript">
 * 	(function() {   
 * 		function customScript() {   
 *		// CUSTOM FUNCTIONS HERE  
 *   }
 *   if (window.addEventListener) {
 *   	window.addEventListener("load",customScript,false);
 * 	 } else if (window.attachEvent) {
 *   	window.attachEvent("onload",customScript);
 *   }
 * 	})()
 * </script>
 */

/* ------------------------- CUSTOM FUNCTIONS ----------------------------- */

/* TABLE OF CONTENTS
 *
 * Scan the DOM for headers *below* (assuming relative positioning) 
 * the ToC div, then for each header,
 * 1) give it a unique id
 * 2) insert an anchor link with the same inner HTML into the ToC div
 *
 */
//$(document).ready(function() {
  var headers = $('#table-of-contents').nextAll('h1, h2, h3');
  $.each(headers, function(i, curr) {
    // Make sure the heading isn't an empty formatting element
    if ($(curr).html()) { 
      
      // Insert the anchors into the headers
      $(curr).attr('id', 'a' + (i + 1));

      // Generate links in the Table of Contents div
      var headerText = $(curr).html();
      $('#table-of-contents').append('<a href="#a' + (i + 1) + '">' + headerText + '</a>');

      // Add class to indent appropriately
      if ($(curr).is('h2')) {
        // If there are no h1s before, make h2s top level of ToC
        $(headers).each(function() {
          if ($(this).is('h1')) {
            $('#table-of-contents').children().last().addClass('indent');
          }
        });
        // Indent h3s  
      } else if ($(curr).is('h3')) {
        var h1Flag = false;
        var h2Flag = false;
        $(headers).each(function() {
          if ($(this).is('h1')) {
            h1Flag = true;
          }
          if ($(this).is('h2')) {
            h2Flag = true;
          }
        });
        if (h1Flag && h2Flag) {
          $('#table-of-contents').children().last().addClass('double-indent');
        } else if (h2Flag) {
          $('#table-of-contents').children().last().addClass('indent');
        }
      }
    }
  });
//}); 



/* BACK TO TOP BUTTON
 * When any anchor link is clicked, the 'Back' button appears; it disappears and
 * scrolls the user back to navigation (or top of page if navigation doesn't exist)  
 */
 
//$(document).ready(function() { 
	// If no 'Back' button exists, append it to #main-content (Help Scout specific id) 
	if ( !$('#top-btn').length ){
    	$('#main-content').append("<a id='top-btn' style='display:none;'>Back ▴</a>");
  	}
  
	// If a #table-of-contents div exists, set this as the anchor to scroll up to.  
	if ( $('#table-of-contents').length ) {
		$('a#top-btn').attr('href', '#table-of-contents');
	} else {
		$('a#top-btn').attr('href', '#top');
    	$('h1.title').attr('id','top');
	}
  
  // Toggle back btn visibility when any other anchor clicked
 	$(document).on('click', "a[href^='#']:not(#top-btn)", function(){
 		$('a#top-btn').show();
 	});
  // Hide back btn when it is clicked
  	$(document).on('click', 'a#top-btn', function(){
 		$('a#top-btn').hide();
 	});
//}); 
 


/* SMOOTH to Anchor Links */
$(document).on('click', 'a[href^="#"]', function(){
	var target = $(this.hash);
	if ( target.length ) {
    	var currScroll = $(this).offset().top;
    	var scrollTo = target.offset().top;
    	var distance = Math.abs(scrollTo - currScroll); 
    	var scrollTime = distance > 0 ? distance * 1.2 : 800; 
		$('html, body').animate({
			scrollTop: scrollTo
		}, scrollTime);
	}
});

  
