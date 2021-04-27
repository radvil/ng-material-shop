import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ConfirmPasswordValidator } from 'src/app/_shared/utils';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public showIcon = false;
  public form!: FormGroup;
  public isLoading$ = this._authService.isLoading$;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  get passwordInputType(): string {
    return this.showIcon ? 'text' : 'password';
  }

  get passwordIcon(): string {
    return this.showIcon ? 'visibility_on' : 'visibility_off';
  }

  get username(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get displayName(): AbstractControl {
    return this.form.get('displayName') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword') as AbstractControl;
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group(
      {
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
        password: [
          '',
          [
            Validators.minLength(4),
            Validators.pattern(
              /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
            ),
          ],
        ],
        confirmPassword: [''],
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
  }

  toggleShowPassword(): void {
    this.showIcon = !this.showIcon;
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
      case 'password':
        return this.password.hasError('minlength')
          ? 'Minimum 4 characters for password!'
          : 'At least one uppercase, one lowercase, and one number';
      default:
        return 'Passwords do not match';
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      const { confirmPassword, ...dto } = this.form.value;
      this._authService.register(dto).pipe(first()).subscribe();
    }
  }
}
