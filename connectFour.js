$(document).ready(function(){

  var gameboardContainer = $("#gameboardContainer")
  var redButton = $("#red")
  var blueButton = $("#blue")

  redButton.css("backgroundColor","red")
  blueButton.css("backgroundColor","blue")

  var currentPlayer;
  var pieces = $(".piece")

  for(var i=0; i <pieces.length; i++){
    $(pieces[i]).attr("space-taken","false")
    $(pieces[i]).attr("active-row","1")
  }

  redButton.on("click", function (){
    currentPlayer = "red"
    $(this).css("box-shadow","0px 0px 50px 0px orange")
    blueButton.css("box-shadow","0px 0px 0px 0px")
  })

  blueButton.on("click", function (){
    currentPlayer = "blue"
    $(this).css("box-shadow","0px 0px 50px 0px orange")
    redButton.css("box-shadow","0px 0px 0px 0px")
  })

  for(var i=0; i <pieces.length; i++){
    $(pieces[i]).on("click", function (event){
      var pieceClasses = $(this).attr("class")
      var row = pieceClasses.substr(pieceClasses.length - 1);
      console.log("row" + row)
      if(currentPlayer && $(this).attr("space-taken") == "false"){
        console.log($(this).attr("class"))
        $(this).attr("space-taken","true")
        $(this).css("backgroundColor",currentPlayer)
      }
    })
  }


  var row6 = $(".row6")
  var row5 = $(".row5")
  var row4 = $(".row4")
  var row3 = $(".row3")
  var row2 = $(".row2")
  var row1 = $(".row1")

  var col7 = $(".col7")
  var col6 = $(".col6")
  var col5 = $(".col5")
  var col4 = $(".col4")
  var col3 = $(".col3")
  var col2 = $(".col2")
  var col1 = $(".col1")


//-----------------------JAVASCRIPT---------------------------
  // var pieces = document.querySelectorAll(".piece")
  //
  // for(var i=0; i <pieces.length; i++){
  //   pieces[i].addEventListener("click", function (event){
  //     this.style.background = "red"
  //   })
  // }
  //-----------------------JQUERY---------------------------

  for(var i=0; i <pieces.length; i++){
    $(pieces[i]).on("mouseover", function (event){
      $(this).css("border","solid 1px red")
    })

    $(pieces[i]).on("mouseout", function (event){
      $(this).css("border","solid 1px black")
    })
  }


//
//   $(".piece").on("mouseover",function(){
// alert("hi")})

  // piece.on("mouseover", function(){
  //   console.log(this)
  //   this.css("background","red")
  //
  // })

})
