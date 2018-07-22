$(document).ready(function(){

  gridHTML = "";

  for(var i = 1 ; i <= 4 ; i++){
    gridHTML += "<div class='row'>"
    for(var j = 1 ; j <= 4 ; j++){
      gridHTML += "<div class='column'><div class='ui pad button' id='pad_"+i+"_"+j+"'>Pad "+i+"_"+j+"</div></div>";
    }
    gridHTML += "</div>";
  }


  $('#mainGrid').html(gridHTML);

});
