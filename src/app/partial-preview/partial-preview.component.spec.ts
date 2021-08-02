import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialPreviewComponent } from './partial-preview.component';

describe('PartialPreviewComponent', () => {
  let component: PartialPreviewComponent;
  let fixture: ComponentFixture<PartialPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
