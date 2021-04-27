import { Component } from '@angular/core';
import { AuthService } from './auth/_services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-shell>
      <router-outlet></router-outlet>
    </app-shell>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _authService: AuthService) {
    this._authService.user$.subscribe();
  }
}
