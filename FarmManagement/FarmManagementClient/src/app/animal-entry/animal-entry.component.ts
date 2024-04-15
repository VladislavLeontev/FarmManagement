import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AnimalType} from "../models/animal";
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-animal-entry',
  standalone: true,
  imports: [
    MatButton,
    MatIconModule,
    NgIf,
    MatProgressSpinner,
    MatFabButton,
  ],
  templateUrl: './animal-entry.component.html',
  styleUrl: './animal-entry.component.scss'
})
export class AnimalEntryComponent {
  @Input() name!: string;
  @Input() type!: AnimalType;
  @Input() isRemoving: boolean = false;
  @Output() delete = new EventEmitter();

  onRemoveClick() {
    if(this.isRemoving){
      return;
    }

    this.delete.emit(this.name);
  }

}
