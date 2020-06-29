import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

import { cargarUsuarios } from 'src/app/store/actions';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  private destroyed$ = new Subject();

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.store.select('usuarios')
    .pipe( takeUntil( this.destroyed$ ) )
    .subscribe( ({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch( cargarUsuarios() );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
