$(document).ready(function(){

  //Declare first pad value: default=9
  var val = [];
  for(var i = 1 ; i <= 4 ; i++){
    val[i] = [];
    for(var j = 1 ; j <= 4 ; j++){
        val[i][j] = 1;
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
    console.log("Game Over");
  }

  //final_check
  function final_check(total){
    if(total == 40 || total == 400){
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

  //Check for block top left
  function check_top_left(row, col){
    return final_check(val[row][col] + val[row+1][col] + val[row][col+1] + val[row+1][col+1]);
  }

  //Check for block top right
  function check_top_right(row, col){
    return final_check(val[row][col] + val[row][col-1] + val[row+1][col] + val[row+1][col-1]);
  }

  //Check for block bottom left
  function check_bottom_left(row, col){
    return final_check(val[row][col] + val[row-1][col] + val[row][col+1] + val[row-1][col+1]);
  }

  //Check for block bottom right
  function check_bottom_right(row, col){
    return final_check(val[row][col] + val[row-1][col] + val[row][col-1] + val[row-1][col-1]);
  }

  //Check for block check_block_recursive
  function check_block_recursive(row, col, dataRow, dataCol){

    if(dataRow == 'top'){
      if(dataCol == 'left'){
        return(check_top_left(row, col));
      }else{
        return(check_top_right(row, col));
      }
    }else{
      if(dataCol == 'left'){
        return(check_bottom_left(row, col));
      }else{
        return(check_bottom_right(row, col));
      }
    }
  }

  //Check for block
  function check_block(row, col){

    var row_validator = [];
    var col_validator = [];
    if(row != 1){
      row_validator.push('bottom');
    }
    if(row != 4){
      row_validator.push('top');
    }
    if(col != 1){
      col_validator.push('right');
    }
    if(col != 4){
      col_validator.push('left');
    }

    var looper = 0;

    row_validator.forEach(function(dataRow){
      col_validator.forEach(function(dataCol){
        if(check_block_recursive(row, col, dataRow, dataCol) == 1){
          looper = 1;
        }
      });
    });

    return looper;
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
    }else if(check_block(row, col) == 1){
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
    val[row][col] = (pad_value(step) == "X" ? 10 : 100);
    $(pad_id).html(pad_value(step));
    $(pad_id).addClass("disabled");
    console.log("Step " + (step+1) + ": Pad_" + row + "_" + col + " (" + pad_value(step) + ")")
    check_result(row, col);
    step++;
  });

});
