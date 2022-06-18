import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-user-job',
  templateUrl: './user-job.component.html',
  styleUrls: ['./user-job.component.scss'],
})
export class UserJobComponent implements OnInit {
  jobsArr = [];
  constructor(private JobService: JobService) {}

  ngOnInit(): void {
    this.jobsArr = this.JobService.getUserJobs();
    console.log(this.jobsArr);
  }
}
