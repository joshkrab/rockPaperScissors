window.onload = init;

function init() {
   console.log(processGame.getRandomNum());
   document
      .querySelectorAll('button')
      .forEach((item) =>
         item.addEventListener('click', (e) =>
            processGame.getWinner(e.target.value)
         )
      );
}

const processGame = {
   round: 1,
   userScores: 0,
   computerScores: 0,
   getRandomNum() {
      return (this.random = Math.floor(Math.random() * 3));
   },
   getWinner(userChoise) {
      if (this.random === +userChoise) {
         this.value = 'DRAW!';
         this.color = 'item-yellow-style';
      } else if (
         this.random === +userChoise - 1 ||
         (this.random === 2 && +userChoise === 0)
      ) {
         this.value = 'You have WON!';
         this.color = 'item-green-style';
         this.userScores++;
      } else if (userChoise === 'reset') {
         this.round = 1;
         this.resetScores();
         this.getRandomNum();
         return displayLog.hideResult();
      } else {
         this.value = 'You have LOST!';
         this.color = 'item-red-style';
         this.computerScores++;
      }
      this.checkWinner(userChoise);
      this.round++;
      this.getRandomNum();
      displayLog.showResult(this.result, this.color);
   },
   getName(value) {
      switch (value) {
         case 0:
            value = 'Rock';
            break;
         case 1:
            value = 'Paper';
            break;
         case 2:
            value = 'Scissors';
            break;
      }
      return value;
   },
   checkWinner(userChoise) {
      this.result = `Round ${this.round}, ${this.getName(
         this.random
      )} vs. ${this.getName(+userChoise)}, ${this.value}`;
      if (this.computerScores === 3) {
         this.result =
            `Round ${this.round}, ${this.getName(
               this.random
            )} vs. ${this.getName(+userChoise)}, ${this.value}` +
            '\n*** Computer Win! ***';

         this.color = 'item-red-style';
         //  this.result = 'Computer Win';
         this.resetScores();
      } else if (this.userScores === 3) {
         this.result =
            `Round ${this.round}, ${this.getName(
               this.random
            )} vs. ${this.getName(+userChoise)}, ${this.value}` +
            '\n*** Congratulations! You Win! ***';

         this.color = 'item-green-style';
         //  this.result = 'Congratulations! You Win!';
         this.resetScores();
      }
   },
   resetScores() {
      this.computerScores = 0;
      this.userScores = 0;
   },
};

const displayLog = {
   showResult(str, color) {
      const log = document.getElementById('log');
      const p = document.createElement('p');
      p.setAttribute('class', color);
      log.appendChild(p);
      p.innerHTML = str;
      log.scrollTop = 9999;
   },
   hideResult() {
      while (log.firstChild) {
         log.removeChild(log.firstChild);
      }
   },
};
