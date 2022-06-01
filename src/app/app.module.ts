import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { FooterComponent } from './layouts/common/footer/footer.component';
import { HeaderComponent } from './layouts/common/header/header.component';
import { NotFoundComponent } from './layouts/common/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CarouselComponent } from './layouts/common/carousel/carousel.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AdminHeaderComponent } from './layouts/admin/admin-header/admin-header.component';
import { AdminHomeComponent } from './layouts/admin/admin-home/admin-home.component';
import { AdminFooterComponent } from './layouts/admin/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './layouts/admin/admin-sidebar/admin-sidebar.component';
import { EditJobComponent } from './components/admin/edit-job/edit-job.component';
import { AllJobsComponent } from './components/admin/all-jobs/all-jobs.component';
import { SearchComponent } from './components/admin/search/search.component';
import { StatisticsComponent } from './components/admin/statistics/statistics.component';
import { JobComponent } from './components/admin/job/job.component';
import { AdminProfileComponent } from './layouts/admin/admin-profile/admin-profile.component';
import { ToastrModule } from 'ngx-toastr';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
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
