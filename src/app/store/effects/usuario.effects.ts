import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as actionsUsuario from '../actions/';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UsuarioService } from '../../services/usuario.service';

@Injectable()

export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) {}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( actionsUsuario.cargarUsuario ),
                mergeMap(
                    ( action ) => this.usuariosService.getUser( action.id )
                          .pipe(
                                map( usuario => actionsUsuario.cargarUsuarioSuccess( { usuario } ) ),
                                catchError( err => of( actionsUsuario.cargarUsuarioError( { payload: err } ) ) )
                               )
                           )
                )
    );

}
