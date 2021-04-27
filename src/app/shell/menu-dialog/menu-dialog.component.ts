import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: 'menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss'],
})
export class MenuDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public sheetRef: MatBottomSheetRef<MenuDialogComponent>,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  navigateTo(url: string): void {
    this._router.navigateByUrl(url);
    this.sheetRef.dismiss();
  }
}
