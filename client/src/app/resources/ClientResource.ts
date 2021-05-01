import { AbstractResource } from 'src/app/resources/AbstractResource';
import { ClientsListComponent } from 'src/app/components/clients/clientsList.component';
import { ClientsEditComponent } from 'src/app/components/clients/clientsEdit.component';
import { ClientsCreateComponent } from 'src/app/components/clients/clientsCreate.component';

export class ClientResource extends AbstractResource {
  protected basePath = 'clients';
  protected list = ClientsListComponent;
  protected edit = ClientsEditComponent;
  protected create = ClientsCreateComponent;
}
