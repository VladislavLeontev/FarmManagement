import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnimalDialogComponent } from './add-animal-dialog.component';

describe('AddAnimalDialogComponent', () => {
  let component: AddAnimalDialogComponent;
  let fixture: ComponentFixture<AddAnimalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnimalDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAnimalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
