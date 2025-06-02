import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproductionLists } from './reproduction-lists';

describe('ReproductionLists', () => {
  let component: ReproductionLists;
  let fixture: ComponentFixture<ReproductionLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReproductionLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReproductionLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
