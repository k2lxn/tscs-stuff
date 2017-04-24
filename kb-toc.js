/* Scan the DOM for headers *below* (assuming relative positioning) 
 * the ToC div, then for each header,
 * 1) give it a unique id
 * 2) insert an anchor link with the same inner HTML into the ToC div
 *
 * Future: Indent ToC entries based on header level 
 */
$(document).ready(function() {
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
      //console.log("curr: " + $(curr).get(0).tagName);
      //var precedingHeaders = $(headers).slice(0,i);  
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
}); 
  
