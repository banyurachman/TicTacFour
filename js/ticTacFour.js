$(document).ready(function(){

  //Declare first pad value: default=9
  var val = [];
  for(var i = 1 ; i <= 4 ; i++){
    val[i] = [];
    for(var j = 1 ; j <= 4 ; j++){
        val[i][j] = 0;
    }
  }

  //Function for return the pad value
  function pad_value(int){
    if(int % 2 == 0){
      return "X";
    }else{
      return "O";
    }
  }

  //When the game finish
  function finish(){
    alert("Game Over!");
  }

  //final_check
  function final_check(total){
    if(total == 4 || total == 36){
      return 1;
    }else{
      return 0;
    }
  }

  //Check for row
  function check_row(row){
    var total = 0;
    for(var i = 1 ; i <= 4 ; i++){
      total += val[row][i];
    }

    return final_check(total);
  }

  //Check for row
  function check_col(col){
    var total = 0;
    for(var i = 1 ; i <= 4 ; i++){
      total += val[i][col];
    }

    return final_check(total);
  }

  //Check for cross 1
  function check_cross_1(){
    var total = 0;
    for(var i = 1 ; i <= 4 ; i++){
      total += val[i][i];
    }

    return final_check(total);
  }

  //Check for cross 1
  function check_cross_2(){
    var total = 0;
    for(var i = 1 ; i <= 4 ; i++){
      total += val[i][5-i];
    }

    return final_check(total);
  }

  //Check reult after user tap the pad
  function check_result(row, col){
    if(check_row(row) == 1){
      finish();
    }else if(check_col(col) == 1){
      finish();
    }else if(check_cross_1() == 1){
      finish();
    }else if(check_cross_2() == 1){
      finish();
    }
  }

  //Init the pad grid
  gridHTML = "";

  //Render the pad grid
  for(var i = 1 ; i <= 4 ; i++){
    gridHTML += "<div class='row'>"
    for(var j = 1 ; j <= 4 ; j++){
      gridHTML += "<div class='column'><div class='ui pad button' id='pad_"+i+"_"+j+"'>__</div></div>";
    }
    gridHTML += "</div>";
  }

  $('#mainGrid').html(gridHTML);


  //Start the step counter
  var step = 0;

  //each the pad clicked
  var pad_id = "pad_id";
  $('.pad').on('click', function(){
    pad_id = "#" + this.id;
    var row = parseInt(pad_id.slice(5, 6));
    var col = parseInt(pad_id.slice(7));
    val[row][col] = (pad_value(step) == "X" ? 1 : 9);
    $(pad_id).html(pad_value(step));
    $(pad_id).addClass("disabled");
    check_result(row, col);
    step++;
  });

});
