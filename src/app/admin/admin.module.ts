import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogModule } from '../_shared/components';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminService } from './admin.service';
import { UpdateUserDialogComponent } from './components';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';


@NgModule({
  declarations: [ManageUsersComponent, UpdateUserDialogComponent, ManageCategoriesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ConfirmDialogModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [AdminService]
})
export class AdminModule { }
