import { EditJobComponent } from './components/admin/edit-job/edit-job.component';
import { AdminHomeComponent } from './layouts/admin/admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './layouts/common/not-found/not-found.component';
import { HomeComponent } from './layouts/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { AllJobsComponent } from './components/admin/all-jobs/all-jobs.component';
import { StatisticsComponent } from './components/admin/statistics/statistics.component';
import { AdminProfileComponent } from './layouts/admin/admin-profile/admin-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: StatisticsComponent },
      { path: 'profile', component: AdminProfileComponent },
      {
        path: 'jobs',
        children: [
          { path: '', component: AllJobsComponent },
          { path: 'new', component: EditJobComponent },
        ],
      },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
