import {inject} from "@angular/core";
import {AnimalsService} from "../services/animals.service";
import {catchError, map, of} from "rxjs";
import {AbstractControl, AsyncValidatorFn} from "@angular/forms";

export function getNameUniquenessValidator(): AsyncValidatorFn {
  const service = inject(AnimalsService);
  return (control: AbstractControl<string>) => {
    return service.getAnimal(control.value).pipe(
      map((x) => {
        return {nameUniqueness: true};
      }),
      catchError((e) => {
        if(e.status !== 404){
          throw "validation server error";
        }

        return of({})
      })
    );
  };
}
