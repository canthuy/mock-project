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

  public updateJob(id: string, job: Job) {
    return this.http.patch(`${this.BASE_URL}/toolkit/jobs/${id}`, job);
  }
}
