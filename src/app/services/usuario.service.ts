import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    private url: string;

    constructor( private http: HttpClient ) {
        this.url = 'https://reqres.in/api';
    }

    getUsers(): Observable<any> {
        return this.http.get(`${ this.url }/users?per_page=6&&delay=3`)
                   .pipe(
                       map( response => response['data'] )
                    );
    }

    getUser(id: string): Observable<any> {
        return this.http.get(`${ this.url }/users/${ id }`)
                        .pipe(
                            map( response => response['data'] )
                        );
    }

}
