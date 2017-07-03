$("#toggleResults").hide();
$("#x1").hide();
$("#x2").hide();

$("document").ready(function(){
  
  $("#input").click(function(){
    $("#tail").hide();
    $(this).data("animateToggle", 2).animate({
      width: "250px",
      borderRadius: "20px",
      paddingLeft: "15px"
    });
    $("#x1").delay(300).show(10);
    $("#x2").delay(300).show(10);
  });
  
  $("#x").click(function(){
    $("#x1").hide();
    $("#x2").hide();
    $("#input").data("animateToggle", 2).animate({
      width: "30px",
      borderRadius: "50px",
      paddingLeft: "0px"
    });
    $("#tail").show();
    $("#toggleResults").hide();
    $("h3").show();
    $("input").val("");
  });
  
  $("input").keypress(function(e){
    if (e.which == 13){
      event.preventDefault();
      var apiLink = makeAPIlink($("input").val());
      $.ajax({
        url: apiLink,
        dataType: 'jsonp',
        success: function(data){
          response=data;
          $("#toggleResults").show();
          $("h3").hide();
        }
      }).done(function(response){
        printAPIdata(response);
      });
    }
    
    
  });
});

function makeAPIlink (searchQuery) {
  return "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=&list=search&srsearch=" + searchQuery;
}

function printAPIdata (response) {
  for(var i = 0; i < 10; i++) {
    $("#results" + [i+1]).html("<p class=\"title\">" + response.query.search[i].title + "</p>");
    $("<p>" + response.query.search[i].snippet + " ...</p>").appendTo("#results" + [i+1]);
    $("<p><a href=\"https://en.wikipedia.org/wiki/" + response.query.search[i].title + "\" target=\"new\">Go to full article</a></p>").appendTo("#results" + [i+1]);
  };
}