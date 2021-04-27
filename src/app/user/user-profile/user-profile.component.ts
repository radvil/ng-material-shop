import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private _destroy = new Subject();
  isLoading$ = this._authService.isLoading$;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.getAuthUser().pipe(takeUntil(this._destroy)).subscribe();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  logoutUser() {
    this._authService.logout();
  }
}
