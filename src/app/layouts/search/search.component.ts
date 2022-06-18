import { JobService } from './../../services/job.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input('data') allJobRes;
  @Input('initStatus') initStatus;
  @Output('sendDataForm') sendDataForm = new EventEmitter();
  private param = {
    search: '',
    status: 'all',
    jobType: 'all',
    sort: 'latest',
  };

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

  constructor(private jobService: JobService) {}

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
    return this.searchForm.get('jobType');
  }
  get sort() {
    return this.searchForm.get('sort');
  }

  // init Form
  private initForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      status: new FormControl(this.initStatus),
      jobType: new FormControl(this.jobTypes[0]),
      sort: new FormControl(this.jobSort[0]),
    });
    this.onFilter();
  }

  //Submit Search
  public onFilter() {
    this.param = { ...this.searchForm.value };

    this.sendDataForm.emit(this.param);
    // this.jobService.getJobs(param).subscribe(() => {
    //   this.spinner.hide();
    // });
  }

  //Cancel Search
  public onClear() {
    this.search.setValue('');
    this.status.setValue(this.jobStatus[0]);
    this.type.setValue(this.jobTypes[0]);
    this.sort.setValue(this.jobSort[0]);

    this.param = { ...this.searchForm.value };

    this.sendDataForm.emit(this.param);
    this.jobService.status.next('all');
  }
}
