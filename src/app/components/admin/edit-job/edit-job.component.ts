import { Job } from 'src/app/models/job.model';
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

  private job: Job = {
    company: '',
    position: '',
    status: 'pending',
    jobType: 'full-time',
    jobLocation: '',
    createdBy: '',
    _id: '',
    updatedAt: '',
    createdAt: '',
  };
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
      if (this.jobService.getJobById(id)) {
        this.job = this.jobService.getJobById(id);
      } else {
        this.router.navigate(['/admin/jobs']);
      }
    } else {
      this.editMode = false;
    }
    this.jobForm = new FormGroup({
      position: new FormControl(this.job.position, [Validators.required]),
      company: new FormControl(this.job.company, [Validators.required]),
      jobLocation: new FormControl(this.job.jobLocation, [Validators.required]),
      status: new FormControl(this.job.status),
      jobType: new FormControl(this.job.jobType),
    });
  }

  // Submit Form
  public onSubmit() {
    if (this.editMode) {
      this.jobService
        .updateJob(this.job._id, this.jobForm.value)
        .subscribe((res) => {
          console.log(res);
<<<<<<< HEAD
          this.router.navigate(['/admin/jobs']);
=======
>>>>>>> 90864e812fbcf6505bc1a3ed28120c6c4b92db3c
        });
    } else {
      this.jobService.addJob(this.jobForm.value).subscribe((res) => {
        console.log(res);
      });
    }
  }

  // Cancel
  public onCancel() {
    if (this.editMode) {
      this.router.navigate(['/admin/jobs']);
    } else {
      this.router.navigate(['/admin']);
    }
  }
}
