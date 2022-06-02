import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInsiderComponent } from './hr-insider.component';

describe('HrInsiderComponent', () => {
  let component: HrInsiderComponent;
  let fixture: ComponentFixture<HrInsiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInsiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInsiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
