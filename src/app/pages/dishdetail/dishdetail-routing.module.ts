import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishdetailPage } from './dishdetail.page';

const routes: Routes = [
  {
    path: '',
    component: DishdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishdetailPageRoutingModule {}
