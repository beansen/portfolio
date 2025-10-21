import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.document.body.classList.add('wordle-body');
    // OR you can Add inline style css with the help of code below
    // this._document.body.style.background = '#fff';
  }
  ngOnDestroy() {
    // remove the class form body tag
    this.document.body.classList.add('wordle-body');
  }
}
