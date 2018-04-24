angular.module('scoreKeeper', [])
  .controller('score', ['$scope', function($scope) {

    $scope.game = {
      started: false,
      servesSinceSwitch: 0,
      servesPerSwitch: 5
    }

    $scope.footerMessage = 'Rally for serve';

    $scope.player1 = {
      name: 'P1',
      score: 0,
      serving: false
    }
    $scope.player2 = {
      name: 'P2',
      score: 0,
      serving: false
    }

    $scope.startGame = function() {
      $scope.game.started = true;
    }


    $scope.addPoint = function(i) {
      // Start the game, give the Serving class to the person who won the rally
      if (!$scope.player1.serving && !$scope.player2.serving) {
        $scope['player' + i].serving = true;
        $scope.footerMessage = 'Game on!'
      }


      // Increment the player's score, how many serves since the last switch, and the highest current score
      $scope['player' + i].score++;
      $scope.game.servesSinceSwitch++;


      // Echo who's in the lead or if it's tied
      if ($scope.player1.score === $scope.player2.score) {
        $scope.footerMessage = 'Game is tied';
      } else {
        $scope.footerMessage = playerWithHighScore() + ' is in the lead';
      }


      if ($scope.player1.score == 20 && $scope.player2.score == 20) {
        $scope.game.servesPerSwitch = 1;
        switchServe();
      }

      if ($scope.game.servesSinceSwitch == $scope.game.servesPerSwitch) {
        switchServe();
      }

      if (isGameOver()) {
        $('.scoreBoard').addClass('dimmed');
        $scope.footerMessage = 'Game over! ' + playerWithHighScore() + ' wins!'
      }
    }

    function switchServe() {
      $('.team').toggleClass('team__isServing');
      $scope.player1.serving = !$scope.player1.serving;
      $scope.player2.serving = !$scope.player2.serving;
      $scope.game.servesSinceSwitch = 0;
    }

    function playerWithHighScore() {
      if ($scope.player1.score > $scope.player2.score) {
        return $scope.player1.name;
      } else {
        return $scope.player2.name;
      }
    }

    function isGameOver() {
      return Math.max($scope.player1.score, $scope.player2.score) >= 21 &&
             Math.abs($scope.player1.score - $scope.player2.score) >= 2;
    }
  }]);
