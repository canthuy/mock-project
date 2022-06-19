import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchJobComponent } from './user-search-job.component';

describe('UserSearchJobComponent', () => {
  let component: UserSearchJobComponent;
  let fixture: ComponentFixture<UserSearchJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
