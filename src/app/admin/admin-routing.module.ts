import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-users',
    pathMatch: 'full',
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    data: { title: 'Manage Users' },
  },
  {
    path: 'manage-categories',
    component: ManageCategoriesComponent,
    data: { title: 'Manage Global Categories' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
