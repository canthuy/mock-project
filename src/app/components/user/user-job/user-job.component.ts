import { Component, OnInit } from '@angular/core';
import { UserJob } from 'src/app/models/userJob.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-user-job',
  templateUrl: './user-job.component.html',
  styleUrls: ['./user-job.component.scss'],
})
export class UserJobComponent implements OnInit {
  public jobsArr = [];
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobsArr = this.jobService.getUserJobs();
  }
}
