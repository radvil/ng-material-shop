import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrainlessPageComponent } from './brainless-page/brainless-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '404',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    data: { title: '404 | Page not found' },
  },
  {
    path: '501',
    component: BrainlessPageComponent,
    data: { title: '501 | Brainless Found' },
  },
];

@NgModule({
  declarations: [PageNotFoundComponent, BrainlessPageComponent],
  imports: [CommonModule, MatRippleModule, RouterModule.forChild(routes)],
})
export class MiscModule {}
