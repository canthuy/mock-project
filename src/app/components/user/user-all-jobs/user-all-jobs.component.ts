import { JobService } from 'src/app/services/job.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-all-jobs',
  templateUrl: './user-all-jobs.component.html',
  styleUrls: ['./user-all-jobs.component.scss'],
})
export class UserAllJobsComponent implements OnInit {
  public categories = [];
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.categories = this.jobService.getCategories();
  }
}
