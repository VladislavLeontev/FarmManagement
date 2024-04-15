import {Component, DestroyRef, inject, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {Animal, AnimalType} from "./models/animal";
import {AnimalsService} from "./services/animals.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {catchError, filter, lastValueFrom, map, mergeMap, of, tap} from "rxjs";
import {AnimalEntryComponent} from "./animal-entry/animal-entry.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AddAnimalDialogComponent} from "./add-animal-dialog/add-animal-dialog.component";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, AnimalEntryComponent, MatButtonModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FarmManagementClient';
  destroyRef = inject(DestroyRef);
  animalsService = inject(AnimalsService);
  dialog = inject(MatDialog);
  @ViewChild("yesNo") yesNo!: TemplateRef<any>


  animals: Animal[] = [];
  removingAnimals = new Set<string>();

  ngOnInit() {
    this.animalsService.getAnimals().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      this.animals = data;
    });
  }

  isRemoving(name: string) {
    return this.removingAnimals.has(name);
  }

  async onDelete($event: string) {
    const yesNoRef = this.dialog.open(this.yesNo);
    const promise = lastValueFrom(
      yesNoRef.afterClosed().pipe(
        map(x => x === "true")
      )
    );

    const result = await promise;
    if (!result) {
      return;
    }

    this.removingAnimals.add($event);
    this.animalsService.deleteAnimal($event).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => {
        this.animals = this.animals.filter(x => x.name !== $event);
        this.removingAnimals.delete($event);
      }),
      catchError((e) => {
        alert("Failed to delete animal due to server error");
        return of(0)
      })
    ).subscribe();

  }

  onAddAnimalClick() {
    const dialogRef = this.dialog.open(AddAnimalDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(x => {
      if (x) {
        this.animals.push(x);
      }
    });
  }
}
