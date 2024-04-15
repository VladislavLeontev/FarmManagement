import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Animal} from "../models/animal";

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  http = inject(HttpClient);

  getAnimals() {
    return this.http.get<Animal[]>("/api/animals");
  }

  addAnimal(animal: Animal) {
    return this.http.post("/api/animals", animal);
  }

  deleteAnimal(name: string) {
    return this.http.delete(`/api/animals/${name}`);
  }

  getAnimal(name: string) {
    return this.http.get<Animal>(`/api/animals/${name}`);
  }
}
