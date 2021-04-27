import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
} from 'rxjs/operators';
import { User } from 'src/app/user/interfaces';
import { ConfirmDialogComponent } from 'src/app/_shared/components';
import { AdminService } from '../admin.service';
import { UpdateUserDialogComponent } from '../components/update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  users$ = this._adminService.filteredUsers$;

  constructor(
    private _adminService: AdminService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._adminService.getAllUsers();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  search(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    fromEvent(input, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe((e) => {
        const value = (e.target as HTMLInputElement).value;
        this._adminService.filterUsers(value);
      });
  }

  updateUser(user: User): void {
    this._dialog.open(UpdateUserDialogComponent, {
      width: '555px',
      data: { user },
    });
  }

  deleteUser(userId: number): void {
    const dialog$ = this._dialog
      .open(ConfirmDialogComponent, {
        width: '555px',
        data: {
          message: `Are you sure want to delete this user ? 
            \nPlease note this action can not be undone`,
        },
      })
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$),
        filter((confirmed) => confirmed)
      );

    dialog$.subscribe(() => {
      this._adminService.deleteUser(userId);
      this._snackBar.open('Deleted', 'close');
    });
  }
}
