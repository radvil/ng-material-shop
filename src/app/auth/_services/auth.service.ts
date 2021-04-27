import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  delay,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs/operators';
import { LocalStorageService } from 'src/app/_shared/services';

import { environment as env } from 'src/environments/environment';
import { LoginDto } from '../_dtos/login.dto';
import { RegisterDto } from '../_dtos/register.dto';
import { AuthUser } from '../_interfaces';

interface LoginResponse {
  authUser: AuthUser;
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = new BehaviorSubject<AuthUser | null>(null);
  private readonly _accessToken = new BehaviorSubject<string | null>(null);
  private readonly _isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    const user = _localStorageService.getItem('authUser');
    const accessToken = _localStorageService.getItem('accessToken');
    if (user && accessToken) {
      this._user.next(user);
      this._accessToken.next(accessToken);
    }
  }

  get user$() {
    return this._user.asObservable();
  }

  get isLoggedIn$() {
    return this.user$.pipe(map((user) => !!user));
  }

  get isSuperUser$() {
    return this.user$.pipe(map(user => user?.isSuperUser));
  }

  get accessToken$() {
    return this._accessToken.asObservable();
  }

  get isLoading$() {
    return this._isLoading.asObservable();
  }

  get authHeader(): HttpHeaders {
    const token = this._localStorageService.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  login(dto: LoginDto): Observable<LoginResponse | void> {
    this._isLoading.next(true);

    return this._http
      .post<LoginResponse>(env.apiPath + '/auth/signin', dto)
      .pipe(
        delay(1000),
        tap((res) => {
          this._saveResponseToLocalStorage(res);
          this._navigateAfterLogin();
        }),
        catchError((error) => of(this._handleError(error)))
      );
  }

  register(dto: RegisterDto): Observable<void> {
    this._isLoading.next(true);
    return this._http.post<void>(env.apiPath + '/auth/signup', dto).pipe(
      delay(1000),
      tap(() => {
        this._isLoading.next(false);
      }),
      catchError((error) => of(this._handleError(error)))
    );
  }

  getAuthUser(): Observable<AuthUser> {
    const headers = this.authHeader;
    return this._http
      .get<AuthUser>(env.apiPath + '/auth/user', { headers })
      .pipe(tap((user) => this._user.next(user)));
  }

  logout(): void {
    this._isLoading.next(true);
    if (this._user.value && this._accessToken.value) {
      setTimeout(() => {
        this._localStorageService.removeItem('accessToken');
        this._localStorageService.removeItem('authUser');
        this._user.next(null);
        this._accessToken.next(null);
        this._isLoading.next(false);
        this._router.navigateByUrl('/auth/login');
      }, 500);
    }
  }

  private _saveResponseToLocalStorage(res: LoginResponse) {
    const authUser = res?.authUser;
    const accessToken = res?.accessToken;
    if (authUser && accessToken) {
      this._localStorageService.setItem('authUser', authUser);
      this._localStorageService.setItem('accessToken', accessToken);
      this._user.next(authUser);
      this._accessToken.next(accessToken);
      this._isLoading.next(false);
    }
  }

  private _navigateAfterLogin(): void {
    const url = this._route.snapshot.queryParamMap.get('returnUrl') || '/';
    this._router.navigateByUrl(url);
  }

  private _handleError(error: any) {
    console.error(error); // todo: // make notifications error interceptor later
    this._isLoading.next(false);
  }
}
