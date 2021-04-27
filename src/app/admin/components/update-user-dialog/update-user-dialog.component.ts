import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/user/interfaces';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss'],
})
export class UpdateUserDialogComponent implements OnInit {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private _fb: FormBuilder,
    private _adminService: AdminService
  ) {
    this.form = this._fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required]],
      isSuperUser: [null],
    });
  }

  ngOnInit(): void {
    if (!this.data?.user) return;

    this.form.patchValue({ ...this.data.user });
  }

  getErrorMessage(fieldName: string): string {
    switch (fieldName) {
      case 'username':
        return this.username.hasError('minlength')
          ? 'Minimum 3 characters required'
          : this.username.hasError('maxlength')
          ? 'Maximum 20 characters required'
          : 'Username is required';
      case 'email':
        return this.email.hasError('email')
          ? 'Please provide a valid email'
          : 'Email is required';
      case 'displayName':
        return 'Name is required';
      default:
        return 'Passwords do not match';
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this._adminService.updateUser(this.data.user.id, this.form.value);
    this.dialogRef.close();
  }

  get username(): AbstractControl {
    return this.form.get('username')!;
  }

  get email(): AbstractControl {
    return this.form.get('email')!;
  }

  get displayName(): AbstractControl {
    return this.form.get('displayName')!;
  }

  get isSuperUser(): AbstractControl {
    return this.form.get('isSuperUser')!;
  }
}
