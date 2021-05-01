import { GenericFormComponent } from 'src/app/components/generic/form/generic-form.component';
import { NgForm } from '@angular/forms';

export abstract class GenericCreateComponent extends GenericFormComponent {
  formType = 'Create';

  onSubmit(form: NgForm): void {
    this.service
      .insert(form.value)
      .then(() => {
        this.openSnackBar(`The ${this.singularResource} has been created`);
        this.router.navigateByUrl(this.routerHelper.redirectToList());
      })
      .catch(({ error: { ['hydra:description']: error }, status }) => {
        if (status === '400') {
          this.openSnackBar(`Error : ${error}`);
        }
      });
  }
}
