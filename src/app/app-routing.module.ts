import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './layouts/about-us/about-us.component';
import { HrInsiderComponent } from './layouts/hr-insider/hr-insider.component';
import { EditJobComponent } from './components/admin/edit-job/edit-job.component';
import { AdminHomeComponent } from './layouts/admin/admin-home/admin-home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './layouts/common/not-found/not-found.component';
import { HomeComponent } from './layouts/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { AllJobsComponent } from './components/admin/all-jobs/all-jobs.component';
import { StatisticsComponent } from './components/admin/statistics/statistics.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: 'hr-insider', component: HrInsiderComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: StatisticsComponent },
      {
        path: 'profile',
        component: AdminProfileComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'jobs',
        children: [
          { path: '', component: AllJobsComponent },
          {
            path: 'new',
            component: EditJobComponent,
            canDeactivate: [CanDeactivateGuard],
          },
          {
            path: 'edit/:id',
            component: EditJobComponent,
            canDeactivate: [CanDeactivateGuard],
          },
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
