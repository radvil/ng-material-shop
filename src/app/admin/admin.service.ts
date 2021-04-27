import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { AuthService } from '../auth/_services';
import { UpdateUserDto, User } from '../user/interfaces';

@Injectable()
export class AdminService {
  constructor(private _http: HttpClient, private _authService: AuthService) {}

  private _users = new BehaviorSubject<User[]>([]);
  private _filteredUsers = new BehaviorSubject<User[]>([]);

  /**
   * AuthState selectors
   */
  public users$ = this._users.asObservable();
  public filteredUsers$ = this._filteredUsers.asObservable();

  /**
   * custom getters
   */
  private get _baseUrl() {
    return env.apiPath + '/user';
  }

  private get _authHeader() {
    return this._authService.authHeader;
  }

  getAllUsers(): void {
    this._http
      .get<User[]>(this._baseUrl, { headers: this._authHeader })
      .pipe(shareReplay())
      .subscribe((users) => {
        if (users) {
          this._users.next(users);
          this._filteredUsers.next(users);
        }
      });
  }

  filterUsers(term: string) {
    const filtered = term
      ? this._filteredUsers.getValue().filter((u) => u.username.includes(term))
      : this._users.getValue();
    this._filteredUsers.next(filtered);
  }

  updateUser(userId: number, dto: UpdateUserDto) {
    return this._http
      .patch<User>(`${this._baseUrl}/${userId}`, dto, {
        headers: this._authHeader,
      })
      .pipe(shareReplay())
      .subscribe(() => {
        const updatedState = this._users.value.map((user) => {
          let updatedUser = user;
          if (user.id == userId) updatedUser = { ...user, ...dto };
          return updatedUser;
        });
        this._users.next(updatedState);
        this._filteredUsers.next(updatedState);
      });
  }

  deleteUser(userId: number) {
    this._http
      .delete<any>(`${this._baseUrl}/${userId}`, { headers: this._authHeader })
      .pipe(shareReplay())
      .subscribe(() => {
        const updatedState = this._users
          .getValue()
          .filter((user) => user.id !== userId);
        this._users.next(updatedState);
      });
  }
}
