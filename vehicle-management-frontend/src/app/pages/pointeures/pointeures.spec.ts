import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PointeuresComponent } from './pointeures.component';

describe('PointeuresComponent', () => {
  let component: PointeuresComponent;
  let fixture: ComponentFixture<PointeuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointeuresComponent],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointeuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
