import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AuthUser } from 'src/app/auth/_interfaces';
import { AuthService } from 'src/app/auth/_services';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { mainMenu } from './main-menu';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit, OnDestroy {
  private _destroy = new Subject();
  private _mainMenu = new BehaviorSubject(mainMenu);
  user!: AuthUser;
  profileImage = 'assets/images/portraits/2.png';

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this._initUser();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  get mainMenu$() {
    return this._mainMenu.asObservable();
  }

  private _initUser(): void {
    this._authService.user$
      .pipe(
        tap((user) => {
          if (user) {
            this.user = user;
            const updatedMenu = this._mainMenu.value.map((menu) => {
              if (user && menu.label === 'Profile') {
                menu.label = this.user.username;
              }
              return menu;
            });
            this._mainMenu.next(updatedMenu);
          }
        }),
        takeUntil(this._destroy)
      )
      .subscribe();
  }

  getActiveLink(routerLink: string) {
    return this._router.isActive(routerLink, true);
  }

  navigateTo(url: string) {
    this._router.navigateByUrl(url);
  }

  openMenu(): void {
    this._bottomSheet
      .open(MenuDialogComponent, {
        panelClass: 'shell-menu-dialog',
      })
      .afterDismissed()
      .pipe(takeUntil(this._destroy))
      .subscribe();
  }
}
