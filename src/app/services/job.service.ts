import { HttpClient } from '@angular/common/http';
import { Job } from './../models/job.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private BASE_URL = 'https://jobify-prod.herokuapp.com/api/v1';

  constructor(private http: HttpClient) {}

  public getAllJobs() {
    return this.http.get(`${this.BASE_URL}/jobs`);
  }

  public addJob(job: Job) {
    return this.http.post(`${this.BASE_URL}/jobs`, job);
  }

  public searchJob(
    status: string,
    jobType: string,
    sort: string,
    page: string,
    search: string
  ) {
    return this.http.get(`${this.BASE_URL}/toolkit/jobs`, {
      params: {
        status: status,
        jobType: jobType,
        sort: sort,
        page: page,
        search: search,
      },
    });
  }
}
