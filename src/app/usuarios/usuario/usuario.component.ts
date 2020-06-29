import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { cargarUsuario } from '../../store/actions/usuario.actions';

import { filter, takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit, OnDestroy {

  user: Usuario;
  private destroyed$ = new Subject();

  constructor(private activated: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.activated.params.subscribe( ({ id }) => {
        this.store.dispatch( cargarUsuario( { id } ) );
    });

    this.store.select('usuario')
    .pipe(
      takeUntil( this.destroyed$ ),
      // filter( ({ loaded }) => !loaded ),
      // take(1)
    )
    .subscribe( ({ user }) => {
      this.user = user;
    });

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
