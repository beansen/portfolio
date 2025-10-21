import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.css']
})
export class PortComponent implements OnInit, OnDestroy {
  
  constructor(
    @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
      this.document.body.classList.add('port-body');
      // OR you can Add inline style css with the help of code below
      // this._document.body.style.background = '#fff';
  }
  ngOnDestroy() {
    // remove the class form body tag
    this.document.body.classList.add('port-body');
  }
}
