import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalEntryComponent } from './animal-entry.component';

describe('AnimalEntryComponent', () => {
  let component: AnimalEntryComponent;
  let fixture: ComponentFixture<AnimalEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
