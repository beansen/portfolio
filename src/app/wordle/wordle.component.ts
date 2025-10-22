import {Component, HostListener, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import * as wordList from '../../assets/wordle-list.json';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent {

  lettersFirstRow: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  lettersSecondRow: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  lettersThirdRow: string[] = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']

  guesses: string[][] = []
  tileState: number[][] = []

  rightPositionLetters: string[] = [];
  containsLetters: string[] = [];
  wrongLetters: string[] = [];

  private wordleList: string[] = [];

  private guessRow: number = 0;
  private guessChar: number = 0;
  private wordIndex: number = 0;

  private word: string = '';

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let letter;
    if (event.code.includes("Key")) {
      letter = event.key;
    } else if (event.code == 'Backspace') {
      letter = 'del';
    } else if (event.code == 'Enter') {
      letter = 'enter';
    }
    if (letter) {
      this.clickedLetter(letter);
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document) {
    let tempList = wordList;
    for (let i = 0; i < tempList.length; i++) {
      this.wordleList.push(tempList[i]);
    }

    let currentIndex = this.wordleList.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.wordleList[currentIndex], this.wordleList[randomIndex]] = [
        this.wordleList[randomIndex], this.wordleList[currentIndex]];
    }

    this.initGame();
  }

  initGame() {
    for (let i = 0; i < 6; i++) {
      this.guesses[i] = [];
      this.tileState[i] = [];
      for (let j = 0; j < 5; j++) {
        this.guesses[i].push("");
        this.tileState[i].push(0);
      }
    }
    this.word = this.wordleList[this.wordIndex];
    this.wordIndex++;
  }

  clickedLetter(letter: string) {
    if (letter == 'del') {
      if (this.guessChar > 0) {
        this.guessChar--;
        this.guesses[this.guessRow][this.guessChar] = "";
      }
    } else if (letter == 'enter') {
      if (this.guessRow < 6 && this.guessChar == 5) {
        let guessedWord = this.guesses[this.guessRow].toString().replaceAll(",", "").toLowerCase();
        if (this.wordleList.includes(guessedWord)) {
          this.checkWord();
          this.guessRow++;
          this.guessChar = 0;
        }
      }
    } else {
      if (this.guessChar < 5 && this.guessRow < 6) {
        this.guesses[this.guessRow][this.guessChar] = letter.toUpperCase();
        this.guessChar++;
      }
    }
  }

  checkWord() {
    let temp = this.word;
    for (let i = 0; i < 5; i++) {
      if (this.guesses[this.guessRow][i].toLowerCase() == temp.charAt(i)) {
        this.tileState[this.guessRow][i] = 1;
        temp = temp.replace(this.guesses[this.guessRow][i].toLowerCase(), ".");
        if (!this.rightPositionLetters.includes(this.guesses[this.guessRow][i].toLowerCase())) {
          this.rightPositionLetters.push(this.guesses[this.guessRow][i].toLowerCase());
        }
      } else if (temp.includes(this.guesses[this.guessRow][i].toLowerCase())) {
        // contains letter
        this.tileState[this.guessRow][i] = 2;
        temp = temp.replace(this.guesses[this.guessRow][i].toLowerCase(), ".");
        if (!this.containsLetters.includes(this.guesses[this.guessRow][i].toLowerCase())) {
          this.containsLetters.push(this.guesses[this.guessRow][i].toLowerCase());
        }
      } else {
        // wrong
        this.tileState[this.guessRow][i] = 3;
        if (!this.wrongLetters.includes(this.guesses[this.guessRow][i].toLowerCase())) {
          this.wrongLetters.push(this.guesses[this.guessRow][i].toLowerCase());
        }
      }
    }
  }



  ngOnInit() {
    this.document.body.classList.add('wordle-body');
    // OR you can Add inline style css with the help of code below
    // this._document.body.style.background = '#fff';
  }
  ngOnDestroy() {
    // remove the class form body tag
    this.document.body.classList.remove('wordle-body');
  }

}
