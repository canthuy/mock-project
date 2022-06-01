import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  @Input('job') job: Job;
  public jobStatus: string[] = ['pending', 'interview', 'declined'];
  constructor() {}

  ngOnInit(): void {}

  get job_status() {
    return this.job.status;
  }
}
