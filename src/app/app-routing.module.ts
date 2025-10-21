import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortComponent } from './port/port.component';
import {ArrowComponent} from "./arrow/arrow.component";
import {WordleComponent} from "./wordle/wordle.component";

const routes: Routes = [
  {
    path: '',
    component: PortComponent
  },
  {
    path: 'arrow',
    component: ArrowComponent
  },
  {
    path: 'wordle',
    component: WordleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
