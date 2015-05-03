$(document).ready(function(){

  ////////////////////////// Functions //////////////////////////

  function setBoard(){
    for(var i=0; i <pieces.length; i++){
      $(pieces[i]).attr("space-taken","false")
      $(pieces[i]).attr("color","white")
      $(pieces[i]).css("backgroundColor","white")
    }
    currentPlayer = null
    blueButton.css("box-shadow","0px 0px 0px 0px")
    redButton.css("box-shadow","0px 0px 0px 0px")
    $("h2").text("Choose 1st Player")

    gameboardContainer.css("animation-name", "none")
    gameboardContainer.css("-webkit-animation-name", "none")

    gameboardContainer.css("animation-duration", "0s")
    gameboardContainer.css("-webkit-animation-duration", "0s")

  }

  function getNeighboringColor(row, col, rowOffset, colOffset){
    var desiredRow = row + rowOffset
    var desiredCol = col + colOffset
    var desiredSpot = $( '.piece[row="'+desiredRow+'"][col="'+desiredCol+'"]' )
    return desiredSpot.attr("color")
  }

  function getNextPlayer(){
    return ((currentPlayer === "red") ? "blue" : "red")
  }

  function highlightCurrentPlayer(player){
    if(player === "red"){
      redButton.css("box-shadow","0px 0px 50px 0px orange")
      blueButton.css("box-shadow","0px 0px 0px 0px")
    }
    else{
      blueButton.css("box-shadow","0px 0px 50px 0px orange")
      redButton.css("box-shadow","0px 0px 0px 0px")
    }
  }

  function isValidSpot(spot, row, col){
    if(spot.attr("space-taken") === "true"){
      return false
    }
    else {
      if(row === 1){
        return true
      }
      else{
        spotBelowSpot = $( '.piece[row="'+(row -1)+'"][col="'+col+'"]' )
        if(spotBelowSpot.attr("space-taken") === "true"){
          return true
        }
        else{
          return false
        }
      }
    }
  }


  function countDiagonalUpRight(row, col){
    var neighborCount = 0;
    var rightOffset = 1;
    var upOffset = 1;
    var leftOffset = -1;
    var downOffset = -1;

    while (true){
      //count neighbors of the same color going up and right
      if(getNeighboringColor(row,col,upOffset,rightOffset) === currentPlayer){
        neighborCount++
        rightOffset++
        upOffset++
      }
      else{
        break
      }
    }
    while (true){
      //count neighbors of the same color going down and left
      if(getNeighboringColor(row,col,downOffset,leftOffset) === currentPlayer){
        neighborCount++
        downOffset--
        leftOffset--
      }
      else{
        break
      }
    }
    return neighborCount
  }

  function countDiagonalDownRight(row, col){
    var neighborCount = 0;
    var rightOffset = 1;
    var upOffset = 1;
    var leftOffset = -1;
    var downOffset = -1;

    while (true){
      //count neighbors of the same color going down and right
      if(getNeighboringColor(row,col,downOffset,rightOffset) === currentPlayer){
        neighborCount++
        rightOffset++
        downOffset--
      }
      else{
        break
      }
    }
    while (true){
      //count neighbors of the same color going  up and left
      if(getNeighboringColor(row,col,upOffset,leftOffset) === currentPlayer){
        neighborCount++
        upOffset++
        leftOffset--
      }
      else{
        break
      }
    }
    return neighborCount
  }


  function countHorizontal(row, col){
    var neighborCount = 0;
    var leftOffset = -1;
    var rightOffset = 1;

    while (true){
      //count neighbors of the same color going left
      if(getNeighboringColor(row,col,0,leftOffset) === currentPlayer){
        neighborCount++
        leftOffset--
      }
      else{
        break
      }
    }

    while (true){
      //count neighbors of the same color going right
      if(getNeighboringColor(row,col,0,rightOffset) === currentPlayer){
        neighborCount++
        rightOffset++
      }
      else{
        break
      }
    }
    return neighborCount
  }

  function countVertical(row, col){
    var neighborCount = 0;
    var bottomOffset = -1;

    while (true){
      //count neighbors of the same color going down
      if(getNeighboringColor(row,col,bottomOffset,0) === currentPlayer){
        neighborCount++
        bottomOffset--
      }
      else{
        break
      }
    }
    return neighborCount
  }

  function haveWinner(row, col){
    if(countHorizontal(row, col) >= 3 || countVertical(row, col) >= 3 ||
    countDiagonalUpRight(row, col) >= 3 || countDiagonalDownRight(row, col) >= 3){
      return true
    }
    else {
      return false
    }
  }


  ////////////////////////// Body //////////////////////////

  var gameboardContainer = $("#gameboardContainer")
  var pieces = $(".piece")
  var buttons = $(".button")
  var currentPlayer = null

  var redButton = $("#red")
  redButton.css("backgroundColor","red")

  var blueButton = $("#blue")
  blueButton.css("backgroundColor","blue")

  setBoard();

  var newGame = $("#newGame")
  newGame.on("click", setBoard)

  for(var i=0; i <pieces.length; i++){
    $(pieces[i]).on("mouseover", function (event){
      $(this).css("border","solid 1px "+currentPlayer+"")
    })

    $(pieces[i]).on("mouseout", function (event){
      $(this).css("border","solid 1px black")
    })
  }

  for(var i=0; i <buttons.length; i++){
    $(buttons[i]).on("click", function (event){
      if (!currentPlayer){
        currentPlayer = $(this).attr("id")
        $("h2").text("Your turn: " + currentPlayer)
        highlightCurrentPlayer(currentPlayer)
      }
    })
  }

  for(var i=0; i <pieces.length; i++){

    $(pieces[i]).on("click", function (event){
      var activeRow = parseInt($(this).attr("row"))
      var activeCol = parseInt($(this).attr("col"))

      if(currentPlayer && isValidSpot($(this), activeRow, activeCol)){
        $(this).attr("space-taken","true")
        $(this).attr("color",currentPlayer)
        $(this).css("backgroundColor",currentPlayer)

        if (haveWinner(activeRow, activeCol)){
          $("h2").text(currentPlayer.toUpperCase()  + " wins!!")

          flipBoard()

        }
        else{
          currentPlayer = getNextPlayer()
          $("h2").text("Your turn: " + currentPlayer)
          highlightCurrentPlayer(currentPlayer)
        }
      }

    })
  }


// Example of asynchronous functions
  // foo(bar)
  //
  //
  // function foo(callback) {
  //   doAsyncStuff(callback);
  // }


  function flipBoard() {
    gameboardContainer.css("animation-name", "flip")
    gameboardContainer.css("-webkit-animation-name", "flip")

    gameboardContainer.css("animation-duration", "2s")
    gameboardContainer.css("-webkit-animation-duration", "2s")
  }

})
