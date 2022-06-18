import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('totalJobs') totalJobs: number;
  @Input('numOfPages') numOfPages: number;
  @Input('page') page: number;
  @Output('savePage') savePage = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public goToPage(page) {
    this.savePage.emit(page);
  }
}
