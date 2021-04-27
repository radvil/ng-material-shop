import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  public isLoggedIn!: boolean;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
