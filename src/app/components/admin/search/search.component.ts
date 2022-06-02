import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input('data') allJobRes;
  @Output('sendDataForm') sendDataForm = new EventEmitter();

  public jobStatus: string[] = ['all', 'pending', 'interview', 'declined'];
  public jobTypes: string[] = [
    'all',
    'full-time',
    'part-time',
    'remote',
    'internship',
  ];

  public jobSort: string[] = ['latest', 'oldest', 'a-z', 'z-a'];

  public searchForm = new FormGroup({
    search: new FormControl(''),
    status: new FormControl(this.jobStatus[0]),
    type: new FormControl(this.jobTypes[0]),
    sort: new FormControl(this.jobSort[0]),
  });

  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

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
    this.spinner.show();
    const param = {
      status: this.searchForm.value.status,
      jobType: this.searchForm.value.type,
      sort: this.searchForm.value.sort,
      page: this.searchForm.value.page,
      search: this.searchForm.value.search,
    };
    this.sendDataForm.emit(param);
    this.jobService.getJobs(param).subscribe((res: any) => {
      this.spinner.hide();
    });
  }

  //Cancel Search
  public onClear() {
    this.search.setValue('');
    this.status.setValue(this.jobStatus[0]);
    this.type.setValue(this.jobTypes[0]);
    this.sort.setValue(this.jobSort[0]);
    this.jobService.jobsChange.next(this.allJobRes);
  }
}
