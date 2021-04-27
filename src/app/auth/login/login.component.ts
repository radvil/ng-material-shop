import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public showIcon = false;
  public form!: FormGroup;
  public isLoading$ = this._authService.isLoading$;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  get passwordInputType() {
    return this.showIcon ? 'text' : 'password';
  }

  get passwordIcon() {
    return this.showIcon ? 'visibility_on' : 'visibility_off';
  }

  get submitDisabled(): boolean {
    return !(this.form.value.username && this.form.value.password);
  }

  toggleShowPassword() {
    this.showIcon = !this.showIcon;
  }

  submitForm() {
    this._authService.login(this.form.value).subscribe();
  }
}
