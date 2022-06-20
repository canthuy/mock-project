import { HttpClient } from '@angular/common/http';
import { Job } from './../models/job.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

import user_jobs from '../../assets/data/data';
import { UserJob } from '../models/userJob.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private BASE_URL = 'https://jobify-prod.herokuapp.com/api/v1/toolkit/jobs';
  private jobs: Job[] = [];
  public status = new BehaviorSubject('all');

  private defaultParam = {
    status: 'all',
    jobType: 'all',
    sort: 'latest',
    page: '1',
    search: '',
  };

  constructor(private http: HttpClient) {}

  public getJobs(param = this.defaultParam) {
    return this.http
      .get(this.BASE_URL, {
        params: {
          status: param.status,
          jobType: param.jobType,
          sort: param.sort,
          page: param.page,
          search: param.search,
        },
      })
      .pipe(
        tap((res: any) => {
          this.jobs = res.jobs;
        })
      );
  }
  public getJobById(id: string) {
    return this.jobs.find((value) => value._id === id);
  }

  public getStats() {
    return this.http.get(`${this.BASE_URL}/stats`);
  }

  public addJob(job: Job) {
    return this.http.post(this.BASE_URL, job);
  }

  public updateJob(id: string, job: Job) {
    return this.http.patch(`${this.BASE_URL}/${id}`, job);
  }

  public deleteJob(id: string) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }

  public getUserJobs() {
    return user_jobs;
  }

  public filterByCategory(type: string) {
    return user_jobs.filter((job) => job.Category === type);
  }
  public getCategories() {
    let categories = new Set(user_jobs.map((job) => job.Category));

    return [...categories].map((type) => {
      return {
        name: type,
        totalJob: this.filterByCategory(type).length,
      };
    });
  }

  // public searchJob(
  //   status: string = 'all',
  //   jobType: string = 'all',
  //   sort: string = 'latest',
  //   page: string = '1',
  //   search: string = ''
  // ) {
  //   return this.http
  //     .get(this.BASE_URL, {
  //       params: {
  //         status: status,
  //         jobType: jobType,
  //         sort: sort,
  //         page: page,
  //         search: search,
  //       },
  //     })
  //     .pipe(
  //       tap((res: any) => {
  //         this.jobsChange.next(res);
  //       })
  //     );
  // }

  // public nextPageAllJobs(page: string) {
  //   return this.http.get(`${this.BASE_URL}?page=${page}`).pipe(
  //     tap((res: any) => {
  //       this.jobsChange.next(res);
  //     })
  //   );
  // }
  // public getAllJobs() {
  //   return this.http
  //     .get(this.BASE_URL, {
  //       params: {
  //         sort: 'latest',
  //       },
  //     })
  //     .pipe(
  //       tap((res: any) => {
  //         this.jobs = res.jobs;
  //         this.jobsChange.next(res);
  //       })
  //     );
  // }
}
