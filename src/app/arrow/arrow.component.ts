import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css']
})
export class ArrowComponent implements OnInit {

  arrows: number[] = []
  cellState: number[] = []
  gridWidth: number = 10
  gridHeight: number = 10

  ngOnInit(): void {
      for (let i = 0; i < this.gridHeight * this.gridWidth; i++) {
        this.arrows.push(this.getRandomInt(4));
        this.cellState.push(0)
      }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  isSafe(x: number, y: number) {
    let safe = false;
    if (y > 0) {
      if (this.arrows[(y - 1) * this.gridWidth + x] == 0) {
        safe = true;
      }
    }
    if (y < this.gridHeight - 1) {
      if (this.arrows[(y + 1) * this.gridWidth + x] == 2) {
        safe = true;
      }
    }
    if (x > 0) {
      if (this.arrows[y * this.gridWidth + x - 1] == 3) {
        safe = true;
      }
    }
    if (x < this.gridWidth - 1) {
      if (this.arrows[y * this.gridWidth + x + 1] == 1) {
        safe = true;
      }
    }
    return safe;
  }

  solveGrid() {
    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridHeight; x++) {
        if (this.cellState[y * this.gridWidth + x] == 0) {
          this.cellState[y * this.gridWidth + x] = this.isSafe(x, y) ? 3 : 4;
        }
      }
    }
  }

  clickCell(x: number, y: number) {
    if (this.cellState[y * this.gridWidth + x] == 0) {
      if (this.isSafe(x, y)) {
        this.cellState[y * this.gridWidth + x] = 1;
      } else {
        this.cellState[y * this.gridWidth + x] = 2;
        this.solveGrid();
      }
    }
  }
}
