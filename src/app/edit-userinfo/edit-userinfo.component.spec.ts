import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserinfoComponent } from './edit-userinfo.component';

describe('EditUserinfoComponent', () => {
  let component: EditUserinfoComponent;
  let fixture: ComponentFixture<EditUserinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
