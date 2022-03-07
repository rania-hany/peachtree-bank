import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger event', () => {
    spyOn(component.inputChange, 'emit');
    const event = { target: { value: 'hello' } } as any;

    component.onInputChange(event);
    expect(component.inputChange.emit).toHaveBeenCalled();
  });

  it('should not trigger event', () => {
    spyOn(component.inputChange, 'emit');
    const event = { } as any; 
    component.onInputChange(event);
    expect(component.inputChange.emit).not.toHaveBeenCalled();
  });
});
