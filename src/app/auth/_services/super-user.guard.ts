import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

type RouteActivated =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree;

@Injectable({
  providedIn: 'root',
})
export class SuperUserGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  canActivate(): RouteActivated {
    return this._authService.isSuperUser$.pipe(
      map((isSuperUser) => {
        if (!isSuperUser) {
          this._router.navigateByUrl('/misc/501');
          this._snackBar.open('Super user only', 'ok', { duration: 2000 });
          return false;
        }
        return true;
      })
    );
  }
}
