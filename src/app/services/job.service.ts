import { HttpClient } from '@angular/common/http';
import { Job } from './../models/job.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private BASE_URL = 'https://jobify-prod.herokuapp.com/api/v1';
  private jobs: Job[] = [];
  public jobsChange = new Subject<Job[]>();

  constructor(private http: HttpClient) {}

  public getAllJobs() {
    return this.http.get(`${this.BASE_URL}/jobs`).pipe(
      tap((res: any) => {
        this.jobs = res.jobs;
      })
    );
  }

  public getJobById(id: string) {
    return this.jobs.find((value) => value._id === id);
  }

  public getStats() {
    return this.http.get(`${this.BASE_URL}/toolkit/jobs/stats`);
  }

  public addJob(job: Job) {
    return this.http.post(`${this.BASE_URL}/jobs`, job);
  }

  public searchJob(
    status: string = 'all',
    jobType: string = 'all',
    sort: string = 'latest',
    page: string = '1',
    search: string = ''
  ) {
    return this.http
      .get(`${this.BASE_URL}/toolkit/jobs`, {
        params: {
          status: status,
          jobType: jobType,
          sort: sort,
          page: page,
          search: search,
        },
      })
      .pipe(
        tap((value: any) => {
          this.jobsChange.next(value.jobs);
        })
      );
  }

  public updateJob(id: string, job: Job) {
    return this.http.patch(`${this.BASE_URL}/toolkit/jobs/${id}`, job);
  }

  public deleteJob(id: string) {
    return this.http.delete(`${this.BASE_URL}/toolkit/jobs/${id}`);
  }
  public nextPageAllJobs(page: string) {
    return this.http.get(`${this.BASE_URL}/toolkit/jobs?page=${page}  `);
  }
}
