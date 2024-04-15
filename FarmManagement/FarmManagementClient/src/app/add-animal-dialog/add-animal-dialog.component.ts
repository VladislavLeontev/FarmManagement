import {Component, DestroyRef, inject} from '@angular/core';
import {AnimalsService} from "../services/animals.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AnimalType} from "../models/animal";
import {getNameUniquenessValidator} from "../validators/name-uniqueness.validator";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';

import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

interface AddAnimalForm {
  name: FormControl<string | null>;
  type: FormControl<AnimalType | null>;

}

@Component({
  selector: 'app-add-animal-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgIf,
    MatButton,
    MatDialogClose,
    MatProgressSpinner
  ],
  templateUrl: './add-animal-dialog.component.html',
  styleUrl: './add-animal-dialog.component.scss'
})
export class AddAnimalDialogComponent {

  animalsService = inject(AnimalsService);
  dialogRef = inject(MatDialogRef<AddAnimalDialogComponent>);
  destroyRef = inject(DestroyRef);

  isAdding: boolean = false;

  options: AnimalType[] = [
    "Cow",
    "Pig",
    "Goat",
    "Sheep",
    "Horse",
    "Donkey",
    "Rabbit",
    "Chicken",
    "Goose",
    "Duck",
    "Turkey",
  ];

  form = new FormGroup<AddAnimalForm>({
    name: new FormControl(null, {
      validators: [
        Validators.required
      ],
      asyncValidators: [
        getNameUniquenessValidator()
      ]
    }),
    type: new FormControl("Chicken", {
      validators: [
        Validators.required
      ],
      nonNullable: true
    })
  });


  submit() {
    if (this.form.status !== "VALID") {
      alert("Form is invalid");
      return;
    }

    const {name, type} = this.form.value;
    if (!name || !type) {
      alert("Form is invalid");
      return;
    }

    const animal = {
      name,
      type
    };
    this.isAdding = true;
    debugger;
    this.animalsService.addAnimal(animal).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
        next: () => {
          this.dialogRef.close(animal);
        },
        error: (e) => {
          alert("Failed to add animal");
          this.isAdding = false;
        }
      }
    );
  }
}
