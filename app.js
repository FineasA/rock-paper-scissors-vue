let vm = new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    hasPlayerChosen: false,
    playerRockChoice: false,
    playerPaperChoice: false,
    playerScissorsChoice: false,
    npcRockChoice: false,
    npcScissorsChoice: false,
    npcPaperChoice: false,
    npcScore: 0,
    playerScore: 0,
    logMessages: []
  },
  methods: {
    startGame() {
      this.gameStarted = !this.gameStarted;
    },
    npcChoice() {
      let randomSel = Math.floor(Math.random() * 3);
      if (randomSel === 0) {
        this.npcRockChoiceOutcome();
      } else if (randomSel === 1) {
        this.npcPaperChoiceOutcome();
      } else if (randomSel === 2) {
        this.npcScissorsChoiceOutcome();
      }
    },
    resetGame() {
      this.hasPlayerChosen = false;
      this.playerRockChoice = false;
      this.playerPaperChoice = false;
      this.playerScissorsChoice = false;
      this.npcRockChoice = false;
      this.npcScissorsChoice = false;
      this.npcPaperChoice = false;
    },
    npcScissorsChoiceOutcome() {
      this.npcScissorsChoice = true;
      this.npcMessageLog('Scissors');

      if (this.playerRockChoice) {
        this.playerMessageLog('Rock', true, false, 'Player Wins!');
      } else if (this.playerPaperChoice) {
        this.playerMessageLog('Paper', false, false, 'NPC WINS!');
      } else if (this.playerScissorsChoice) {
        this.playerMessageLog('Scissors', false, true, 'TIE GAME!');
      }
    },
    npcPaperChoiceOutcome() {
      this.npcPaperChoice = true;
      this.npcMessageLog('Paper');

      if (this.playerRockChoice) {
        this.playerMessageLog('Rock', false, false, 'NPC WINS!');
      } else if (this.playerPaperChoice) {
        this.playerMessageLog('Paper', false, true, 'TIE GAME!');
      } else if (this.playerScissorsChoice) {
        this.playerMessageLog('Scissors', true, false, 'Player Wins!');
      }
    },

    npcRockChoiceOutcome() {
      this.npcRockChoice = true;
      this.npcMessageLog('Rock');

      if (this.playerRockChoice) {
        this.playerMessageLog('Rock', false, true, 'TIE GAME!');
      } else if (this.playerPaperChoice) {
        this.playerMessageLog('Paper', true, false, 'Player WINS!');
      } else if (this.playerScissorsChoice) {
        this.playerMessageLog('Scissors', false, false, 'NPC WINS!');
      }
    },
    playerMessageLog(choice, isWinner, isTieGame, winnerStr) {
      this.logMessages.unshift({
        isPlayer: true,
        text: `Player chose ${choice}, ${winnerStr}!`,
        tieGame: isTieGame,
        winner: isWinner
      });
      this.checkWin(isWinner);
    },
    checkWin(isWinner) {
      if (isWinner) {
        this.playerScore++;
      } else if (!isWinner) {
        this.npcScore++;
      }
    },
    npcMessageLog(choice) {
      this.logMessages.unshift({
        isPlayer: false,
        text: `NPC chose ${choice}`
      });
    },
    playerChooses() {
      this.hasPlayerChosen = !this.hasPlayerChosen;
    },
    rockChoice() {
      this.playerChooses();
      this.playerRockChoice = true;
      this.npcChoice();
    },
    paperChoice() {
      this.playerChooses();
      this.playerPaperChoice = true;
      this.npcChoice();
    },
    scissorsChoice() {
      this.playerChooses();
      this.playerScissorsChoice = true;
      this.npcChoice();
    }
  }
});
