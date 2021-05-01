import { GenericFormComponent } from 'src/app/components/generic/form/generic-form.component';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-generic-edit',
  templateUrl: './generic-form.component.html',
  styleUrls: [],
})
export abstract class GenericEditComponent extends GenericFormComponent {
  formType = 'Edit';
  id: string;

  fetchItem(): void {
    this.service.getDataById(this.id).then((item) => {
      this.item = item;
    });
  }

  initialize(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.fetchItem();
    });
  }

  onSubmit({ value }: NgForm): void {
    this.service
      .update(this.id, value)
      .then(() => {
        this.openSnackBar(`The ${this.singularResource} has been updated`);
        this.router.navigateByUrl(this.routerHelper.redirectToList());
      })
      .catch(({ error: { ['hydra:description']: error }, status }) => {
        if (status === '400') {
          this.openSnackBar(`Error : ${error}`);
        }
      });
  }
}
