import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteList } from './delete-list';

describe('DeleteList', () => {
  let component: DeleteList;
  let fixture: ComponentFixture<DeleteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
