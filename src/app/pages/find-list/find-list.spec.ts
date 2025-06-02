import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindList } from './find-list';

describe('FindList', () => {
  let component: FindList;
  let fixture: ComponentFixture<FindList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
