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
  @Input('page') currentPage: string;
  @Input('initStatus') initStatus;
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

  public searchForm: FormGroup;

  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initForm();
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

  // init Form
  private initForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      status: new FormControl(this.initStatus),
      type: new FormControl(this.jobTypes[0]),
      sort: new FormControl(this.jobSort[0]),
    });
    this.onFilter();
  }

  //Submit Search
  public onFilter() {
    this.spinner.show();
    const param = {
      status: this.searchForm.value.status,
      jobType: this.searchForm.value.type,
      page: this.currentPage,
      sort: this.searchForm.value.sort,
      search: this.searchForm.value.search,
    };
    this.sendDataForm.emit(param);
    this.jobService.getJobs(param).subscribe(() => {
      this.spinner.hide();
    });
  }

  //Cancel Search
  public onClear() {
    this.search.setValue('');
    this.status.setValue(this.jobStatus[0]);
    this.type.setValue(this.jobTypes[0]);
    this.sort.setValue(this.jobSort[0]);

    const param = {
      status: this.searchForm.value.status,
      jobType: this.searchForm.value.type,
      sort: this.searchForm.value.sort,
      page: this.currentPage,
      search: this.searchForm.value.search,
    };
    this.sendDataForm.emit(param);
    this.spinner.show();
    this.jobService.getJobs(param).subscribe((res) => {
      this.spinner.hide();
    });
  }
}
