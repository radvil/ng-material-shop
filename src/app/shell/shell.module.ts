import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

import { ShellComponent } from './shell.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';

@NgModule({
  declarations: [ShellComponent, MainNavComponent, MenuDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
  ],
  exports: [ShellComponent],
})
export class ShellModule {}
