import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  jobData: Job[] = [];
  filteredJob: Job[] = [];
  public jobStatus: string[] = ['all', 'pending', 'interview', 'declined'];
  public jobTypes: string[] = [
    'all',
    'full-time',
    'part-time',
    'remote',
    'internship',
  ];
  public jobSort: string[] = ['all', 'latest', 'oldest', 'A-Z', 'Z-A'];

  public searchForm = new FormGroup({
    search: new FormControl(''),
    status: new FormControl(this.jobStatus[0]),
    type: new FormControl(this.jobTypes[0]),
    sort: new FormControl(this.jobSort[0]),
  });

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(() => {});
  }

  //getter
  get search() {
    return this.searchForm.get('search');
  }
  get status() {
    return this.searchForm.get('status');
  }
  get type() {
    return this.searchForm.get('type');
  }
  get sort() {
    return this.searchForm.get('sort');
  }

  //Submit Search
  public onFilter() {
    this.jobService
      .searchJob(
        this.searchForm.value.status,
        this.searchForm.value.type,
        this.searchForm.value.sort,
        '1',
        this.searchForm.value.search
      )
      .subscribe((res: any) => {
        this.filteredJob = this.jobData = res.jobs;
        console.log(this.filteredJob);
      });
  }

  //Cancel Search
  public onClear() {
    this.search.reset();
  }
}
