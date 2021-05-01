import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractService } from 'src/app/services/abstract';
import { AbstractRouter } from 'src/app/router/router';
import { AbstractModelApplication } from 'src/app/model/abstract';
import { Input } from 'src/app/form/Input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: [],
})
export abstract class GenericFormComponent implements OnInit {
  public formType = '';
  public item = {};
  public inputs: Input[] = [];
  public routerHelper = AbstractRouter;
  public dataSource: MatTableDataSource<AbstractModelApplication>;
  public resource = '';
  public paginator = {
    page: 1,
    itemsPerPage: 10,
    count: 0,
    options: [10, 25, 50],
  };
  public singularResource = '';
  public actionMatcher = null;
  public fields = [];
  public filters = ['name'];
  protected excludedFields = ['@id', '@type'];

  constructor(
    protected service: AbstractService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar
  ) {}

  public initialize(): void {
    return;
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 4 * 1000,
    });
  }

  ngOnInit(): void {
    this.initialize();
    return;
  }

  onSubmit(_: NgForm): void {
    return;
  }
}
