import { JobService } from 'src/app/services/job.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-all-jobs',
  templateUrl: './user-all-jobs.component.html',
  styleUrls: ['./user-all-jobs.component.scss'],
})
export class UserAllJobsComponent implements OnInit {
  public categories = [];
  public jobsArr = [];
  public filtered = [];
  public totalJobFiltered = [];
  public totalJobs = 0;
  public numOfPages = 10;
  public page = 1;
  public currentCategory = 'All';
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.totalJobFiltered = this.jobsArr = this.jobService.getUserJobs();
    this.categories = [
      {
        name: 'All',
        totalJob: this.jobsArr.length,
      },
      ...this.jobService
        .getCategories()
        .sort((a, b) => b.totalJob - a.totalJob),
    ];
    this.getPaginationJob(this.totalJobFiltered, this.page);
  }

  // filter by search
  public onKeyUp(value: string) {
    this.page = 1;
    this.totalJobFiltered = this.jobsArr.filter((item) => {
      return item.Title.toLowerCase().includes(value.trim().toLowerCase());
    });
    this.getPaginationJob(this.totalJobFiltered, this.page);
  }

  // filter by category
  public onFilter(category) {
    this.currentCategory = category;
    this.page = 1;
    if (category !== 'All') {
      this.totalJobFiltered = this.jobService.filterByCategory(category);
    } else this.totalJobFiltered = this.jobsArr;
    this.getPaginationJob(this.totalJobFiltered, this.page);
  }

  // pagination
  public goToPage(page) {
    this.page = page;
    this.getPaginationJob(this.totalJobFiltered, this.page);
  }

  // fake get pagination
  private getPaginationJob(jobs, page) {
    this.totalJobs = jobs.length;

    this.filtered = jobs.slice(
      this.numOfPages * (page - 1),
      page * this.numOfPages
    );
    console.log(jobs, this.filtered);
  }
}
