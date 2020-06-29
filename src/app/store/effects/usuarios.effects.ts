import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as actionsUsuarios from '../actions/usuarios.actions';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UsuarioService } from '../../services/usuario.service';

@Injectable()

export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) {}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( actionsUsuarios.cargarUsuarios ),
                mergeMap(
                    () => this.usuariosService.getUsers()
                          .pipe(
                                map( usuarios => actionsUsuarios.cargarUsuariosSuccess( { usuarios } ) ),
                                catchError( err => of( actionsUsuarios.cargarUsuariosError( { payload: err } ) ) )
                               )
                           )
                )
    );

}
