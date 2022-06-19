import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-user-search-job',
  templateUrl: './user-search-job.component.html',
  styleUrls: ['./user-search-job.component.scss'],
})
export class UserSearchJobComponent implements OnInit {
  jobsArr = [];
  filtered = [];

  constructor(private JobService: JobService) {}

  ngOnInit(): void {
    this.filtered = this.jobsArr = this.JobService.getUserJobs();
  }
  onKeyUp(value: string) {
    this.filtered = this.jobsArr.filter((item) => {
      return item.Title.toLowerCase().includes(value.trim().toLowerCase());
    });
  }
}
