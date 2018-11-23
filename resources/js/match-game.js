$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
})

var MatchGame = {
} /*Created an object called MatchGame*/

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var orderedCardValues = [];
  for (var i = 1; i < 9; i++) {
    orderedCardValues.push(i);
    orderedCardValues.push(i);
  };
  var randomCardValues =[];
  while (orderedCardValues.length > 0) {
    var index = Math.floor(Math.random() * (orderedCardValues.length));
    randomCardValues.push(orderedCardValues[index]);
    orderedCardValues.splice(index, 1);
  };
  return randomCardValues;
} /*Created a function inside the object MatchGame - this creates card values, random values. */


/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data("flipped", []);
  var colorArray = ["hsl(25, 85%, 65%)", "hsl(55, 85%, 65%)",  "hsl(90, 85%, 65%)", "hsl(160, 85%, 65%)",  "hsl(220, 85%, 65%)",  "hsl(265, 85%, 65%)",  "hsl(310, 85%, 65%)",  "hsl(360, 85%, 65%)"];
  $game.empty();
  for (var j = 0; j < 16; j++) {
    var $newCard = $('<div class="col-xs-3 col-sm-3 card"></div>');
    $newCard.data("value", cardValues[j]);
    $newCard.data("flipped", false);
    $newCard.data("color", colorArray[cardValues[j]-1]);
    $game.append($newCard);
  }
  $('.card').click(function() {
    MatchGame.flipCard($(this), $game);
  })

}


/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data("flipped") === false) {
    $card.css("background-color", $card.data("color"));
    $card.text($card.data("value"));
    $card.data("flipped", true);
    $game.data("flipped").push($card);
    if ($game.data("flipped").length === 2) {
      if ($game.data("flipped")[0].data("value")===$game.data("flipped")[1].data("value")){
        $game.data("flipped")[0].css("background-color", "rgb(153, 153, 153)");
        $game.data("flipped")[0].css("color", "rgb(204, 204, 204)");
        $game.data("flipped")[1].css("background-color", "rgb(153, 153, 153)");
        $game.data("flipped")[1].css("color", "rgb(204, 204, 204)");
        $game.data("flipped").splice(0, 2);
      } else {
        setTimeout(function(){
          $game.data("flipped")[0].css("background-color", "rgb(32, 64, 86)");
          $game.data("flipped")[0].text("");
          $game.data("flipped")[0].data("flipped", false);
          $game.data("flipped")[1].css("background-color", "rgb(32, 64, 86)");
          $game.data("flipped")[1].text("");
          $game.data("flipped")[1].data("flipped", false);
          $game.data("flipped").splice(0, 2);
      }, 300);
      }
    } else {
      return;
    }
  } else {
    return;
  };
}

$('#restart-btn').click(function(){
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
})
