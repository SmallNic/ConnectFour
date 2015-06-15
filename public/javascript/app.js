$(document).ready(function(){
  console.log("jQuery is running")

  ////////////////////////// Functions //////////////////////////

  function setBoard(){
    for(var i=0; i <pieces.length; i++){
      $(pieces[i]).attr("space-taken","false")
      $(pieces[i]).attr("color","white")
      $(pieces[i]).css("backgroundColor","white")
    }

    $(connectFour).html("<span class='vitamin-c'>Connect</span><span class='gamebookers-blue'>Four</span>")

    currentPlayer = (lastWinner === "red" ? "blue" : "red")
    $(currentPlayerIcon).css("backgroundColor",currentPlayer)
  }

  function fillSpot(spot){
    $(spot).attr("space-taken","true")
    $(spot).attr("color",currentPlayer)
    $(spot).css("backgroundColor",currentPlayer)
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

  function isUnoccupied(spot){
    return (spot.attr("space-taken") === "true" ? false : true)
  }

  function isBottomRow(spot){
    return (parseInt(spot.attr("row")) === 1 ? true : false)
  }

  function changeColor(spot, color){
    spot.css("backgroundColor",color)
  }

  function dropPiece(spot, row, col){
    // spotAboveSpot = $( '.piece[row="'+(row + 1)+'"][col="'+col+'"]' )

    if (isBottomRow(spot)){
      return spot
    }

    spotBelowSpot = $( '.piece[row="'+(row -1)+'"][col="'+col+'"]' )
    if(isUnoccupied(spotBelowSpot)){
      return dropPiece(spotBelowSpot, row-1, col)
    }
    else {
      return spot
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

  ////////////////////////// Game Winning Logic //////////////////////////

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

  function setScore(winner){
    if (winner==="red"){
      redScore++
      $("#red-score").text(redScore)
    }
    else{
      blueScore++
      $("#blue-score").text(blueScore)
    }
  }

  ////////////////////////// Body //////////////////////////

  var pieces = $(".piece")
  var currentPlayer = null
  var currentPlayerIcon = $(".current-player-icon");
  var connectFour = $("#connect-four")

  var gameStats = $("#game-stats")
  var gameCount = gameStats.attr("game-count")
  var redScore = gameStats.attr("red-score")
  var blueScore = gameStats.attr("blue-score")
  var lastWinner = gameStats.attr("last-winner")

  setBoard();

  var newGame = $("#newGame")
  newGame.on("click", function(event){
    event.preventDefault();
    console.log("You started a new game")
    setBoard();
  })


  for(var i=0; i <pieces.length; i++){

    var lowestSpot;

    $(pieces[i]).on("mouseover", function (event){
      if (currentPlayer){
        var highlightedRow = parseInt($(this).attr("row"))
        var highlightedCol = parseInt($(this).attr("col"))
        lowestSpot = dropPiece($(this), highlightedRow, highlightedCol)
        if (isUnoccupied(lowestSpot)){
          changeColor(lowestSpot, currentPlayer)
        }
      }
    })

    $(pieces[i]).on("mouseout", function (event){
      if (currentPlayer && isUnoccupied(lowestSpot)){
        changeColor(lowestSpot, "white")
      }
    })

    $(pieces[i]).on("click", function (event){

      //check if the current spot is unoccupied
      if (currentPlayer && isUnoccupied($(this))){
        var clickedRow = parseInt($(this).attr("row"))
        var clickedCol = parseInt($(this).attr("col"))

        //find the lowest available cell in that column
        lowestSpot = dropPiece($(this), clickedRow, clickedCol)
        var lowestRow = parseInt(lowestSpot.attr("row"))
        var lowestCol = parseInt(lowestSpot.attr("col"))

        //fill that cell with the current player's color
        fillSpot(lowestSpot)

        //check if that creates a winner
        if (haveWinner(lowestRow, lowestCol)){
          //announce winner and end game
          $(connectFour).text(currentPlayer.toUpperCase()  + " WINS!!")
          lastWinner = currentPlayer
          setScore(currentPlayer)
          currentPlayer = null
          gameCount++

          var parameters = { gameCount: gameCount, redScore: redScore, blueScore: blueScore, lastWinner:lastWinner };
          console.log(parameters)
          $.get('/save', parameters)
          // .done(function() {
          //   console.log( "second success" );
          // }).fail(function() {
          //   console.log( "error" );
          // }).always(function() {
          //   console.log( "finished" );
          // });
        }
        else{
          currentPlayer = getNextPlayer()
          $(currentPlayerIcon).css("backgroundColor",currentPlayer)
        }
      }
    })
  }

})
