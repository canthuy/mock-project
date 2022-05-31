import { JobService } from './../../../services/job.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit {
  public editMode: boolean;
  public arrStatus: string[] = ['pending', 'interview', 'declined'];
  public jobTypes: string[] = [
    'full-time',
    'part-time',
    'remote',
    'internship',
  ];

  public jobForm: FormGroup;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.initForm(param.id);
    });
  }

  // getter
  get position() {
    return this.jobForm.get('position');
  }
  get company() {
    return this.jobForm.get('company');
  }
  get jobLocation() {
    return this.jobForm.get('jobLocation');
  }
  get status() {
    return this.jobForm.get('status');
  }
  get jobType() {
    return this.jobForm.get('jobType');
  }

  // Init Form
  private initForm(id: string) {
    if (id) {
      this.editMode = true;
      console.log('edit');
    } else {
      this.editMode = false;
      this.jobForm = new FormGroup({
        position: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        jobLocation: new FormControl('', [Validators.required]),
        status: new FormControl(this.arrStatus[0]),
        jobType: new FormControl(this.jobTypes[0]),
      });
    }
  }

  // Submit Form
  public onSubmit() {
    console.log(this.jobForm.value);
    if (this.editMode) {
      console.log('Edit Job');
    } else {
      this.jobService.addJob(this.jobForm.value).subscribe((res) => {
        console.log(res);
      });
    }
  }

  // Cancel
  public onCancel() {
    this.router.navigate(['/admin']);
  }
}
