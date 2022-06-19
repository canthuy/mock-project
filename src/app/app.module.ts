import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { FooterComponent } from './layouts/common/footer/footer.component';
import { HeaderComponent } from './layouts/common/header/header.component';
import { NotFoundComponent } from './layouts/common/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CarouselComponent } from './layouts/common/carousel/carousel.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AdminHeaderComponent } from './layouts/admin/admin-header/admin-header.component';
import { AdminHomeComponent } from './layouts/admin/admin-home/admin-home.component';
import { AdminFooterComponent } from './layouts/admin/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './layouts/admin/admin-sidebar/admin-sidebar.component';
import { EditJobComponent } from './components/admin/edit-job/edit-job.component';
import { AllJobsComponent } from './components/admin/all-jobs/all-jobs.component';
import { SearchComponent } from './layouts/search/search.component';
import { StatisticsComponent } from './components/admin/statistics/statistics.component';
import { JobComponent } from './layouts/job/job.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { HrInsiderComponent } from './layouts/hr-insider/hr-insider.component';
import { AboutUsComponent } from './layouts/about-us/about-us.component';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { PaginationComponent } from './layouts/common/pagination/pagination.component';
import { UserAllJobsComponent } from './components/user/user-all-jobs/user-all-jobs.component';
import { UserJobComponent } from './components/user/user-job/user-job.component';
import { UserSearchJobComponent } from './components/user/user-search-job/user-search-job.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    CarouselComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    EditJobComponent,
    AllJobsComponent,
    SearchComponent,
    StatisticsComponent,
    JobComponent,
    AdminProfileComponent,
    HrInsiderComponent,
    AboutUsComponent,
    ContactUsComponent,
    PaginationComponent,
    UserAllJobsComponent,
    UserJobComponent,
    UserSearchJobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
