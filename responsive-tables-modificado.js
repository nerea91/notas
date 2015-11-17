$(document).ready(function() {
  var switched = false;
  var changeColspanTh = false;
  var changeColspanTf = false;
  var updateTables = function() {
    if (($(window).width() < 767) && !switched ){

      switched = true;
      $("table.responsive").each(function(i, element) {
        splitTable($(element));
      });

	  $(".scrollable table.responsive > thead > tr.zebra > th:first-child").each(function(i, element) { 

		  if( $(element).attr('colspan') > 1)
		  {
			changeColspanTh = true;
			var colspan = parseInt($($(".pinned table > thead > tr.zebra > th:first-child")[i]).attr('colspan'));
			
			$(element).attr('colspan', colspan-1);
			$(element).css('display', 'table-cell');
		  }
	  });
	  
	  $(".scrollable table.responsive > tfoot > tr > td:first-child").each(function(i, element) {
		  if( $(element).attr('colspan') > 1)
		  {
			  changeColspanTf = true;
			  var colspan = parseInt($($(".pinned table > tfoot > tr > td:first-child")[i]).attr('colspan'));
			  $(element).attr('colspan', colspan-1);
			$(element).css('display', 'table-cell');
		  }
	  });
      return true;
    }
    else if (switched && ($(window).width() > 767)) {
      switched = false;
      $("table.responsive").each(function(i, element) {
        unsplitTable($(element));
      });
	  
	  if(changeColspanTh)
		$("table.responsive > thead > tr.zebra > th:first-child").each(function(i, element) {
			$(element).attr('colspan', parseInt($(element).attr('colspan'))+1);
		});
	  
	  if(changeColspanTf)
		$("table.responsive > tfoot > tr > td:first-child").each(function(i, element) {
			$(element).attr('colspan', parseInt($(element).attr('colspan'))+1);
			
		});
	  
	  changeColspanTh = false;
	  changeColspanTf = false;
    }
  };
   
  $(window).load(updateTables);
  $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
  $(window).on("resize", updateTables);
   
	
	function splitTable(original)
	{
		original.wrap("<div class='table-wrapper' />");
		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");
		
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");

    setCellHeights(original, copy);
	}
	
	function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
	}

  function setCellHeights(original, copy) {
    var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        heights = [];

    tr.each(function (index) {
      var self = $(this),
          tx = self.find('th, td');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }

});
