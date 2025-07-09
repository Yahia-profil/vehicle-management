import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DepartmentsComponent } from './departments.component';

describe('DepartmentsComponent', () => {
  let component: DepartmentsComponent;
  let fixture: ComponentFixture<DepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsComponent],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
